<template>
  <div>
    <app-scene @click="fire"></app-scene>
    <app-title></app-title>
    <app-crosshairEditor @input="updateCrosshair" ref="chEditor"></app-crosshairEditor>
    <app-crosshair ref="crosshairComp" :data="crosshair" :key="crosshairKey"> </app-crosshair>
    <app-crosshairGallery @updateCrosshair="importCrosshair"></app-crosshairGallery> <!-- for some reason having this above the crosshair messes with the fire command despite fire() being called from the ref -->
    <!--<app-crosshairGarry> </app-crosshairGarry> -->
  </div>
</template>

<script>
  import CrosshairGarry from "./CrosshairGarry.vue";
  import Crosshair from "./Crosshair.vue";
  import CrosshairEditor from "./CrosshairEditor.vue";
  import CrosshairGallery from './CrosshairGallery.vue';
  import TitleApp from "./Title.vue";
  import Scene from './scene.vue';

  export default {
    components: {
      'app-scene': Scene,
      'app-title': TitleApp,
      'app-crosshairEditor': CrosshairEditor,
      'app-crosshair': Crosshair,
      'app-crosshairGarry': CrosshairGarry,
      'app-crosshairGallery': CrosshairGallery
    },
    data() {
      return {
        crosshair: [

        ],
        crosshairKey: 0
      }
    },
    methods: {
      updateCrosshair(crosshairData){
        this.crosshair = crosshairData;
        this.crosshairKey ++;
      },
      importCrosshair(crosshairData){
        this.$refs.chEditor.loadCrosshair(crosshairData)
      },
      fire(){
        this.$refs.crosshairComp.fire()
        //console.log(JSON.stringify(this.crosshair))
      }
    },
    mounted(){
      let res = [{"title":"Center","type":"independant","hidden":false,"radial":{},"independant":{"preset":"Custom","fillType":"Color","borderRadius":4,"width":3,"height":3,"opacity":100,"color":"#ffffff","imgUrl":"https://i.imgur.com/1bQ3P5K.png","borderType":"None","borderWidth":2,"borderBoxSizing":"Inner Border","borderColor":"#000000","animation":{"scale":2,"opacity":1,"scaleType":"Enlarge","animateOut":80,"animateReturn":150},"type":"independant","hidden":false},"uKey":0,"open":false},{"title":"Top","type":"radial","hidden":false,"radial":{"preset":"Custom","fillType":"Color","borderRadius":"0","rotation":0,"gap":8,"width":3,"height":20,"opacity":100,"color":"#ffffff","imgUrl":"https://i.imgur.com/XcH7YOc.png","borderType":"None","borderWidth":2,"borderBoxSizing":"Inner Border","borderColor":"#000000","animation":{"gap":20,"rotation":0,"opacity":1,"scaleType":"None","animateOut":80,"animateReturn":150},"type":"radial","hidden":false},"independant":{},"uKey":1,"open":false},{"title":"Bottom","type":"radial","hidden":false,"radial":{"preset":"Custom","fillType":"Color","borderRadius":"0","rotation":180,"gap":8,"width":3,"height":20,"opacity":100,"color":"#ffffff","imgUrl":"https://i.imgur.com/XcH7YOc.png","borderType":"None","borderWidth":2,"borderBoxSizing":"Inner Border","borderColor":"#000000","animation":{"gap":20,"rotation":0,"opacity":1,"scaleType":"None","animateOut":80,"animateReturn":150},"type":"radial","hidden":false},"independant":{},"uKey":2,"open":false},{"title":"Left","type":"radial","hidden":false,"radial":{"preset":"Custom","fillType":"Color","borderRadius":"0","rotation":-90,"gap":8,"width":3,"height":20,"opacity":100,"color":"#ffffff","imgUrl":"https://i.imgur.com/XcH7YOc.png","borderType":"None","borderWidth":2,"borderBoxSizing":"Inner Border","borderColor":"#000000","animation":{"gap":20,"rotation":0,"opacity":1,"scaleType":"None","animateOut":80,"animateReturn":150},"type":"radial","hidden":false},"independant":{},"uKey":3,"open":false},{"title":"Right","type":"radial","hidden":false,"radial":{"preset":"Custom","fillType":"Color","borderRadius":"0","rotation":90,"gap":8,"width":3,"height":20,"opacity":100,"color":"#ffffff","imgUrl":"https://i.imgur.com/XcH7YOc.png","borderType":"None","borderWidth":2,"borderBoxSizing":"Inner Border","borderColor":"#000000","animation":{"gap":20,"rotation":0,"opacity":1,"scaleType":"None","animateOut":80,"animateReturn":150},"type":"radial","hidden":false},"independant":{},"uKey":4,"open":false}];
      this.importCrosshair(res)
    }
  }
</script>
