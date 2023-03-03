import { MouseEventHandler } from "react";
import Button from "../../components/Button";
import Text from "../../components/Text";
import "./EventComponent.css";
function EventComponent(props: {
  name: string;
  hour: number;
  minute: number;
  category: number;
  editEvent: MouseEventHandler<HTMLButtonElement>;
  deleteEvent: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="event">
      <div
        className={props.category === 2 ? "work" : "personal"}
        onClick={() => props.editEvent}
      >
        <div className="buttonContainer">
          <Button
            name={"EDIT"}
            className={"editButton"}
            onClick={props.editEvent}
          />
          <Button
            name={"DELETE"}
            className={"deleteButton"}
            onClick={props.deleteEvent}
          />
        </div>

        <Text text={props.name} />
        <Text
          text={`${props.hour.toString().padStart(2, "0")}h${props.minute
            .toString()
            .padStart(2, "0")}`}
        />
      </div>
    </div>
  );
}

export default EventComponent;
