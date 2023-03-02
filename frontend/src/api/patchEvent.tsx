async function patchEvent(data: {}, id: number) {
    const res = await fetch(`http://localhost:3000/api/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  
  export default patchEvent;
  