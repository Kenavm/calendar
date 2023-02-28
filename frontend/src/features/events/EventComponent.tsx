import { MouseEventHandler } from 'react';
import Text from '../../components/Text'
import './EventComponent.css'
function EventComponent(props: {name: string, hour: number, minute: number, category: number, onClick: MouseEventHandler<HTMLButtonElement>}) {
    return(
    <div className={(props.category === 2) ? "work":"personal"} onClick={() => props.onClick}>
        <Text text={props.name} />
        <Text text={`${props.hour.toString().padStart(2, "0")}h${props.minute.toString().padStart(2, "0")}`} />
    </div>)
}


export default EventComponent;