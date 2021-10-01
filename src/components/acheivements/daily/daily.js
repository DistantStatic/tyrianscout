import { Card, Col } from "react-bootstrap";

export default function Daily(props) {
    return(
        <Col>
            <Card>
                <Card.Header>
                    {props.daily.name}
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