import { Spinner } from 'react-bootstrap';
import styles from './custspinner.module.css';

export default function CustSpinner() {
    return(
        <Spinner animation="border" role="status" className={styles.loadingSpinner}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}