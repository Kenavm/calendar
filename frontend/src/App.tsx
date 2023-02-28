import "./App.css";
import Calendar from "./features/calendar/Calendar";
import EventList from "./features/eventList/EventList";

function App() {
  return (
    <div className="App">
      <Calendar />
      <EventList />
    </div>
  );
}

export default App;
