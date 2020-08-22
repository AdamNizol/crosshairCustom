<template>

    <div v-if="layerData.type == 'radial'" ref="CHlayer" :class="''+$style['radialLayer']+' '+$style['chLayer']" :style="radialStyle"  :width="layerData.width" :height="layerData.height"> </div>
    <div v-else-if="layerData.type == 'independant'" ref="CHlayer" :class="''+$style['independantLayer']+' '+$style['chLayer']" :style="independantStyle"></div>

</template>

<script>
  export default {
    props: ['data'],
    data() {
      let dat = {...this.data};
      let layerDat;
      if(dat.type == "radial"){
        layerDat = dat.radial;
      }else if(dat.type == "independant"){
        layerDat = dat.independant;
      }
      layerDat.type = dat.type
      layerDat.hidden = dat.hidden

      return {
        layerData: layerDat,
        fired: false
      }
    },

    methods: {
      fire(index){
        if(!this.fired){
          //this.fired = true;
          let a = document.getElementsByClassName(this.$style['chLayer'])[index];
          //console.log(this.layerData);
          //this.layerData.gap = 30;
          //let a = $("#title");

          if(this.layerData.type == 'radial'){
            let gap = -1*(a.offsetHeight/2)-this.layerData.gap
            let rotation = this.layerData.rotation;

            let original = {
              rotateZ: rotation+'deg',
              translateY: gap+'px'
            };
            let final= {
              rotateZ: rotation+'deg',
              translateY: gap-this.layerData.animation.gap+'px'
            };


            let moveOut = {};
            let moveBack = {};

            if(this.layerData.animation.gap != 0 || this.layerData.animation.rotation != 0){
              moveOut.rotateZ= final.rotateZ
              moveBack.rotateZ= [original.rotateZ,final.rotateZ];

              moveOut.translateY= final.translateY
              moveBack.translateY= [original.translateY,final.translateY];
            }
            if(Object.getOwnPropertyNames(moveOut).length != 0){

              Velocity(a,"stop")
              Velocity(a,moveOut, {duration: this.layerData.animation.animateOut, ease: 'easeout' } );
              Velocity(a,moveBack, {duration: this.layerData.animation.animateReturn, ease: 'easeout' } );
            }

          }else if(this.layerData.type == 'independant'){
            let original = {
              opacity: '1',
              scale: 1
            };
            let final= {
              opacity: '0.3',
              scale: this.layerData.animation.scale
            };

            let moveOut = {};
            let moveBack = {};

            if(this.layerData.animation.scale != 1){
              if(this.layerData.animation.scaleType == "Enlarge"){
                moveOut.scale= final.scale;
                moveBack.scale= [original.scale,final.scale];
              }else if(this.layerData.animation.scaleType == "Resize"){
                moveOut.width = this.layerData.animation.scale*this.layerData.width
                moveBack.width = [this.layerData.width, this.layerData.animation.scale*this.layerData.width]
                moveOut.height = this.layerData.animation.scale*this.layerData.height
                moveBack.height = [this.layerData.height, this.layerData.animation.scale*this.layerData.height]
              }
            }



            if(Object.getOwnPropertyNames(moveOut).length != 0){
              Velocity(a,"stop")
              Velocity(a,moveOut, {duration: 80, ease: 'easeout' } );
              Velocity(a,moveBack, {duration: 150, ease: 'easeout' } );
            }
          }
          //console.log(a)
          //console.log("pew pew");
        }else{
          console.log("already firing. please wait")
        }



      }
    },

    computed: {
      radialStyle: function(){
        return "transform: "+ this.rotation+" "+this.translation+"; "+this.width+";"+this.height+";"+this.borderRadius+";"+this.opacity+";"+this.fill+";"+this.hidden+";"+this.border+";"
      },
      independantStyle: function(){
        return "overflow: hidden;"+this.width+"; "+this.height+";"+this.borderRadius+";"+this.fill+";"+this.hidden+";"+this.opacity+";"+this.border+";"
      },
      imgUrl: function(){
        return "background-image: url("+this.layerData.imgUrl+")"
      },
      border: function(){
        let result = "";
        if(this.layerData.borderType == "None"){
          result += "border: none"
        }else if(this.layerData.borderType == "Solid"){
          result += "border: "+this.layerData.borderWidth+"px solid "+ this.layerData.borderColor
        }else if(this.layerData.borderType == "Only Border"){
          result += "border: "+this.layerData.borderWidth+"px solid "+ this.layerData.borderColor+"; background-image: none; background-Color: rgba(0,0,0,0)"
        }
        if(this.layerData.borderBoxSizing == "Outer Border"){
          result += ";box-sizing: content-box";
        }else if(this.layerData.borderBoxSizing == "Inner Border"){
          result += ";box-sizing: border-box";
        }
        return result
      },
      fill: function(){
        let fill;
        if(this.layerData.fillType == "Color"){
          fill = this.color;
        }else if(this.layerData.fillType == "Image"){
          fill = "background-color:rgba(0,0,0,0);"+this.imgUrl+";background-size: 100% 100%";
        }
        return fill
      },
      rotation: function () {
        return ("rotateZ("+this.layerData.rotation+"deg)")
      },
      translation: function() {
        return ("translateY(calc(-50% - "+this.layerData.gap+"px))")
      },
      width: function() {
        return ("width: "+this.layerData.width+"px")
      },
      height: function() {
        return ("height: "+this.layerData.height+"px")
      },
      borderRadius: function(){
        return "border-radius: "+this.layerData.borderRadius+"px"
      },
      color: function(){
        return "background-color: "+this.layerData.color
      },
      opacity: function(){
        return "opacity: "+this.layerData.opacity/100
      },
      hidden: function(){
        if(this.layerData.hidden){
          return "display: none"
        }else{
          return ""
        }

      }
    },
    mounted() {
      if(this.layerData.type == "radial"){ //needed due to retateZ and translateY both using the transform CSS property
        let a =this.$refs.CHlayer;
        let gap = -1*(a.offsetHeight/2)-this.layerData.gap;
        Velocity(a,{rotateZ: this.layerData.rotation+'deg',translateY: gap+'px'}, 0);
      }

    }
  }
</script>


<style module lang="less">
  .radialLayer{
    position: absolute;

    background-color: white;
  }
  .independantLayer{
    position: absolute;
    >img{
      border: none;
      margin: 0;
      padding:0;
      position: absolute;
      left:0;
      top:0;
    }
  }
</style>
