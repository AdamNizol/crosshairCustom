<template>
  <div id="app">
    <app-scene></app-scene>
    <app-title></app-title>
    <app-crosshairEditor></app-crosshairEditor>
    <app-crosshair :data="[{gap: 3.5, rotation: 0},{gap: 3.5, rotation: 90},{gap: 3.5, rotation: 180},{gap: 3.5, rotation: -90}]"> </app-crosshair>
    <!--<app-crosshairGarry> </app-crosshairGarry> -->
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
