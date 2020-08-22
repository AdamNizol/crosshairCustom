<template>
  <div :class="$style['layerContainer']">
    <!-- Layer Title section -->
    <div :class="$style['layerEntry']">
      <img src="https://i.imgur.com/Qs4hMcG.png" @click="deleteLayer">
      <input :class="$style['layerTitle']" @change="validateTitle" @input="limitTitleLength" v-model="mainData.title"></input>
      <div :class="$style['layerEntryRight']">
        <div :class="$style['reorderLayerButtons']">
          <img src="https://i.imgur.com/Fyab6RX.png" @click="reOrderLayer('up')">
          <img src="https://i.imgur.com/Gvn7XNj.png" @click="reOrderLayer('down')">
        </div>
        <img src="https://i.imgur.com/11SLfuB.png" @click="duplicateLayer">
        <img src="https://i.imgur.com/YV6VX4S.png" @click="hideLayer" :style="iconHiddenOpacity">
        <p v-if="mainData.open" @click="$refs.twirlCheck.click()" ><i :class="$style['down']"></i></p>
        <p v-else><i :class="$style['right']" @click="$refs.twirlCheck.click()"></i></p>
        <input :class="$style['twirlDownCheckBox']" ref="twirlCheck" type="checkbox" v-model="mainData.open"></input>
      </div>
    </div>

    <!-- options section -->
    <div :class="$style['layerOptions']" v-show="mainData.open">
      <editor-select label="Type" :options="typeOptions" v-model="mainData.type" @input="changed"></editor-select>

      <!-- Line/radial -->
      <div v-show="mainData.type == 'radial'">
        <!--<editor-select label="Preset" :options="presetOptions.radial" v-model="mainData.radial.preset" @input="changed" ></editor-select>-->
        <div v-show="mainData.radial.preset == 'Custom'">
          <editor-select label="Fill" :options="fillOptions.radial" v-model="mainData.radial.fillType" @input="changed" ></editor-select>
          <editor-colorPicker label="Color" v-show="mainData.radial.fillType == 'Color'" v-model="mainData.radial.color" @input="changed"></editor-colorPicker>
          <editor-textBox label="img URL" v-show="mainData.radial.fillType == 'Image'" :defaultVal="mainData.radial.imgUrl" v-model="mainData.radial.imgUrl"></editor-textBox>
          <editor-range label="Rotation" maxVal="180" minVal="-180" :defaultVal="mainData.radial.rotation" v-model="mainData.radial.rotation" step="1" @input="changed" ></editor-range>
          <editor-range label="Gap" maxVal="50" minVal="0" :defaultVal="mainData.radial.gap" v-model="mainData.radial.gap" step="0.5" @input="changed" ></editor-range>
          <editor-range label="Width" maxVal="100" minVal="1" defaultVal="30" step="1" :defaultVal="mainData.radial.width" v-model="mainData.radial.width" @input="changed" ></editor-range>
          <editor-range label="Length" maxVal="100" minVal="1" defaultVal="30" step="1" :defaultVal="mainData.radial.height" v-model="mainData.radial.height" @input="changed" ></editor-range>
          <editor-range label="Rounding" maxVal="50" minVal="0" :defaultVal="mainData.radial.borderRadius" step="1" @input="changed" v-model="mainData.radial.borderRadius" ></editor-range>
          <editor-range label="Opacity" maxVal="100" minVal="0" defaultVal="100" step="1" :defaultVal="mainData.radial.opacity" v-model="mainData.radial.opacity" @input="changed" ></editor-range>
          <editor-select label="Border" :options="borderOptions.radial" v-model="mainData.radial.borderType" @input="changed"></editor-select>
          <editor-colorPicker label="Border Color" v-show="mainData.radial.borderType != 'None'" v-model="mainData.radial.borderColor" @input="changed"></editor-colorPicker>
          <editor-select label="Border Style" v-show="mainData.radial.borderType != 'None'" :options="borderBoxSizing.radial" v-model="mainData.radial.borderBoxSizing" @input="changed"></editor-select>
          <editor-range label="Border Width" v-show="mainData.radial.borderType != 'None'" maxVal="15" minVal="0" :defaultVal="mainData.radial.borderWidth" step="0.25" @input="changed" v-model="mainData.radial.borderWidth" ></editor-range>
          <editor-range label="Animate Gap" maxVal="100" minVal="0" step="1" :defaultVal="mainData.radial.animation.gap" v-model="mainData.radial.animation.gap" @input="changed" ></editor-range>
          <editor-range label="Animate Out (ms)" maxVal="300" minVal="0" step="1" :defaultVal="mainData.radial.animation.animateOut" v-model="mainData.radial.animation.animateOut" @input="changed" ></editor-range>
          <editor-range label="Animate Return (ms)" maxVal="300" minVal="0" step="1" :defaultVal="mainData.radial.animation.animateReturn" v-model="mainData.radial.animation.animateReturn" @input="changed" ></editor-range>
        </div>
      </div>

      <!-- independant -->
      <div v-show="mainData.type == 'independant'">
        <!--<editor-select label="Presets" :options="presetOptions.independant" v-model="mainData.independant.preset" @input="changed"></editor-select>-->
        <div v-show="mainData.independant.preset == 'Custom'">
          <editor-select label="Fill" :options="fillOptions.independant" v-model="mainData.independant.fillType" @input="changed"></editor-select><!---->
          <editor-colorPicker label="Color" v-show="mainData.independant.fillType == 'Color'" v-model="mainData.independant.color" @input="changed"></editor-colorPicker>
          <editor-textBox label="img URL" v-show="mainData.independant.fillType == 'Image'" :defaultVal="mainData.independant.imgUrl" v-model="mainData.independant.imgUrl"></editor-textBox>
          <editor-select label="Border" :options="borderOptions.independant" v-model="mainData.independant.borderType" @input="changed"></editor-select>
          <editor-colorPicker label="Border Color" v-show="mainData.independant.borderType != 'None'" v-model="mainData.independant.borderColor" @input="changed"></editor-colorPicker>
          <editor-select label="Border Style" v-show="mainData.independant.borderType != 'None'" :options="borderBoxSizing.independant" v-model="mainData.independant.borderBoxSizing" @input="changed"></editor-select>
          <editor-range label="Border Width" v-show="mainData.independant.borderType != 'None'" maxVal="15" minVal="0" :defaultVal="mainData.independant.borderWidth" step="0.25" @input="changed" v-model="mainData.independant.borderWidth" ></editor-range>
          <editor-range label="Width" maxVal="100" minVal="1" :defaultVal="mainData.independant.width" step="1" @input="changed" v-model="mainData.independant.width" ></editor-range>
          <editor-range label="Height" maxVal="100" minVal="1" :defaultVal="mainData.independant.height" step="1" @input="changed" v-model="mainData.independant.height" ></editor-range>
          <editor-range label="Rounding" maxVal="50" minVal="0" :defaultVal="mainData.independant.borderRadius" step="1" @input="changed" v-model="mainData.independant.borderRadius" ></editor-range>
          <editor-range label="Opacity" maxVal="100" minVal="0" defaultVal="100" step="1" :defaultVal="mainData.independant.opacity" v-model="mainData.independant.opacity" @input="changed" ></editor-range>
          <editor-select label="Animate Scale" :options="scaleOptions.independant" v-model="mainData.independant.animation.scaleType" @input="changed"></editor-select>
          <editor-range label="⤷ Scale" v-show="mainData.independant.animation.scaleType != 'None'" maxVal="5" minVal="0" step="0.01" :defaultVal="mainData.independant.animation.scale" v-model="mainData.independant.animation.scale" @input="changed" ></editor-range>
          <editor-range label="Animate Out (ms)" maxVal="300" minVal="0" step="1" :defaultVal="mainData.independant.animation.animateOut" v-model="mainData.independant.animation.animateOut" @input="changed" ></editor-range>
          <editor-range label="Animate Return (ms)" maxVal="300" minVal="0" step="1" :defaultVal="mainData.independant.animation.animateReturn" v-model="mainData.independant.animation.animateReturn" @input="changed" ></editor-range>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import EditorRange from './editorOption-Range.vue'
  import EditorSelect from './editorOption-DropDown.vue'
  import EditorColorPicker from './editorOption-ColorPicker.vue'
  import EditorTextBox from './editorOption-TextBox.vue'

  export default {
    components: {
      'editor-range': EditorRange,
      'editor-select': EditorSelect,
      'editor-colorPicker': EditorColorPicker,
      'editor-textBox': EditorTextBox
    },
    props: ['layerData', 'layerIndex'],
    data() {
      let dat = { ...this.layerData };
      return {
        presetOptions: {
          radial: ["Custom","Black Line (Top)","Black Line (Bottom)","Black Line (Left)","Black Line (Right)"],
          independant: ["Custom", "foo", "bar"]
        },
        fillOptions: {
          radial: ["Color","Image"],
          independant: ["Color", "Image"]
        },
        borderOptions:{
          radial: ["None","Solid", "Only Border"],
          independant: ["None", "Solid", "Only Border"]
        },
        borderBoxSizing:{
          radial: ["Outer Border","Inner Border"],
          independant: ["Outer Border","Inner Border"]
        },
        scaleOptions:{
          radial: ["None","Resize","Enlarge"],
          independant: ["None","Resize","Enlarge"]
        },
        typeOptions: ["radial","independant"],
        mainData: dat,
        iconHiddenOpacity: "opacity: 1;"
      }
    },
    methods: {
      limitTitleLength(){
        let maxLength = 25;
        if(this.mainData.title.length > maxLength){
          this.mainData.title = this.mainData.title.substring(0,maxLength);
        }
        this.changed();
      },

      validateTitle(){
        if(this.mainData.title.length == 0){
          this.mainData.title = "Unnamed Layer";
        }
      },

      deleteLayer(){
        this.$emit('deleteLayer',this.layerIndex);
      },

      duplicateLayer(){
        this.$emit('duplicateLayer',this.layerIndex);
      },

      reOrderLayer(direction){
        if(direction == 'up'){
          this.$emit('reOrderLayerUp',this.layerIndex);
        }else{
          this.$emit('reOrderLayerDown',this.layerIndex);
        }

      },

      hideLayer(){
        if(this.mainData.hidden){
          this.mainData.hidden = false;
          this.iconHiddenOpacity = "opacity: 1;"
        }else{
          this.mainData.hidden = true;
          this.iconHiddenOpacity = "opacity: 0.4;"
        }
        this.changed();
      },

      changed(h){
        this.$emit('input',this.mainData)
      }
    }
  }
</script>


<style module lang="less">
  .twirlDownCheckBox{ display: none; }
  .reorderLayerButtons{
    display: flex;
    flex-direction: column;
    height: 1.5em;
    margin-right: 6px;
    >img {
      flex-grow: 1;
      flex-shrink: 1;
      height: 50%;
      margin: 0;
    }
    >img:hover{
      cursor: pointer;
    }
  }
  .layerEntryRight{
    display: flex;
    flex-direction: row;
    align-items: center;
    >img {
      height: 1em;
      margin: 0 1px 0 2px;
    }
    >img:hover{
      cursor: pointer;
    }
  }
  .layerContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    :focus {
      outline: none;
    }
    >.layerEntry{
      display: flex;
      flex-direction: row;
      >img{
        height: 1em;
        margin: auto;
        padding: 5px;
      }
      >img:hover{
        cursor: pointer;
      }
      >.layerTitle{
        flex-grow: 1;
        background: transparent;
        border: 0 !important;
        font-weight: 200;
        color: white;
        padding: 2px;
        text-align: center;
        margin: 5px;
      }
      >div>p{
        margin: 5px;
      }
    }
    background-color: rgba(0,0,0,0.15);
    border-bottom: 1px solid rgba(0,0,0,0.4);
    border-top: 1px solid rgba(0,0,0,0.4);
  }
  .layerEntry {
    background-color: rgba(0,0,0,0.3);
  }

  .layerContainer i {
    border: solid rgba(255,255,255,0.8);
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
  }
  .down {
    transform: rotate(45deg);
  }
  .right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  .right, .down{
    cursor: pointer;
  }


</style>
