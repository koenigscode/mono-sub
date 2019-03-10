<template>
  <div ref="canvasWrapper" class="h-full">
    <canvas ref="canvas" class></canvas>
  </div>
</template>

<script>
export default {
  name: "frequency-rate",
  props: ["label", "labels", "values"],
  methods: {
    createChart(ctx) {
      let chart = new Chart(ctx, {
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
  mounted() {
    this.createChart(this.$refs.canvas.getContext("2d"));
  }
};
</script>
