<template>
  <div id="canvas-wrapper">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "frequency-rate",
  props: ["label"],
  methods: {
    updateCanvas() {
      let canvas = document.getElementById("canvas");
      let canvasWrapper = document.getElementById("canvas-wrapper");
      console.log(canvasWrapper.clientWidth);
      canvas.width = canvasWrapper.clientWidth;

      var ctx = canvas.getContext("2d");
      var chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: this.label,
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 2
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
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
