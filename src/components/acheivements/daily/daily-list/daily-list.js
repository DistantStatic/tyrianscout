import { Row } from "react-bootstrap";
import Daily from '../daily/daily';
import styles from './daily-list.module.css';

export default function DailyList({ dailyList }) {

    return(
        <div className={styles.scroller}>
        {
            /**
            Object.entries(dailySorted).map(([category, dailyArr]) =>(
                <Row xs="1" md="3" xl="5">
                    <h1>{category}</h1>
                    {
                        dailyArr.map(daily => (
                            <Daily key={daily.id} daily={daily} />
                        ))
                    }

                </Row>
                    
            ))
             */
        }
        {
        <Row xs="1" md="3" xl="5" className={styles.listRow}>
            {dailyList ? dailyList.map((daily) => (
                <Daily key={daily.id} daily={daily} />
            )): ""}
        </Row>
        }
        </div>
    )
}
