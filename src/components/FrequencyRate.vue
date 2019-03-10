<template>
  <div ref="canvasWrapper">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "frequency-rate",
  props: ["label", "labels", "values"],
  methods: {
    updateCanvas() {
      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");
      let canvasWrapper = this.$refs.canvasWrapper;

      canvas.width = canvasWrapper.clientWidth;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    this.updateCanvas();
    window.addEventListener("resize", this.updateCanvas, false);
  }
};
</script>
