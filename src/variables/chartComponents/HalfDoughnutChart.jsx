import React, { useState, useEffect } from "react"
import { Doughnut } from "react-chartjs-2"
const HalfDoughnutChart = (props) => {
  const [chartData, setChartData] = useState({})
  const chart = () => {
    setChartData({
      labels: props.labels,
      datasets: [
        {
          label: "Data",
          fill: true,
          backgroundColor: props.color,
          borderColor: props.lineColor,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
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
        enabled: false
    },
    responsive: true,
    circumference: Math.PI,
    rotation: Math.PI,
  }
  return <Doughnut data={chartData} options={options} />
}

export default HalfDoughnutChart
