import { Card, Col } from "react-bootstrap";
import styles from './daily.module.css'

export default function Daily(props) {
    return(
        <Col>
            <Card>
                <Card.Header>
                    <Card.Img variant='top' className={styles.dailyImg} src={props.daily.icon ? props.daily.icon : 'https://render.guildwars2.com/file/483E3939D1A7010BDEA2970FB27703CAAD5FBB0F/42684.png'} />
                    <h3 className={styles.dailyTitle}>{props.daily.name}</h3>
                    <br />
                    <i>
                        {
                        props.daily.description ? `"${props.daily.description}"` : ""
                        }
                    </i>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {props.daily.requirement}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}