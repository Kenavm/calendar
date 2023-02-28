import { useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Header from "../../components/Header";
import "./CreateEvent.css";

function CreateEvent(props: {
  headerText: string;
  saveButtonName: string;
  cancelButtonName: string;
  buttonClassName: string;
  onSetEvents: Function;
  onCloseWindow: Function;
  events: any;
}) {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  function createEvent(name: string, date: {}, category: string) {
    
    console.log(name)
    console.log(date)
    const event = {
      id: Math.floor(Math.random() * 10000),
      name: name,
      date: date,
      category: category,
    };

    props.onSetEvents([...props.events, event]);
    props.onCloseWindow(false);
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="createEvent">
          <div className="title">
            <Header heading={props.headerText} />
          </div>
          <div className="body">
            <Form
              formClassName={"createEvent"}
              inputClassName={"input"}
              typeText={"text"}
              typeDatepicker={"datetime-local"}
              onSetName={setName}
              onSetDate={setDate}
              onSetCategory={setCategory}
              name={name}
              date={date}
              category={category}
            />
          </div>
          <div className="footer">
            <Button
              name={props.saveButtonName}
              className={props.buttonClassName}
              onClick={() => createEvent(name, date, category)}
            />
            <Button
              name={props.cancelButtonName}
              className={props.buttonClassName}
              onClick={() => props.onCloseWindow(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
