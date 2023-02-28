async function fetchCategories() {
    const url = "http://localhost:3000/api/categories/"
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export default fetchCategories