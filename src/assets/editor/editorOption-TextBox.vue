<template>
  <div :class="$style['editor-textBox']">
    <p>{{label}}:</p>
    <!--<input type="color" :value="value" ref="colorPicker" @input="updateInput"></input>-->
    <input :class="$style['layerTextBox']" @input="updateInput" v-model="textValue" ref="textBox"></input>
  </div>
</template>

<script>
  export default {
    props: ['label','defaultVal'],
    methods: {

    },
    data() {
      return {
        textValue: this.defaultVal
      }
    },
    methods: {
      updateInput(){
        this.$emit('input', this.$refs.textBox.value)
      }
    }
  }
</script>


<style module lang="less">
  .editor-textBox{
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    >input{
      padding: 0;
      box-sizing: border-box;
      margin: 0 3.5em 0 0;
      width: 150px;
      height: 1.7em;
      color: white;
      background-color: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.1);
    }
    >p {
      margin: 3px 3px 3px 0px;
      user-select: none;
    }
  }
</style>
