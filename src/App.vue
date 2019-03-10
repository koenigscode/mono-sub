<template>
  <div id="app" class="h-full h-screen max-h-screen">
    <div class="container-grid h-full">
      <textarea
        v-model="srcText"
        id="area-src"
        class="textarea h-full p-4"
        placeholder="Erwarte Eingabe.."
      ></textarea>
      <textarea
        v-model="tgtText"
        id="area-tgt"
        class="textarea h-full p-4"
        placeholder="Hier erscheint der Output.."
        disabled
      ></textarea>
      <div class="mapping-container">
        <char-mapping v-for="(c, i) in chars" :key="i" :label="c" @mappingChange="mappingChange"></char-mapping>
      </div>
      <div class="freq-container">
        <frequency-rate label="Buchstabenhäufigkeit im deutschen Alphabet" :chartData="gerFreq"></frequency-rate>
        <frequency-rate label="Buchstabenhäufigkeit im deutschen Alphabet" :chartData="gerFreq"></frequency-rate>
      </div>
    </div>
  </div>
</template>

<script>
import CharMapping from "./components/CharMapping.vue";
import FrequencyRate from "./components/FrequencyRate.vue";
import gerFreq from "./data/frequency-german.json";

export default {
  name: "app",
  components: {
    CharMapping,
    FrequencyRate
  },
  data() {
    return {
      srcText: "",
      tgtText: "",
      chars: new Set(),
      mapping: {},
      gerFreq
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
      this.$set(this.gerFreq, "test", 2);
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
  grid-template-rows 40% 60%
  grid-gap 1rem
  min-height 30rem
  padding 1rem

.mapping-container
  display grid
  grid-template-columns 1fr 1fr 1fr
  grid-auto-rows minmax(min-content, max-content)

  @media (min-width 768px)
    grid-template-columns 1fr 1fr 1fr 1fr 1fr

  @media (min-width 1200px)
    grid-template-columns 1fr 1fr 1fr 1fr 1fr 1fr 1fr

.freq-container
  display grid 
  grid-template-rows 50% 50%
  column-gap 1rem

</style>
