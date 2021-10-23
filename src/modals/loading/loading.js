import { Modal } from 'react-bootstrap';
import CustSpinner from '../../components/custspinner/custspinner';

import styles from './loading.module.css';

export default function LoadingModal(props) {
    return (
        <Modal show={props.show} onHide={props.hide} className={styles.loadingModal} contentClassName={styles.loadingModalContent} backdrop='static' centered>
            <Modal.Body>
                <CustSpinner />
            </Modal.Body>
        </Modal>
    )
}
