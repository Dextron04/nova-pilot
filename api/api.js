
// Fetch stocks data
export const fetchData = async (symbol, multiplier, newTimeSpan, startDate, endDate, timeRange) => {

    switch (timeRange) {
        case "day":
            multiplier = 20;
            newTimeSpan = "minute"
            startDate.setDate(endDate.getDate() - 1);
            break;
        case "month":
            multiplier = 1;
            newTimeSpan = "day"
            startDate.setMonth(endDate.getMonth() - 1);
            // console.log(startDate.toISOString().split("T")[0]);
            // console.log(endDate.toISOString().split("T")[0]);
            // console.log(timeSpan);
            break;
        case "year":
            multiplier = 1;
            newTimeSpan = "month"
            startDate.setFullYear(endDate.getFullYear() - 1);
            break;
        case "all":
            multiplier = 3;
            newTimeSpan = "month"
            startDate = new Date("0");
            break;
    }

    let url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/${multiplier}/${newTimeSpan}/${startDate.toISOString().split("T")[0]}/${endDate.toISOString().split("T")[0]}?adjusted=true&sort=asc&limit=120&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.status == 200) {
        console.log("Success");
        return data;
    } else if (response.status == 400) {
        console.warn("Empty Ticker");
    } else if (response.status == 429) {
        console.warn("Too many requests (5 requests in 1 minute only)");
    } else {
        throw new Error(data);
    }
}