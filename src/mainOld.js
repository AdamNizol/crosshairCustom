import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import CrosshairGarry from "./assets/CrosshairGarry.vue";
import Crosshair from "./assets/Crosshair.vue";
import CrosshairEditor from "./assets/CrosshairEditor.vue";
import TitleApp from "./assets/Title.vue";
import Scene from './assets/scene.vue';
import Velocity from 'velocity-animate';

Vue.config.productionTip = false;

Vue.component('app-scene',Scene);
Vue.component('app-title', TitleApp);
Vue.component('app-crosshairGarry', CrosshairGarry);
Vue.component('app-crosshairEditor', CrosshairEditor);
Vue.component('app-crosshair', Crosshair);



new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
