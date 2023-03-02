import { useState } from "react";
import Button from "../../components/Button";
import Header from "../../components/Header";
import EditEventForm from "./EditEventForm";
import './EditEvent.css'

function EditEvent(props: {
  headerText: string;
  nameOfEventToEdit: string;
  categoryOfEventToEdit: number;
  dateOfEventToEdit: {};
  categoryNames:Array<string>
  onCloseWindow:Function
}) {
    const [updatedName, setUpdatedName] = useState<string>("");
    const [updatedDate, setUpdatedDate] = useState<string>("");
    const [updatedCategory, setUpdatedCategory] = useState<string>("");

    function editEvent(updatedName: string, updatedDate: {}, updatedCategory: string) {

    }

  return (
    <div className="modalContainer">
     
        <div className="title">
          <Header heading={props.headerText} />
        </div>
        <div className="body">
          <EditEventForm
            formClassName={"editEvent"}
            inputClassName={"input"}
            typeText={"text"}
            typeSelect={"select"}
            typeDatepicker={"datetime-local"}
            labelName={"Name of Event: "}
            labelCategory={"Category: "}
            labelDate={"When: "}
            onSetUpdatedName={setUpdatedName}
            onSetUpdatedDate={setUpdatedDate}
            onSetUpdatedCategory={setUpdatedCategory}
            nameOfEventToEdit={props.nameOfEventToEdit}
            dateOfEventToEdit={props.dateOfEventToEdit.toString()}
            categoryOfEventToEdit={props.categoryOfEventToEdit === 2 ? "work": "personal"}
            categoryNames={props.categoryNames}
           
          />
        </div>
        <div className="footer">
          <Button
            name={"Update"}
            className={"update"}
            onClick={() => editEvent(updatedName, updatedDate, updatedCategory)}
          />
          <Button
            name={"Cancel"}
            className={"cancel"}
            onClick={() => props.onCloseWindow(false)}
          />
        </div>
      </div>
   
  );
}

export default EditEvent;
