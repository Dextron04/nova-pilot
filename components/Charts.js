import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import styles from '../styles/cards.module.css'

const Charts = ({ data }) => {



    // console.log(data.openData);
    // console.log(openData.labels);
    // console.log(data.labels);

    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Open',
                data: data.openData,
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Close',
                data: data.closeData,
                borderColor: '#36A2EB',
                backgroundColor: '#9BD0F5'
            },
            {
                label: 'High',
                data: data.highData,
                borderColor: 'rgba(153, 102, 255, 0.2)',
            },
            {
                label: 'Low',
                data: data.lowData,
                borderColor: 'rgba(255, 159, 64, 0.2)',
            },
        ],
    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: data.ticker,
            },
        },
    };


    return (
        <div className={styles.card}>
            <div className={styles.tools}>
                <div className={styles.circle}>
                    <span className={`${styles.red} ${styles.box}`}></span>
                </div>
                <div className={styles.circle}>
                    <span className={`${styles.yellow} ${styles.box}`}></span>
                </div>
                <div className={styles.circle}>
                    <span className={`${styles.green} ${styles.box}`}></span>
                </div>
            </div>
            <div className={styles.card__content}>
                <Line data={chartData} options={options} />
            </div>
        </div>

    )
}

export default Charts;