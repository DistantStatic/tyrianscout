import { useState, useEffect } from 'react';

import { Modal, Button, ListGroup, Col, Row } from 'react-bootstrap';
import CustSpinner from '../../components/custspinner/custspinner';
import styles from './daily.module.css';

import Item from '../../components/item/item';
import axios from '../../axios-instances/axios-gw2';

export default function DailyModal(props){
    const [reward, setReward] = useState({});
    const [loadingReward, setLoadingReward] = useState(true);

    useEffect(() => {
        if (typeof(props.daily.rewards) === 'undefined' || typeof(props.daily.rewards[0]) === 'undefined') { setReward(null); setLoadingReward(false); return; }
        setLoadingReward(true)
        axios({
            method: 'GET',
            url:`/items/${props.daily.rewards[0]['id']}`
        })
        .then(response => {
            setReward(response.data);
            setLoadingReward(false);
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
                <hr />
                <div className={styles.rewardBox} >
                    {
                    loadingReward ?
                    <CustSpinner animation="border" role="status" className={styles.loadingSpinner}>
                    <span className="visually-hidden">Loading...</span>
                    </CustSpinner> : reward ? <Item item={reward} /> : ""
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}
