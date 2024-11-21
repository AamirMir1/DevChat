import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  orange,
  orangeLight,
  purple,
  purpleLight,
} from "../../constants/color";
import { getLast7Days } from "../../lib/features";

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Messages",
        fill: true,
        backgroundColor: purpleLight[300],
        borderColor: purple[500],
        borderWidth: 2,
        tension: 0.4, // Smooth the line with tension for a smoother look
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure the chart takes up full container space
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
    scales: {
      x: {
        grid: {
          borderColor: "#ddd", // Light color for x grid lines
        },
        ticks: {
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
      y: {
        grid: {
          borderColor: "#ddd", // Light color for y grid lines
        },
        ticks: {
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "500",
          },
          color: "#333",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        bodyColor: "#fff",
        borderRadius: 5,
        padding: 10,
      },
    },
    animation: {
      duration: 1000, // Smooth transition for the chart when loading
    },
  };

  return (
    <div style={{ position: "relative", height: "300px", width: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 120,
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        backgroundColor: [purpleLight, orangeLight],
        hoverBackgroundColor: [purple, orange],
        borderColor: [purple, orange],
        offset: 40,
      },
    ],
  };
  return (
    <Doughnut
      style={{ zIndex: 10 }}
      data={data}
      options={doughnutChartOptions}
    />
  );
};

export { DoughnutChart, LineChart };
