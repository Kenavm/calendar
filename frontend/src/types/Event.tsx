type Event = {
    id: number;
    name: string;
    date: {
      year: number;
      month: number;
      day: number;
      hour: number;
      minute: number;
    };
    category: number;
  };
  
  export default Event;