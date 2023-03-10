async function deleteEvent(id: number) {
    const res = await fetch(`http://localhost:3000/api/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  
  export {deleteEvent as deleteEventRequest};
  