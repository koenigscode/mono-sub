<template>
  <div ref="canvasWrapper" class="h-full overflow-hidden">
    <canvas ref="canvas" class></canvas>
  </div>
</template>

<script>
import colors from "@/colors.json";
export default {
  name: "frequency-rate",
  props: ["title", "chartData"],
  data() {
    return {
      chart: null
    };
  },
  computed: {
    sortedData() {
      let keys = Object.keys(this.chartData);
      let values = Object.values(this.chartData);
      let data = keys.map(function(e, i) {
        return [e, values[i]];
      });
      data.sort((a, b) => {
        return b[1] - a[1];
      });
      return data;
    },
    labels() {
      let arr = [];
      for (let i of this.sortedData) {
        arr.push(i[0]);
      }
      return arr;
    },
    values() {
      let arr = [];
      for (let i of this.sortedData) {
        arr.push(i[1]);
      }
      return arr;
    }
  },
  methods: {
    createChart(ctx) {
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: [
            {
              data: this.values,
              backgroundColor: colors.$accent + "40",
              hoverBackgroundColor: colors.$accent + "60",
              borderColor: colors.$accent,
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
            text: this.title
          },
          responsive: true,
          maintainAspectRatio: false,
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
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    }
  },
  watch: {
    chartData() {
      if (this.chart == null) {
        this.createChart(this.$refs.canvas.getContext("2d"));
      } else if (Object.keys(this.chartData).length == 0) {
        this.chart.destroy();
        this.chart = null;
      } else {
        this.chart.data.labels = this.labels;
        this.chart.data.datasets[0].data = this.values;
        this.chart.update();
      }
    }
  },
  mounted() {
    if (Object.keys(this.chartData).length > 0)
      this.createChart(this.$refs.canvas.getContext("2d"));
  }
};
</script>
