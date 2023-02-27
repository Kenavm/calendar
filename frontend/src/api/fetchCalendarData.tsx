async function fetchCalenderData() {
    const url = "https://calendarific.com/api/v2?api_key=4843c00f0bc106b47c867933ed2fc56e47d99356&country=AT";
    const res = await fetch(url)
    const data = res.json();
    return data;
}

export default fetchCalenderData;