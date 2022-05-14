import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMap,
  faWater,
  faMountain,
  faCloudSun,
  faCloud,
  faArrowDown,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faMap);
library.add(faWater);
library.add(faMountain);
library.add(faCloudSun);
library.add(faCloud);
library.add(faPlane);
const app = createApp(App);

app.use(store);
app.use(router);
app.component("font-awesome", FontAwesomeIcon);

app.mount("#app");
