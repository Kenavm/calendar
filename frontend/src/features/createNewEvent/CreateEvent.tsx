import { useState } from "react";
import Button from "../../components/Button";
import CreateNewEventForm from "./CreateNewEventForm";
import Header from "../../components/Header";
import "./CreateEvent.css";
import postEvent from "../../api/postEvents";

function CreateEvent(props: {
  headerText: string;
  saveButtonName: string;
  cancelButtonName: string;
  buttonClassName: string;
  onSetEvents: Function;
  onCloseWindow: Function;
  events: Array<Event>;
  categoryNames: Array<string>;
}) {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  function createEvent(name: string, date: {}, category: string) {
    if (date === "") {
      date = {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
      };
    }
    const event = {
      id: Math.floor(Math.random() * 10000),
      name: name,
      date: date,
      category: category,
    };
    props.onSetEvents([...props.events, event]);
    postEvent(event);

    props.onCloseWindow(false);
  }

  return (
    <div className="modalContainer">
      <div className="title">
        <Header heading={props.headerText} />
      </div>
      <div className="body">
        <CreateNewEventForm
          formClassName={"createEvent"}
          inputClassName={"input"}
          typeText={"text"}
          typeSelect={"select"}
          typeDatepicker={"datetime-local"}
          labelName={"Name of Event: "}
          labelCategory={"Category: "}
          labelDate={"When: "}
          onSetName={setName}
          onSetDate={setDate}
          onSetCategory={setCategory}
          name={name}
          date={date}
          category={category}
          categoryNames={props.categoryNames}
        />
      </div>
      <div className="footer">
        <Button
          name={props.saveButtonName}
          className={props.saveButtonName.toLowerCase()}
          onClick={() => createEvent(name, date, category)}
        />
        <Button
          name={props.cancelButtonName}
          className={props.cancelButtonName.toLowerCase()}
          onClick={() => props.onCloseWindow(false)}
        />
      </div>
    </div>
  );
}

export default CreateEvent;
