import { useState, useEffect } from 'react';
import axios from '../../../axios-instances/axios-gw2';
import { Container } from 'react-bootstrap';
import DailyList from '../../../components/acheivements/daily/daily-list';

export default function Daily(){
    const [dailies, setDailies] = useState([])

    useEffect(() => {
        axios({
            url: "/achievements/daily",
            method: "GET"
        }).then((response) => {
            getDetails(prepareIds(sortIds(response.data)));
        })
    }, [])
    
    function getDetails(ids) {
        let query = "/achievements?ids=" + ids
        axios({
            method:"GET",
            url: query
        }).then((response) => {
            console.log(response.data)
            setDailies(response.data);
        })
    }

    function sortIds(raw) {
        let idList = [];
        Object.entries(raw).forEach(([type, info]) =>{
            info.forEach((daily) => {
                console.log(daily.id)
                idList.push(daily.id);
            })
        })
        return idList;
    }

    function prepareIds(ids){
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
        console.log(str);
        return str;
    }

    return (
        <Container>
            <DailyList dailyList={dailies} />
        </Container>
    )
}