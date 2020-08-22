<template>
    <button :class="$style['editorButton']" @click="$emit('click')" > {{ title }} </button>
</template>

<script>
  export default {
    props: ['title']
  }
</script>


<style module lang="less">
  .editorButton{
    border-radius: 4px;
    border: 1px solid rgba(0,0,10,0.5);
    color: white;
    background-color: rgba(67,73,87, 0.9);
    outline: none;
  }
  .editorButton:hover{
    cursor: pointer;
    background-color: rgb(78,85,102);
  }
  .editorButton:active{
    background-color: rgba(67,73,87, 0.9);
  }
</style>
