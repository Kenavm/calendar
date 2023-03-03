import { useEffect, useState } from "react";
import Event from "../../types/Event";
import EventComponent from "../events/EventComponent";
import fetchEvents from "../../api/fetchEvents";
import Button from "../../components/Button";
import CreateEvent from "../createNewEvent/CreateEvent";
import fetchCategories from "../../api/fetchCategories";
import EditEvent from "../editEvent/EditEvent";
import DateBar from "./DateBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import './EventList.css'

function EventList() {
  const [events, setEvents] = useState<Array<Event>>([]);
  const [categories, setCategories] = useState<Array<Event>>([]);
  const [openCreateEventModal, setOpenCreateEventModal] =
    useState<boolean>(false);
  const [openEditEventModal, setOpenEditEventModal] = useState<boolean>(false);
  const [eventToEdit, setEventToEdit] = useState<Event>({
    id: 0,
    name: "",
    date: {
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
    },
    category: 0,
  });

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

  function handleClick(id: number): void {
    setEventToEdit(events.find((event) => event.id === id));
    setOpenEditEventModal(true);
  }

  return (
    <div>
        <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin]}
          events={events.map((event) => {
            return {
              title: event.name,
              start: new Date(
                event.date.year,
                event.date.month,
                event.date.day,
                event.date.hour,
                event.date.minute
              ),
              allDay: true,
            };
          })}
        />
      </div>
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
              onClick={() => handleClick(event.id)}
            />
          );
        })}
      </div>
      <div className="editEvent">
        {openEditEventModal && (
          <EditEvent
            headerText={"Edit Event"}
            nameOfEventToEdit={eventToEdit.name}
            categoryOfEventToEdit={eventToEdit.category}
            dateOfEventToEdit={
              new Date(
                eventToEdit.date.year,
                eventToEdit.date.month,
                eventToEdit.date.day,
                eventToEdit.date.hour,
                eventToEdit.date.minute
              )
            }
            categoryNames={categories.map((category) => category.name)}
            onCloseWindow={setOpenEditEventModal}
            onSetEvents={setEvents}
            events={events}
            id={eventToEdit.id}
          />
        )}
      </div>
    </div>
  );
}

export default EventList;
