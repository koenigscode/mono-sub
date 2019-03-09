<template>
  <div class="inline m-2">
    <div class="flex justify-end">
      <span class="mx-2">{{label}}:</span>
      <input v-model="input" type="text">
    </div>
  </div>
</template>
<script>
export default {
  name: "char-mapping",
  props: ["label", "value"],
  data() {
    return {
      input: this.value
    };
  }
};
</script>

<style lang="stylus" scoped>
input
  width 3rem
  background gray
</style>
