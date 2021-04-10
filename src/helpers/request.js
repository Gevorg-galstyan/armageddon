export async function request(date, id) {
    const requestDate = date && date.toISOString().slice(0, 10);
    const url = `https://api.nasa.gov/neo/rest/v1/${requestDate ? `feed?start_date=${requestDate}&`:`neo/${id}?`}api_key=LecmhWeE4D6egyg5R50CUAIFBvEhB26C1PmH7yDQ`
    return fetch(url,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(async res=> await res.json())
};
