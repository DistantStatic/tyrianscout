import { Nav } from "react-bootstrap";
import styles from './daily-tabs.module.css';

export default function DailyTabs({selected, dailySorted, setSelected}) {

    return (
        <Nav className={styles.tabNav} variant="tabs" defaultActiveKey={selected}>
            {
                Object.entries(dailySorted).map(([category, _]) => (
                    <Nav.Item>
                        <Nav.Link 
                            eventKey={category}
                            onClick={() => {setSelected(category)}}
                            >{category}
                        </Nav.Link>
                    </Nav.Item>
                ))
            }
        </Nav>
    )
}