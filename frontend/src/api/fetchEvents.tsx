async function fetchEvents() {
    const url = "http://localhost:3000/api/events/"
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export default fetchEvents