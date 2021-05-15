import React, { useState, useEffect } from "react"
import { Pie } from "react-chartjs-2"

const PieChart = (props) => {
  const [chartData, setChartData] = useState({})
  const chart = () => {
    setChartData({
      labels: ["Completed Jobs", "Pending Jobs", "Scrapped Jobs", "Rejected Jobs"],
      datasets: [
        {
          label: "Jobs",
          fill: true,
          backgroundColor: ["rgba(29,140,248,0.2)", "rgba(248, 208, 29,0.2)", "rgba(248,29,204,0.2)", "rgba(248, 29, 36,0.2)"],
          borderColor: ["rgb(29,140,248)", "rgb(248, 208, 29)", "rgb(248,29,204)", "rgb(248, 29, 36)"],
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
      display: true,
      position: "right",
      labels: {
        fontColor: "#9A9A9A"
      }
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
  }
  return <Pie data={chartData} options={options}/>
}

export default PieChart
