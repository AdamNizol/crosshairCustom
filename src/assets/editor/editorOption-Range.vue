<template>
    <div :class="$style['editorRangeContainer']">
      <p>{{label}}:</p>
      <input type="range" v-model="rangeValue" :min="minVal" :max="maxVal" :step="step" @input="updateInput"></input>
      <input :class="$style['sliderLabel']" v-model="rangeValue" @input="updateInput"></input>
    </div>
</template>

<script>
  export default {
    props: ['label','minVal','maxVal','defaultVal', 'step'],
    methods: {

    },
    data() {
      return {
        rangeValue: this.defaultVal
      }
    },
    methods: {
      updateInput(){
        this.$emit('input',this.rangeValue)
      }
    }
  }
</script>


<style module lang="less">
  .editorRangeContainer{
    margin: 5px 0 5px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    >p{
      margin: 0;
      user-select: none;
    }

    .sliderLabel{
      background-color: rgba(0,0,0,0);
      border: none;
      color: white;
      margin: 0;
      width: 2.2em;
      text-align: right;
      margin-right: 0.3em;
    }

    input[type=range] {
      margin: 0 7px 0 7px;
      -webkit-appearance: none;
      width: 150px;
      margin-left: auto;
    }
    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 14px;
      cursor: pointer;
      box-shadow: 1px 1px 5px #000000, 0px 0px 1px #0d0d0d;
      background: #242a39;
      border-radius: 1.3px;
      border: 1px solid #010101;
    }
    input[type=range]::-webkit-slider-thumb {
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border: 1.5px solid #00000c;
      height: 14px;
      width: 26px;
      border-radius: 4px;
      background: #0d101b;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -1px;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
      background: #2e3649;
    }
    input[type=range]::-moz-range-track {
      width: 100%;
      height: 14px;
      cursor: pointer;
      box-shadow: 1px 1px 5px #000000, 0px 0px 1px #0d0d0d;
      background: #242a39;
      border-radius: 1.3px;
      border: 1px solid #010101;
    }
    input[type=range]::-moz-range-thumb {
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border: 1.5px solid #00000c;
      height: 14px;
      width: 26px;
      border-radius: 4px;
      background: #0d101b;
      cursor: pointer;
    }
    input[type=range]::-ms-track {
      width: 100%;
      height: 14px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }
    input[type=range]::-ms-fill-lower {
      background: #1a1e29;
      border: 1px solid #010101;
      border-radius: 2.6px;
      box-shadow: 1px 1px 5px #000000, 0px 0px 1px #0d0d0d;
    }
    input[type=range]::-ms-fill-upper {
      background: #242a39;
      border: 1px solid #010101;
      border-radius: 2.6px;
      box-shadow: 1px 1px 5px #000000, 0px 0px 1px #0d0d0d;
    }
    input[type=range]::-ms-thumb {
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border: 1.5px solid #00000c;
      width: 26px;
      border-radius: 4px;
      background: #0d101b;
      cursor: pointer;
      height: 16px;
    }
    input[type=range]:focus::-ms-fill-lower {
      background: #242a39;
    }
    input[type=range]:focus::-ms-fill-upper {
      background: #2e3649;
    }


  }
</style>
