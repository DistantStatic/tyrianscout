import { useState, useEffect } from 'react';
import styles from './modular-daily.module.css';

import axios from '../../../axios-instances/axios-gw2';
import { Container, Nav, Navbar} from 'react-bootstrap';

import Dailies from '../../../daily-json';
import DailyList from '../../../components/acheivements/daily/daily-list/daily-list';
import LoadingModal from '../../../modals/loading/loading';
import DailyModal from '../../../modals/daily/daily';
import AboutModal from '../../../modals/about/about';

export default function ModularDaily(props) {
    const [current, setCurrent] = useState(0);
    const [dailyCollection, setDailyCollection] = useState(Dailies);
    const [loading, setLoading] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [aboutModal, setAboutModal] = useState(false);
    const [daily, setDaily] = useState({
        name: "",
        description: "",
        rewards: [],
        tiers: [],
        id: "",
    });

    //TODO: Theres probably a better way to do this
    useEffect(() => {
        selectDaily(current)
        // eslint-disable-next-line
    }, [])

    function selectDaily(index) {
        if (dailyCollection[index]['achievements']) {
            setCurrent(index)
            return;
        }
        setLoading(true)
        axios({
            method: 'GET',
            url: `/achievements/categories/${dailyCollection[index]['id']}`
        })
            .then((response) => {
                let ids = response.data['achievements'];
                axios({
                    method: 'GET',
                    url: `/achievements?ids=${ids}`
                })
                    .then((response) => {
                        let temp = dailyCollection.slice();
                        temp[index]['achievements'] = response.data
                        setDailyCollection(temp);
                        setLoading(false);
                    })
            })
        setCurrent(index)
    }

    function showDetailModal(daily) {
        setDaily(daily);
        setDetailModal(true);
    }

    return(
        <>
        <DailyModal show={detailModal} hide={() => setDetailModal(false)} daily={daily}/>
        <LoadingModal show={loading} hide={() => setLoading(false)} />
        <AboutModal show={aboutModal} hide={() => setAboutModal(false)} />
        <Navbar variant="dark" bg="dark" expand="xl" className={styles.tabNavbar} collapseOnSelect={true}>
            <Navbar.Brand href='/' className={styles.navBrand}>Tyrian Scout</Navbar.Brand>
            <Navbar.Collapse id="scout-navbar">
                <Nav className={styles.tabNav} variant="tabs" defaultActiveKey={current} navbarScroll={false}>
                    {
                        dailyCollection.map((daily, index) => (
                            <Nav.Item key={index}>
                                <Nav.Link
                                    className={styles.dailyNavLink}
                                    eventKey={index}
                                    onClick={() => {selectDaily(index)}}
                                    >
                                    {daily['name']}
                                </Nav.Link>
                            </Nav.Item>
                        ))
                    }
                </Nav>
                <Nav className="justify-content-left">
                    <Navbar.Brand onClick={() => setAboutModal(true)} className={styles.navAbout}>About</Navbar.Brand>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Toggle className={styles.toggleButton} aria-controls="scout-navbar" />
        </Navbar>
        <Container className={styles.main}>
            <DailyList dailyList={dailyCollection[current]['achievements']} showDetail={showDetailModal}/>
        </Container>
        </>
    )
}
