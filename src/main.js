import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import editorScene from "./assets/editorScene.vue";
import Velocity from 'velocity-animate';

Vue.config.productionTip = false;

Vue.component('app-editorScene', editorScene);



new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
