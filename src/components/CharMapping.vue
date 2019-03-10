<template>
  <div class="map-container inline-block">
    <div class="map flex justify-between">
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

.map
  border-radius 0.2rem
  background $dark-lighter
  overflow hidden
  transition background 0.2s

.map
  &:focus-within
    // border: 1px solid $accent
    background darken($accent, 15%)

span 
  color $white

input
  background $dark-light
  color $white
  &:focus 
    outline none

</style>
