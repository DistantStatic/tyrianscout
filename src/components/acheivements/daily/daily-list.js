import { Row } from "react-bootstrap";
import Daily from './daily';

export default function DailyList(props) {
    return(
        <Row xs="1" md="3" xl="5">
            {props.dailyList.map((daily) => (
                <Daily daily={daily} />
            ))}
        </Row>
    )
}
