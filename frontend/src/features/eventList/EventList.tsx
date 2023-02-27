import { useEffect, useState } from "react";
import Event from "../../types/Event";
import EventComponent from "../events/EventComponent";
import fetchEvents from "../../api/fetchEvents";
import Button from "../../components/Button";
import CreateEvent from "./CreateEvent";

function EventList() {
  const [events, setEvents] = useState<Array<Event>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    async function loadEventsData() {
      setEvents(await fetchEvents());
    }
    loadEventsData();
  }, []);

  function createEvent(
    name: string,
    date: {
      year: number;
      month: number;
      day: number;
      hour: number;
      minute: number;
    },
    category: number
  ) {
    let event = {
      id: Math.floor(Math.random() * 10000),
      name: name,
      date: date,
      category: category,
    };

    setEvents([...events, event]);
    setOpenModal(false);
  }

  return (
    <div>
      <Button
        name={"Create Event"}
        className={"addButon"}
        onClick={() => setOpenModal(true)}
      />
      <div className="createEvent">
        {openModal && (
          <CreateEvent
            formClassName={"createEvent"}
            inputClassName={"input"}
            typeText={"text"}
            typeDatepicker={"datepicker"}
            headerText={"New Event"}
            saveButtonName={"Save"}
            cancelButtonName={"Cancel"}
            buttonClassName={"button"}
            onCreateEvent={createEvent}
            onCloseWindow={setOpenModal}
          />
        )}
      </div>
      <div className="events">
        {events.map((event) => {
          return (
            <EventComponent
              key={event.id}
              name={event.name}
              hour={event.date.hour}
              minute={event.date.minute}
              category={"work"}
            />
          );
        })}
      </div>
    </div>
  );
}

export default EventList;
