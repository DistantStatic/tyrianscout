import { useState, useEffect } from 'react';

import { Modal, Button, ListGroup, Col, Row } from 'react-bootstrap';
import styles from './daily.module.css';

import Item from '../../components/item/item';
import axios from '../../axios-instances/axios-gw2';

export default function DailyModal(props){
    const [reward, setReward] = useState({});

    useEffect(() => {
        if (typeof(props.daily.rewards) === 'undefined') return setReward(null);
        if (typeof(props.daily.rewards[0]) === 'undefined') return setReward(null);
        //set loading to hide reward while loading
        axios({
            method: 'GET',
            url:`/items/${props.daily.rewards[0]['id']}`
        })
        .then(response => {
            setReward(response.data);
        })
    }, [props])

    return(
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header>
                <Modal.Title>{props.daily.name}</Modal.Title>
                <Button variant="danger" onClick={props.hide}>X</Button>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {props.daily.requirement}
                </p>
                {
                    props.daily.description ? <p><i>{props.daily.description}</i></p> : ""
                }
                <ListGroup>
                    {
                        props.daily.tiers.map((tier, index) => (
                            <ListGroup.Item>
                                <Row className={styles.tierRow}>
                                    <Col xs={4}>Count: {tier.count}</Col> <Col xs={4}>{`Tier: ${index + 1}`} </Col> <Col xs={4}>Points: {tier.points}</Col>
                                </Row>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                {
                    //TODO: Make loading neater by hiding rewardbox while loading
                }
                <hr />
                <div className={styles.rewardBox} >
                    { reward ? <Item item={reward} /> : "" }
                </div>
            </Modal.Body>
        </Modal>
    )
}
