<template>
  <div id="app" class="h-full w-full">
    <div class="container-grid min-h-screen h-full">
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
        <char-mapping
          v-for="(c, i) in Array.from(chars).sort()"
          :key="i"
          :label="c"
          @mappingChange="mappingChange"
        ></char-mapping>
      </div>
      <frequency-rate
        title="Buchstabenhäufigkeit im deutschen Alphabet"
        :chartData="gerFreq"
        :maxTick="maxTick"
      ></frequency-rate>
      <frequency-rate
        title="Zeichenhäufigkeit im eingegebenen Text"
        :chartData="srcFreq"
        :maxTick="maxTick"
      ></frequency-rate>
    </div>
  </div>
</template>

<script>
import CharMapping from "./components/CharMapping.vue";
import FrequencyRate from "./components/FrequencyRate.vue";
import gerFreq from "./data/frequency-german.json";
import exampleText from "raw-loader!./data/esel.txt";

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
      mapping: {},
      gerFreq
    };
  },
  computed: {
    srcFreq() {
      let freq = {};
      for (let c of this.chars) {
        let count = this.srcText.toUpperCase().split(c).length - 1;
        freq[c] = (count / this.srcText.length) * 100;
      }
      const ordered = {};
      Object.values(freq)
        .sort()
        .forEach(function(key) {
          ordered[key] = freq[key];
        });
      return freq;
    },
    chars() {
      if (this.srcText.trim().length == 0) return [];
      let s = new Set();
      for (let c of this.srcText.split("")) {
        if (c.match(/^[0-9a-zA-Z]+$/))
          s.add(
            c in this.mapping ? this.mapping[c.toUpperCase()] : c.toUpperCase()
          );
      }
      return s;
    },
    maxTick() {
      if (this.srcFreq != undefined) {
        let maxVal = Math.max(
          ...Object.values(this.srcFreq),
          ...Object.values(gerFreq)
        );
        return 2 * Math.round(Math.ceil(maxVal) / 2);
      }
    }
  },
  methods: {
    mappingChange(key, val) {
      this.mapping[key] = val;
      this.updateOutput();
    },
    updateOutput() {
      let s = "";
      for (let c of this.srcText) {
        if (c.toUpperCase() in this.mapping) {
          s += this.mapping[c.toUpperCase()];
        } else {
          s += c;
        }
      }
      this.tgtText = s;
    },
    loadExample() {
      this.srcText = exampleText;
    }
  },
  watch: {
    srcText(str) {
      this.updateOutput();
    }
  },
  mounted() {
    this.loadExample();
  }
};
</script>

<style lang="stylus" scoped>
@import "./styles/_variables.styl"
#app 
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align: center
  background $dark
  color $white
  caret-color $green

textarea
  background $dark-lighter
  color $white
  resize none
  min-height: 30rem

  &::placeholder
    color $placeholder
  
  :focus 
    outline-color $accent

.container-grid 
  display grid
  // grid-template-rows 2fr 1fr 2fr
  grid-gap 1rem
  padding 1rem
  @media (min-width 900px)
    grid-template-columns 1fr 1fr

.mapping-container
  grid-column 1/-1
  display grid
  grid-auto-flow row
  grid-template-columns 1fr 1fr 1fr
  grid-auto-rows minmax(min-content, max-content)
  grid-template-columns repeat(auto-fit, 6rem)
  gap: 0.5rem

</style>
