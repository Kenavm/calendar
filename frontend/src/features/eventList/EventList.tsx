import { useEffect, useState } from "react";
import Event from "../../types/Event";
import EventComponent from "../events/EventComponent";
import fetchEvents from "../../api/fetchEvents";
import Button from "../../components/Button";

function EventList() {
  const [events, setEvents] = useState<Array<Event>>([]);

  useEffect(() => {
    async function loadEventsData() {
      setEvents(await fetchEvents());
    }
    loadEventsData();
  }, []);

  function createEvent() {
    console.log("test");
    let event = {
      id: 3,
      name: "work meeting v2",
      date: {
        year: 2023,
        month: 9,
        day: 5,
        hour: 8,
        minute: 0,
      },
      category: 2,
    };

    setEvents([...events, event]);
  }

  return (
    <div>
      <Button
        name={"Add Event"}
        className={"addButon"}
        onClick={() => createEvent()}
      />
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
  );
}

export default EventList;
