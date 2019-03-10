<template>
  <div ref="canvasWrapper" class="h-full">
    <canvas ref="canvas" class></canvas>
  </div>
</template>

<script>
export default {
  name: "frequency-rate",
  props: ["label", "chartData"],
  data() {
    return {
      chart: null
    };
  },
  computed: {
    labels() {
      return Object.keys(this.chartData);
    },
    values() {
      return Object.values(this.chartData);
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
              label: this.label,
              data: this.values,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
      console.log("update")
      this.chart.data.labels = this.labels;
      this.chart.data.datasets[0].data = this.values;
      this.chart.update();
    }
  },
  mounted() {
    this.createChart(this.$refs.canvas.getContext("2d"));
  }
};
</script>
