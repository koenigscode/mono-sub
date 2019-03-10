<template>
  <div class="container inline-block">
    <div class="flex justify-between">
      <span class="mx-2 w-1/3 text-center">{{label}}:</span>
      <input class="w-2/3 text-center" v-model="input" type="text" maxlength="1">
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
  },
  watch: {
    input(val) {
      if (val != undefined && val.trim().length != 0) {
        // let obj = {};
        // obj[this.label] = val.trim();
        this.$emit("mappingChange", this.label, val.trim());
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "../styles/_variables.styl"

.container
  border-radius 0.2rem
  background $dark-lighter
  overflow hidden

span 
  color $white

input
  background $dark-light
  color $white
</style>
