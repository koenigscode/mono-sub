import React, { Component } from "react";
import "./FrequencyChart.scss";
import colors from "../../scss/_variables.scss";

class FrequencyChart extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.canvasWrapper = React.createRef();
    this.state = { chart: null };
  }

  get sortedData() {
    let keys = Object.keys(this.props.chartdata);
    let values = Object.values(this.props.chartdata);
    let data = keys.map(function(e, i) {
      return [e, values[i]];
    });
    data.sort((a, b) => {
      return b[1] - a[1];
    });
    return data;
  }

  get labels() {
    let arr = [];
    for (let i of this.sortedData) {
      arr.push(i[0]);
    }
    return arr;
  }

  get values() {
    let arr = [];
    for (let i of this.sortedData) {
      arr.push(i[1]);
    }
    return arr;
  }

  createChart(ctx) {
    this.setState({
      // eslint-disable-next-line no-undef
      chart: new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.props.labels,
          datasets: [
            {
              data: this.props.values,
              backgroundColor: colors.accent + "80",
              hoverBackgroundColor: colors.accent + "A0",
              borderColor: colors.accent,
              borderWidth: 2
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: this.props.title
          },
          responsive: true,
          tooltips: {
            displayColors: false,
            callbacks: {
              label: item =>
                `Häufigkeit: ${Math.round(item.yLabel * 100) / 100}%`
            }
          },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Häufigkeit in Prozent"
                },
                ticks: {
                  beginAtZero: true,
                  max: this.props.maxtick
                }
              }
            ]
          }
        }
      })
    });
  }

  updateChart() {
    if (this.state.chart == null) {
      this.createChart(this.canvas.current.getContext("2d"));
    } else if (Object.keys(this.props.chartdata).length == 0) {
      this.state.chart.destroy();
      this.state.chart = null;
    } else {
      this.state.chart.data.labels = this.labels;
      this.state.chart.data.datasets[0].data = this.values;
      this.state.chart.options.scales.yAxes[0].ticks.max = this.props.maxtick;
      this.state.chart.update();
    }
  }

  componentDidUpdate() {
    this.updateChart();
  }

  componentDidMount() {
    if (Object.keys(this.props.chartdata).length > 0) {
      this.createChart(this.canvas.current.getContext("2d"));
    }
  }

  render() {
    return (
      <div
        ref={this.canvasWrapper}
        className="h-full flex justify-center overflow-hidden"
      >
        <canvas ref={this.canvas} className="max-w-5xl" />
      </div>
    );
  }
}

export default FrequencyChart;
