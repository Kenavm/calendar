import { useState } from "react";
import Button from "../../components/Button";
import Header from "../../components/Header";
import EditEventForm from "./EditEventForm";
import "./EditEvent.css";
import moment from "moment";
import patchEvent from "../../api/patchEvent";
import Event from "../../types/Event";
import putEvent from "../../api/putEvent";

function EditEvent(props: {
  headerText: string;
  nameOfEventToEdit: string;
  categoryOfEventToEdit: number;
  dateOfEventToEdit: Date;
  categoryNames: Array<string>;
  onCloseWindow: Function;
  onSetEvents: Function;
  events: Array<Event>;
  id: number;
}) {
  const [updatedName, setUpdatedName] = useState<string>(
    props.nameOfEventToEdit
  );
  const [updatedDate, setUpdatedDate] = useState<Date>(props.dateOfEventToEdit);
  const [updatedCategory, setUpdatedCategory] = useState<string>(
    props.categoryOfEventToEdit === 2 ? "work" : "personal"
  );

  function editEvent() {
    let eventsWithNewData: Array<Event>;

    if (updatedDate === props.dateOfEventToEdit) {
      const newData = {
        name: updatedName,
        category: updatedCategory === "work" ? 2 : 3,
      };

      patchEvent(newData, props.id);

      eventsWithNewData = props.events.map((event) =>
        event.id === props.id ? { ...event, ...newData } : event
      );
      console.log(eventsWithNewData);

      props.onSetEvents(eventsWithNewData);
      props.onCloseWindow(false);
    } else {
      let newData = {
        id: props.id,
        name: updatedName,
        date: updatedDate,
        category: updatedCategory === "work" ? 2 : 3,
      };
      let eventsWithNewData = props.events.map((event) => {
        if (props.id === event.id) {
          return {
            ...event,
            ...newData,
          };
        } else {
          return event;
        }
      });
      putEvent(
        {
          id: props.id,
          name: updatedName,
          date: updatedDate,
          category: updatedCategory === "work" ? 2 : 3,
        },
        props.id
      );
      console.log(eventsWithNewData);
      props.onSetEvents(eventsWithNewData);
      props.onCloseWindow(false);
    }
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
          onClick={() => editEvent()}
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
