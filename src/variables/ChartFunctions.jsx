// Assuming each factory/production line/machine works for 24 hours in total
function calculateData(time) {
  let timeParts = time.split(":")
  return [timeParts[0] * 60 + timeParts[1] * 1, 24 * 60]
}
function calculatePercentage(time) {
  let timeParts = time.split(":")
  let totalMinutes = timeParts[0] * 60 + timeParts[1] * 1
  return Math.round((totalMinutes / (24 * 60)) * 100) + "%"
}

function timeToString(time) {
  let timeParts = time.split(":")
  return timeParts[0] + "h " + timeParts[1] + "min"
}

function lastWeekData(data) {
  let dates = Object.keys(data).slice(0, 7)
  let completedPerDay = []
  dates.forEach((date) => completedPerDay.push(data[date].completed))
  let average = Math.round(completedPerDay.reduce((a, b) => a + b, 0) / 7)
  return [completedPerDay.reverse(), dates.reverse(), average]
}
function totalJobs(data) {
  return data.completed + data.pending + data.scrapped + data.rejected
}

function TimeChart(data, labels) {
  let bgColor = ""
  let lineColor = ""
  let dataPoint = ""
  switch (labels[0]) {
    case "Use Time":
      bgColor = "rgba(29,140,248,0.2)"
      lineColor = "rgb(29,140,248)"
      dataPoint = data.upTime
      break
    case "Idle Time":
      bgColor = "rgba(248, 208, 29,0.2)"
      lineColor = "rgb(248, 208, 29)"
      dataPoint = data.idleTime
      break
    case "Downtime":
      bgColor = "rgba(248,29,204,0.2)"
      lineColor = "rgb(248,29,204)"
      dataPoint = data.downTime
      break
    default:
      break
  }

  let options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    responsive: true,
    circumference: Math.PI,
    rotation: Math.PI,
  }

  let chart = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d")

      return {
        labels: labels,
        datasets: [
          {
            label: "Data",
            fill: true,
            backgroundColor: [bgColor],
            borderColor: lineColor,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: calculateData(dataPoint),
          },
        ],
      }
    },
    options: options,
  }
  return chart
}
function CompletionRateChart(data) {
  console.log(data)
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
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 45,
            padding: 20,
            fontColor: "#9e9e9e",
          },
        },
      ],
    },
  }
  let chart = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d")

      return {
        labels: lastWeekData(data)[1],
        datasets: [
          {
            label: "Data",
            fill: true,
            backgroundColor: "rgba(29,248,179,0.2)",
            borderColor: "rgb(29,248,179)",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: lastWeekData(data)[0],
          },
        ],
      }
    },
    options: options,
  }
  return chart
}
function JobsChart(data) {
  console.log(data)
  let options = {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: "right",
      labels: {
        fontColor: "#9A9A9A",
      },
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
  let chart = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d")

      return {
        labels: [
          "Completed Jobs",
          "Pending Jobs",
          "Scrapped Jobs",
          "Rejected Jobs",
        ],
        datasets: [
          {
            label: "Data",
            fill: true,
            backgroundColor: [
              "rgba(29,140,248,0.2)",
              "rgba(248, 208, 29,0.2)",
              "rgba(248,29,204,0.2)",
              "rgba(248, 29, 36,0.2)",
            ],
            borderColor: [
              "rgb(29,140,248)",
              "rgb(248, 208, 29)",
              "rgb(248,29,204)",
              "rgb(248, 29, 36)",
            ],
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [data.completed, data.pending, data.scrapped, data.rejected],
          },
        ],
      }
    },
    options: options,
  }
  return chart
}
function DeliveryChart(data, labels) {
  let options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    responsive: true,
    circumference: Math.PI,
    rotation: Math.PI,
  }
  let chart = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d")
      return {
        labels: labels,
        datasets: [
          {
            label: "Data",
            fill: true,
            backgroundColor: ["rgba(29,248,179,0.2)"],
            borderColor: "rgb(29,248,179)",
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
            data: data,
          },
        ],
      }
    },
    options: options,
  }
  return chart
}

export { TimeChart, calculatePercentage, timeToString, lastWeekData, totalJobs, CompletionRateChart, JobsChart, DeliveryChart }
