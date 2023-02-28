import Text from '../../components/Text'
import './EventComponent.css'
function Event(props: {name: string, hour: number, minute: number, category: number}) {
    return(
    <div className={(props.category === 2) ? "work":"personal"}>
        <Text text={props.name} />
        <Text text={`${props.hour.toString().padStart(2, "0")}:${props.minute.toString().padStart(2, "0")}`} />
    </div>)
}


export default Event;