import { useState, useEffect, React } from "react";
import styles from '../styles/stokcs.module.css';
import Charts from "../components/Charts";
import { fetchData } from "../api/api";



const Stocks = () => {
    // const [timeSpan, setTimeSpan] = useState("minute");
    const [data, setData] = useState(" ");
    const [symbol, setSymbol] = useState("");
    const [timeRange, setTimeRange] = useState("day");
    const [chartData, setChartData] = useState({});



    useEffect(() => {
        const getData = async () => {
            const endDate = new Date();
            let startDate = new Date();


            const data = await fetchData(symbol, startDate, endDate, timeRange);

            setData(data);

            if (data?.results) {
                let labels = "";

                if (timeRange == "day") {
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
        }

        getData();
    }, [symbol, timeRange]);

    // using the event handler to get the value of the input values.
    const handleSubmit = (e) => {
        e.preventDefault();
        setSymbol(e.target.elements.symbol.value);
    }


    return (
        <div className={styles.bg}>
            <h1 className={styles.heading}>Stocks</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input placeholder="Searth the internet..." type="text" name="symbol" className={styles.input} />
                <select value={timeRange} className={styles.input} onChange={e => setTimeRange(e.target.value)}>
                    <option value="day">Day</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                    <option value="all">All Time</option>
                </select>
                <button type="submit" className={styles.input}>Submit</button>
            </form>
            <div className={styles.chart}>
                {data && <Charts data={chartData} />}
            </div>
        </div>
    );
}

export default Stocks;