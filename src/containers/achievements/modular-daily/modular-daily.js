import { useState, useEffect } from 'react';
import styles from './modular-daily.module.css';

import axios from '../../../axios-instances/axios-gw2';
import { Container, Nav } from 'react-bootstrap';

import Dailies from '../../../daily-json';
import DailyList from '../../../components/acheivements/daily/daily-list/daily-list';

export default function ModularDaily(props) {
    const [current, setCurrent] = useState(0);
    const [dailyCollection, setDailyCollection] = useState(Dailies);

    useEffect(() => {
        selectDaily(current)
    }, [])

    function selectDaily(index) {
        //Guard is not guarding. Needs to Guard
        if (dailyCollection['achievements']) {
            console.log('Should have called')
            setCurrent(index)
            return;
        }
        axios({
            method: 'GET',
            url: `/achievements/categories/${dailyCollection[index]['id']}`
        })
            .then((response) => {
                console.log('Axios Called')
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
                        console.log(temp)
                    })
            })
        setCurrent(index)
    }

    return(
        <>
        <Nav className={styles.tabNav} variant="tabs" defaultActiveKey={current}>
        {
            dailyCollection.map((daily, index) => (
                <Nav.Item>
                    <Nav.Link 
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
            {
                dailyCollection[current]['achievements'] ? <DailyList dailyList={dailyCollection[current]['achievements']} /> : ""
            }
        </Container>
        </>
    )
}
