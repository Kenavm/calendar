import { useEffect, useState } from "react";
import Event from "../../types/Event";
import EventComponent from "../events/EventComponent";
import fetchEvents from "../../api/fetchEvents";
import Button from "../../components/Button";
import CreateEvent from "../createNewEvent/CreateEvent";
import fetchCategories from "../../api/fetchCategories";
import EditEvent from "../editEvent/EditEvent";
import DateBar from "./DateBar";

function EventList() {
  const [events, setEvents] = useState<Array<Event>>([]);
  const [categories, setCategories] = useState<Array<Event>>([]);
  const [openCreateEventModal, setOpenCreateEventModal] =
    useState<boolean>(false);
  const [openEditEventModal, setOpenEditEventModal] = useState<boolean>(false);

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
  console.log(events)
  return (
    <div>
      <Button
        name={"Create Event"}
        className={"addButton"}
        onClick={() => setOpenCreateEventModal(true)}
      />
      <div className="createEvent">
        {openCreateEventModal && (
          <CreateEvent
            headerText={"New Event"}
            saveButtonName={"Save"}
            cancelButtonName={"Cancel"}
            buttonClassName={"button"}
            onSetEvents={setEvents}
            onCloseWindow={setOpenCreateEventModal}
            events={events}
            categoryNames={categories.map((category) => category.name)}
          />
        )}
      </div>
      <div className="events">
        <DateBar />
        {events.map((event) => {
          return (
            <EventComponent
              key={event.id}
              name={event.name}
              hour={event.date.hour}
              minute={event.date.minute}
              category={event.category}
              onClick={() => setOpenEditEventModal(true)}
            />
          );
        })}
      </div>
      <div className="editEvent">{openEditEventModal && <EditEvent />}</div>
    </div>
  );
}

export default EventList;
