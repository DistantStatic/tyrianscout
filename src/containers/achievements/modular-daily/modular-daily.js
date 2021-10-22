import { useState, useEffect } from 'react';
import styles from './modular-daily.module.css';

import axios from '../../../axios-instances/axios-gw2';
import { Container, Nav} from 'react-bootstrap';

import Dailies from '../../../daily-json';
import DailyList from '../../../components/acheivements/daily/daily-list/daily-list';
import LoadingModal from '../../../modals/loading/loading';

export default function ModularDaily(props) {
    const [current, setCurrent] = useState(0);
    const [dailyCollection, setDailyCollection] = useState(Dailies);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        selectDaily(current)
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
                /**
                * Don't even need this, it just straight up took the array raw
                * leaving it here just in case
                let str = "";
                if (typeof(ids) === Array){
                    ids.forEach((id, idx) => {
                        str+=id;
                        if (idx !== ids.length()){
                            str+=",";
                        }
                    })
                } else {
                    str += ids;
                }
                */
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

    return(
        <>
        <LoadingModal show={loading} onHide={() => setLoading(false)} />
        <Nav className={styles.tabNav} variant="tabs" defaultActiveKey={current}>
        {
            dailyCollection.map((daily, index) => (
                <Nav.Item>
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
        <Container>
            <DailyList dailyList={dailyCollection[current]['achievements']} />
        </Container>
        </>
    )
}
