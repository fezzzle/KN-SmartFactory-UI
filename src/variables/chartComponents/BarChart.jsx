import React, { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2"

const BarChart = (props) => {
  const [chartData, setChartData] = useState({})
  const chart = () => {
    setChartData({
      labels: props.labels,
      datasets: [
        {
          label: "Jobs",
          fill: true,
          backgroundColor: props.color,
          hoverBackgroundColor: props.color,
          borderColor: props.lineColor,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: props.data,
        },
      ],
    })
  }
  useEffect(() => {
    chart()
  }, [])

  let options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
    },
  }
  return <Bar data={chartData} options={options}/>
}

export default BarChart
