import { useState } from 'react';
import { Container, Form, InputGroup, Button } from 'react-bootstrap';
import Daily from '../achievements/daily/daily';

export default function MainView() {
    const [apiKey, setApiKey] = useState('');
    const [inputState, setInputState] = useState(false);
    
    function manageApiInput(event) {
        event.preventDefault();
        setApiKey(event.target.value)
    }

    return(
        <Container>
            <InputGroup>
                <InputGroup.Text >API KEY</InputGroup.Text>
                <Form.Control type={inputState ? "password" : "text"} onChange={manageApiInput}/>
                <Button variant="success" onClick={() => {setInputState(!inputState)}}>Submit</Button>
            </InputGroup>
            <Daily />
        </Container>
    )
}
