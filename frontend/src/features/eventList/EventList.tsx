import { useEffect, useState } from "react";
import Event from "../../types/Event";
import EventComponent from "../events/EventComponent";
import fetchEvents from "../../api/fetchEvents";
import Button from "../../components/Button";
import CreateEvent from "./CreateEvent";
import fetchCategories from '../../api/fetchCategories'

function EventList() {
  const [events, setEvents] = useState<Array<Event>>([]);
  const [categories, setCategories] = useState<Array<Event>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
 
  useEffect(() => {
    async function loadEventsData() {
      setEvents(await fetchEvents());
    }

    loadEventsData();
  }, []);

  useEffect(() => {
    async function loadCategoryData() {
      setCategories(await fetchCategories());
    }

    loadCategoryData();
  }, []);

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
            headerText={"New Event"}
            saveButtonName={"Save"}
            cancelButtonName={"Cancel"}
            buttonClassName={"button"}
            onSetEvents={setEvents}
            onCloseWindow={setOpenModal}
            events={events}
            categoryNames={categories.map(category => category.name)}
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
              category={event.category}
            />
          );
        })}
      </div>
    </div>
  );
}

export default EventList;
