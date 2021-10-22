import { Modal, Spinner } from 'react-bootstrap';

import styles from './loading.module.css';

export default function LoadingModal(props) {
    return (
        <Modal show={props.show} onHide={props.hide} className={styles.loadingModal} contentClassName={styles.loadingModalContent} backdrop='static' centered>
            <Modal.Body>
                <Spinner animation="border" role="status" className={styles.loadingSpinner}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Modal.Body>
        </Modal>
    )
}
