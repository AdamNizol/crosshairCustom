<template>
  <div :class="$style['editor-select']">
    <p>{{label}}:</p>
    <select :value="value" ref="optionSelector" @input="updateInput">
      <option v-for="(option, optionInd) in optionsList">{{option}}</option>
    </select>
  </div>
</template>

<script>
  export default {
    props: ['label','options','value'],
    methods: {

    },
    data() {
      return {
        optionsList: this.options
      }
    },
    methods: {
      updateInput(){
        this.$emit('input', this.$refs.optionSelector.value)
      }
    }
  }
</script>


<style module lang="less">
  .editor-select{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    >select{
      margin: 0 3.5em 0 0;
      width: 150px;
      height: 1.7em;
      color: white;
      background-color: rgba(255,255,255,0.1);
      border: 2px solid rgba(255,255,255,0.1);
      >option{
        background-color: rgba(5,10,15,0.9);
      }
    }
    >p {
      margin: 3px 3px 3px 0px;
      user-select: none;
    }
  }

</style>
