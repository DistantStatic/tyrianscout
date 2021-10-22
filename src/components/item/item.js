import { Figure, Image } from "react-bootstrap";

export default function ItemDisplay(item){

    return (
        <Figure>
            <h3> {item.name} </h3>
            <Image rounded src={item.icon}/>
            <p><i>{item.description}</i></p>
            <p>Chat Link: {item.chat_link}</p>
        </Figure>
    )
}
