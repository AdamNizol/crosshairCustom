<template>
    <div :class="$style['crosshair']">
      <template v-for="(layer, layerInd) in crosshairLayers.slice().reverse()" >
        <crosshair-layer :data="layer" :ref="'csLayer'+layerInd">  </crosshair-layer>
      </template>
    </div>
</template>

<script>
  import CrosshairLayer from './crosshair/crosshairLayer.vue'

  export default {
    components: {
      'crosshair-layer': CrosshairLayer
    },
    props: ['data'],
    data() {
      return {
        crosshairLayers: this.data
      }
    },
    methods: {
      fire(){
        //console.log("Pew Pew")
        for(let i=0; i<this.crosshairLayers.length ; i++){
          this.$refs[('csLayer'+i)][0].fire(i);
          //console.log(this.$refs[('csLayer'+i)])
        }
      }
    }
  }
</script>


<style module lang="less">
  .crosshair{
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
</style>
