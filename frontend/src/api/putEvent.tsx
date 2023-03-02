async function putEvent(data: {}, id: number) {
  console.log(`http://localhost:3000/api/events/${id}`)
  const res = await fetch(`http://localhost:3000/api/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export default putEvent;
