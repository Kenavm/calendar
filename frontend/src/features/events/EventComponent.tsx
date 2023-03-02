import { MouseEventHandler } from "react";
import Button from "../../components/Button";
import Text from "../../components/Text";
import "./EventComponent.css";
function EventComponent(props: {
  name: string;
  hour: number;
  minute: number;
  category: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  console.log(props.hour)
  console.log(props.minute)
  return (
    <div
      className={props.category === 2 ? "work" : "personal"}
      onClick={() => props.onClick}
    >
      <div className="editButtonContainer">
        <Button
          name={"EDIT"}
          className={"editButton"}
          onClick={props.onClick}
        />
      </div>
      <Text text={props.name} />
      <Text
        text={`${props.hour.toString().padStart(2, "0")}h${props.minute
          .toString()
          .padStart(2, "0")}`}
      />
    </div>
  );
}

export default EventComponent;
