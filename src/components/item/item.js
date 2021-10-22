import { Figure, Image } from "react-bootstrap";
import styles from './item.module.css';

export default function ItemDisplay({item}){
    console.log(item);
    return (
        <Figure className={styles.item}>
            <h4> <u>Reward</u> </h4>
            <h5> {item.name} </h5>
            <Image rounded src={item.icon}/>
            <p><i>{item.description}</i></p>
            <p>Chat Link: {item.chat_link}</p>
        </Figure>
    )
}
