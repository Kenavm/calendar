async function fetchEvents(from?: string | undefined, to?: string | undefined) {
  const baseUrl: string = "http://localhost:3000/api/events";
  let url: string = "";
    console.log(from)
    console.log(to)
  if (from !== undefined || to !== undefined) {
    if (from !== "" && to === "" || to === undefined) {
      url = baseUrl + `?from=${from}`;
    } else if (from === "" && to !== "") {
      url = baseUrl + `?to=${to}`;
    } else if (from !== "" && to !== "") {
      url = baseUrl + `?from=${from}&to=${to}`;
    }
  } else {
    url = baseUrl;
  }
  console.log(url)
  const res = await fetch(url);
  const data = await res.json();
  console.log(data)
  return data;
}

export default fetchEvents;
