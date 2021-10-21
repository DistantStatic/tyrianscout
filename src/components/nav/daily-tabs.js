import { Nav } from "react-bootstrap";

export default function DailyTabs({selected, dailySorted, setSelected}) {

    return (
        <Nav variant="tabs" defaultActiveKey={selected}>
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