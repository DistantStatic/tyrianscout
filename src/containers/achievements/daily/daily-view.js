import { useState, useEffect } from 'react';
import axios from '../../../axios-instances/axios-gw2';
import { Container } from 'react-bootstrap';
import DailyList from '../../../components/acheivements/daily/daily-list/daily-list';
import categories from '../../../daily-categories.json';
import DailyTabs from '../../../components/nav/daily-tabs';

export default function Daily(){
    const [sortedDailies, setSortedDailies] = useState({});
    const [selectedDaily, setSelectedDaily] = useState('Daily');

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
            console.log(response.data);
            dailySort(response.data);
        })
    }

    function sortIds(raw) {
        let idList = [];
        Object.entries(raw).forEach(([type, info]) =>{
            info.forEach((daily) => {
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
        return str;
    }

    //ORGANIZATION!!!!
    async function dailySort(list) {
        console.log(list);
        let collections = {}
        list.forEach(daily => {
            categories.forEach(cat => {
                if (cat['achievements'].indexOf(daily.id) >= 0) {
                    if(daily['flags'].indexOf('Pvp') >=0 ){
                        if ((/jumping/i).exec(daily['name']) || (/puzzle/i).exec(daily['name'])){
                            collections['JP'] ? collections['JP'].push(daily) : collections['JP'] = [daily]
                        } else {
                            collections['PvP-WvW'] ? collections['PvP-WvW'].push(daily) : collections['PvP-WvW'] = [daily]
                        }
                    } else if (collections[cat.name]){
                        collections[cat.name].push(daily)
                    } else {
                        collections[cat.name] = [daily];
                    }
                }
            })
        })
        console.log(collections);
        setSortedDailies(collections)
    }

    return (
        <Container>
            <h1>{selectedDaily}</h1>
            <DailyTabs dailySorted={sortedDailies} selected={selectedDaily} setSelected={setSelectedDaily}/>
            <DailyList dailyList={sortedDailies[selectedDaily]}/>
        </Container>
    )
}