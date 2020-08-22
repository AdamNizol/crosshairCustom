<template>
    <div id="crosshairEditor">
        <editor-optionBar @newLayerBtnClicked="createNewLayer"></editor-optionBar>
        <div class="cScroll">
          <div v-for="(layer, layerInd) in layers" :key="layers[layerInd].uKey">
            <editor-layer @reOrderLayerUp="reOrderLayerUp" @reOrderLayerDown="reOrderLayerDown" @deleteLayer="deleteLayer" @duplicateLayer="duplicateLayer" :layerData="layers[layerInd]" :layerIndex="layerInd" @input="updateLayer(layerInd,$event)"></editor-layer>
          </div>
        </div>
    </div>
</template>

<script>
  import _ from 'lodash'
  import OptionBar from './editor/editorOptionBar.vue'
  import EditorLayer from './editor/editorLayer.vue'

  export default {
    components: {
      'editor-optionBar': OptionBar,
      'editor-layer': EditorLayer
    },

    data() {
      return {
        layers: [],
        keyInc: 0
      }
    },

    methods: {
      updateLayer(index,e){
        this.layers[index] = e;
        this.updateCH();
      },
      updateCH(){
        this.$emit('input',this.layers)
      },
      saveCH(){
        let saveData = JSON.parse(JSON.stringify(this.layers)); //shallow copy
        for(let i=0; i< saveData.length; i++){
          if(saveData[i].type == "radial"){
            saveData[i].independant = {};
          }else if(saveData[i].type == "independant"){
            saveData[i].radial = {};
          }else{
            console.log("error")
          }
        }

        let jsonSave = JSON.stringify(saveData)
        console.log("("+jsonSave.length+") was saved as:")
        console.log(jsonSave)
      },
      generateDefaultLayer(name){
        let defaultTitleNumber = 1;
        let layerName;
        if(!name){
          let layerTitles = this.layers.map((lay)=>{return lay.title})
          while(layerTitles.includes("Layer 0"+defaultTitleNumber)){
            defaultTitleNumber++;
          }
          layerName = ("Layer 0"+(defaultTitleNumber))
        }else{
          layerName = name;
        }
        return ({
          title: layerName,
          type: "radial",
          hidden: false,
          radial: {
            preset: "Custom",
            fillType: "Color",
            borderRadius: 10,
            rotation: 0,
            gap: 8,
            width: 3,
            height: 20,
            opacity: 100,
            color: "#ffffff",
            imgUrl: "https://i.imgur.com/XcH7YOc.png",
            borderType: "None",
            borderWidth: 2,
            borderBoxSizing: "Inner Border",
            borderColor: "#000000",
            animation: {
              gap: 20,
              rotation: 0,
              opacity: 1,
              scaleType: "None",
              animateOut: 80,
              animateReturn: 150
            }
          },
          independant: {
            preset: "Custom",
            fillType: "Color",
            borderRadius: 4,
            width: 3,
            height: 3,
            opacity: 100,
            color: "#ffffff",
            imgUrl: "https://i.imgur.com/1bQ3P5K.png",
            borderType: "None",
            borderWidth: 2,
            borderBoxSizing: "Inner Border",
            borderColor: "#000000",
            animation: {
              scale: 2,
              opacity: 1,
              scaleType: "Enlarge",
              animateOut: 80,
              animateReturn: 150
            }

          },
          uKey: this.keyInc++,
          open: true
        });
      },
      loadCrosshair(crosshairData){
        for(let i = 0; i < crosshairData.length; i++){
          let defaultLayer = this.generateDefaultLayer(crosshairData[i].title);
          crosshairData[i] = _.merge(defaultLayer, crosshairData[i],{uKey: defaultLayer.uKey})
        }
        this.layers = crosshairData;
        this.updateCH();
      },
      createNewLayer(){
        this.layers.unshift(this.generateDefaultLayer());
        this.updateCH();
      },
      deleteLayer(index){
        this.layers.splice(index,1);
        this.updateCH();
      },
      duplicateLayer(index){
        let base = { ...this.layers[index] }
        let output = this.packageData(base);
        output.uKey = this.keyInc++;
        this.layers.splice(index,0,output);
        this.updateCH();
      },
      reOrderLayerUp(index){
        if(index > 0){
          let base = { ...this.layers[index] }
          let output = this.packageData(base);
          this.layers.splice(index-1,0,output);
          this.layers.splice(index+1,1);
          this.updateCH();
        }
      },
      reOrderLayerDown(index){
        if(index < (this.layers.length-1) ){
          let base = { ...this.layers[index] }
          let output = this.packageData(base);
          this.layers.splice(index+2,0,output);
          this.layers.splice(index,1);
          this.updateCH();
        }
      },
      packageData(dataIn){ //returns shallow copy of dataIn. required to make sure sub-objects are also shallow copies
        let data = { ...dataIn }
        let result = {};
        result.hidden = data.hidden;
        result.title = data.title;
        result.type = data.type;
        result.independant = { ...data.independant };
        result.independant.animation = {...result.independant.animation};
        result.radial = { ...data.radial };
        result.radial.animation = {...result.radial.animation};
        result.open = data.open;
        result.uKey = data.uKey;
        return result
      }
    },
    mounted() {
      this.updateCH();
      window.foobar = this.saveCH;
    }

  }

</script>

<style>
  #crosshairEditor{
    position: absolute;
    right: 15px;
    top: 15px;
    border-radius: 7px 5px 5px 7px;
    border: 2px solid rgba(0,0,0,0.6);
    min-width: 325px;
    height: 450px;
    overflow-y: hidden;
    color: white;
    background-color: rgb(40,44,52);
    display: flex;
    flex-direction: column;
  }
  .cScroll{
    overflow-y: auto;
    flex-grow: 1;
  }
  .cScroll::-webkit-scrollbar {
    width: 10px;
  }

  .cScroll::-webkit-scrollbar-track {
    background: #999;
    border-radius: 0px 0px 5px 0px;
  }

  .cScroll::-webkit-scrollbar-track:hover {
    background: #888;
  }

  .cScroll::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 1px 1px 4px 1px;
    box-sizing: border-box;
  }

  .cScroll::-webkit-scrollbar-thumb:hover {
    background: #333;
  }
</style>
