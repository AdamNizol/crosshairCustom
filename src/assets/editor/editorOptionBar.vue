<template>
    <div :class="$style['editorOptionBar']" >
      <div></div>
      <h3>Settings</h3>
      <editor-button title="+" @click="newLayer"></editor-button>
    </div>
</template>


<script>
  import editorButton from './editorButton.vue'

  export default {
    components: {
      'editor-button': editorButton
    },

    props: ['newLayerBtnFunc'],

    methods: {
      newLayer(){
        this.$emit('newLayerBtnClicked')
      }
    }
  }

</script>


<style module lang="less">
  .editorOptionBar{
    width: 100%;
    display:flex;
    flex-direction: row;
    justify-content:space-between;
    padding: 5px;
    font-weight: bold;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0,0,10,0.3);
    > h3{
      margin: 0;
      text-align: center;
      user-select: none;
    }
  }
</style>
