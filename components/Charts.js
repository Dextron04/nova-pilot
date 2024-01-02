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
                borderColor: 'rgba(75, 192, 192, 0.2)',
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
        <Line data={chartData} options={options} />
    )
}

export default Charts;