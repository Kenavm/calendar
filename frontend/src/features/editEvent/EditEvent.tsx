import { useState } from "react";
import Button from "../../components/Button";
import Header from "../../components/Header";
import EditEventForm from "./EditEventForm";
import './EditEvent.css'
import moment from "moment";
import putEvent from "../../api/putEvent";

function EditEvent(props: {
  headerText: string;
  nameOfEventToEdit: string;
  categoryOfEventToEdit: number;
  dateOfEventToEdit: Date;
  categoryNames:Array<string>
  onCloseWindow:Function
  onSetEvents: Function
  events: Array<Event>
  id: number
}) {
    const [updatedName, setUpdatedName] = useState<string>(props.nameOfEventToEdit);
    const [updatedDate, setUpdatedDate] = useState<Date>(props.dateOfEventToEdit);
    const [updatedCategory, setUpdatedCategory] = useState<string>(props.categoryOfEventToEdit === 2 ? "work":"personal");
   
    function editEvent(updatedName: string, updatedDate: {}, updatedCategory: string, id:number) {
      console.log(updatedDate)
      if (updatedDate === "") {
        updatedDate = {
          year: 0,
          month: 0,
          day: 0,
          hour: 0,
          minute: 0,
        };
      }
      const event = {
        id: props.id,
        name: updatedName,
        date: updatedDate,
        category: updatedCategory,
      };
      props.onSetEvents([...props.events, event]);
      putEvent(event, event.id);
  
      props.onCloseWindow(false);
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
            updatedName={updatedName}
            updatedDate={moment(updatedDate).format("YYYY-MM-DDTkk:mm")}
            updatedCategory={updatedCategory}
            onSetUpdatedName={setUpdatedName}
            onSetUpdatedDate={setUpdatedDate}
            onSetUpdatedCategory={setUpdatedCategory}
            categoryNames={props.categoryNames}
          />
        </div>
        <div className="footer">
          <Button
            name={"Update"}
            className={"update"}
            onClick={() => editEvent(updatedName, updatedDate, updatedCategory, props.id)}
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
