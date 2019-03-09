<template>
  <div id="app" class="h-full h-screen">
    <div class="container-grid h-full">
      <textarea v-model="srcText" id="area-src" class="textarea h-full"></textarea>
      <textarea id="area-tgt" class="textarea h-full" disabled></textarea>
      <div class="mapping-container">
        <char-mapping v-for="(c, i) in mapping" :key="i" :label="c"></char-mapping>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import CharMapping from "./components/CharMapping.vue";

export default {
  name: "app",
  components: {
    CharMapping
  },
  data() {
    return {
      srcText: "",
      mapping: new Set()
    };
  },
  watch: {
    srcText(str) {
      this.mapping = new Set(str.split(""));
      console.log(this.mapping.size);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "./styles/_variables.styl"
#app 
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align: center
  background $dark
  color $white
  caret-color $green

  *:focus 
    outline-color $accent
    

textarea
  background $dark-lighter
  color $white
  resize none

.container-grid 
  display grid
  grid-template-columns 1fr 1fr
  column-gap 5px
  min-height 30rem

.mapping-container
  display grid
  grid-template-columns 1fr 1fr 1fr
  grid-auto-rows minmax(min-content, max-content)

  @media (min-width 768px)
    grid-template-columns 1fr 1fr 1fr 1fr 1fr

  @media (min-width 1200px)
    grid-template-columns 1fr 1fr 1fr 1fr 1fr 1fr 1fr

</style>
