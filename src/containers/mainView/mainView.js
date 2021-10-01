import { Container, Form, InputGroup } from 'react-bootstrap';
import Daily from '../achievements/daily/daily';

export default function MainView() {
    
    return(
        <Container>
            <InputGroup>
                <InputGroup.Text >API KEY</InputGroup.Text>
                <Form.Control type="text" />
            </InputGroup>
            <Daily />
        </Container>
    )
}
