import { Modal, Button } from "react-bootstrap";
import styles from './about.module.css';

export default function AboutModal(props) {
    return (
        <Modal show={props.show} onHide={props.hide} contentClassName={styles.modalBg}>
        {
            //TODO: Darken to match theme
        }
            <Modal.Header>
                <Modal.Title>About</Modal.Title>
                <Button onClick={props.hide} variant="danger">X</Button>
            </Modal.Header>
            <Modal.Body className={styles.textCenter}>
                <h4>Tyrian Scout</h4>
                <br />
                <p>Find out what dailies are available and plan your in-game adventure anywhere, <i>without having to log into the game client!</i></p>
                <p>Let this app be of great use to you and your friends!</p> 
                <p>If you have any suggestions or find any bugs, let me know in the link below.</p>
                <p>Let the scout lead the way!</p>
            </Modal.Body>
            <Modal.Footer className={styles.centralize}>
                    <a href="https://github.com/distantstatic">My Github</a>
            </Modal.Footer>
        </Modal>
    )
}
