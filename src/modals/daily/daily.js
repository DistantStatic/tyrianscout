import { useState, useEffect } from 'react';

import { Modal, Button, ListGroup } from 'react-bootstrap';
import Item from '../../components/item/item';

import axios from '../../axios-instances/axios-gw2';

export default function DailyModal(props){
    console.log(props.daily);
    const [reward, setReward] = useState({});

    useEffect(() => {
        if (!props.show) return;
        axios({
            method: 'GET',
            url:`/items/${props.daily.rewards[0]['id']}`
        })
        .then(response => {
            setReward(response.data)
        })
    }, [])

    return(
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header>
                {
                    //Daily Name
                }
                <Modal.Title>{props.daily.name}</Modal.Title>
                <Button variant="danger" onClick={props.hide}>X</Button>
            </Modal.Header>
            <Modal.Body>
                {
                    //Daily details
                }
                <p>
                    {props.daily.requirement}
                </p>
                {
                    props.daily.description ? <p><i>{props.daily.description}</i></p> : ""
                }
                <ListGroup>
                    {
                        props.daily.tiers.map(tier => {
                            <ListGroup.Item>{tier.count} | {tier.points}</ListGroup.Item>
                        })
                    }
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                {
                    //Daily Rewards
                }
                <Item item={reward} />
            </Modal.Footer>
        </Modal>
    )
}
