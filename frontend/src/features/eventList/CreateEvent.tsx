import { useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Header from "../../components/Header";
import "./CreateEvent.css";

function CreateEvent(props: {
  formClassName: string;
  inputClassName: string;
  typeText: string;
  typeDatepicker: string;
  headerText: string;
  saveButtonName: string;
  cancelButtonName: string;
  buttonClassName: string;
  onCreateEvent: Function;
  onCloseWindow: Function;
}) {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  
  return (
    <div className="createEvent">
      <Header heading={props.headerText} />
      <Form
        formClassName={props.formClassName}
        inputClassName={props.inputClassName}
        typeText={props.typeText}
        typeDatepicker={props.typeDatepicker}
        onSetName={setName}
        onSetDate={setDate}
        onSetCategory={setCategory}
      />
      <Button
        name={props.saveButtonName}
        className={props.buttonClassName}
        onClick={() => props.onCreateEvent(name, date, category)}
      />
      <Button
        name={props.cancelButtonName}
        className={props.buttonClassName}
        onClick={() => props.onCloseWindow(false)}
      />
    </div>
  );
}

export default CreateEvent;
