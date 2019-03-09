<template>
  <div id="app" class="h-full h-screen">
    <div class="container-grid h-full">
      <textarea
        v-model="srcText"
        id="area-src"
        class="textarea h-full p-4"
        placeholder="Type something..."
      ></textarea>
      <textarea
        v-model="tgtText"
        id="area-tgt"
        class="textarea h-full p-4"
        placeholder="This is where the output will appear"
        disabled
      ></textarea>
      <div class="mapping-container">
        <char-mapping v-for="(c, i) in chars" :key="i" :label="c" @mappingChange="mappingChange"></char-mapping>
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
      tgtText: "",
      chars: new Set(),
      mapping: {}
    };
  },
  methods: {
    mappingChange(key, val) {
      this.mapping[key] = val;
      this.updateOutput();
    },
    updateOutput() {
      let s = "";
      for (let c of this.srcText) {
        if (c in this.mapping) {
          s += this.mapping[c];
        } else {
          s += c;
        }
      }
      this.tgtText = s;
    }
  },
  watch: {
    srcText(str) {
      this.chars = new Set(str.split(""));
      this.updateOutput();
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
  &::placeholder
    color $placeholder

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
