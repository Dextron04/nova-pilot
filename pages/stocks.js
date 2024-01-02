import { useState, useEffect, React } from "react";
import styles from '../styles/stokcs.module.css';
import Charts from "../components/Charts";



const Stocks = () => {
    // const [timeSpan, setTimeSpan] = useState("minute");
    const [data, setData] = useState(" ");
    const [symbol, setSymbol] = useState("");
    const [timeRange, setTimeRange] = useState("day");
    const [chartData, setChartData] = useState({});



    useEffect(() => {
        const fetchData = async () => {
            const endDate = new Date();
            let startDate = new Date();
            let newTimeSpan;
            let multiplier;

            // console.log(startDate.setMonth(endDate.getMonth() - 1));

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

            // setTimeSpan(newTimeSpan);

            let url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/${multiplier}/${newTimeSpan}/${startDate.toISOString().split("T")[0]}/${endDate.toISOString().split("T")[0]}?adjusted=true&sort=asc&limit=120&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            if (response.status == 200) {
                console.log("Success");
                setData(data);

                if (data?.results) {
                    let labels = data.results.map(item => new Date(item.t).toLocaleDateString());

                    if (newTimeSpan == "minute") {
                        labels = data.results.map(item => new Date(item.t).toLocaleTimeString());
                    } else {
                        labels = data.results.map(item => new Date(item.t).toLocaleDateString());
                    }


                    const openData = data.results.map(item => item.o);
                    const closeData = data.results.map(item => item.c);
                    const highData = data.results.map(item => item.h);
                    const lowData = data.results.map(item => item.l);
                    const ticker = data.ticker;

                    setChartData({ labels, openData, closeData, highData, lowData, ticker });
                }
            } else if (response.status == 400) {
                console.warn("Empty Ticker");
            } else {
                console.log("Error");
            }
        }

        fetchData();
    }, [symbol, timeRange]);

    // using the event handler to get the value of the input values.
    const handleSubmit = (e) => {
        e.preventDefault();
        setSymbol(e.target.elements.symbol.value);
    }


    return (
        <div className={styles.bg}>
            <h1 className={styles.heading}>Stocks</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="symbol" />
                <select value={timeRange} onChange={e => setTimeRange(e.target.value)}>
                    <option value="day">Day</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                    <option value="all">All Time</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            <div className={styles.chart}>
                {data && <Charts data={chartData} />}
            </div>
        </div>
    );
}

export default Stocks;