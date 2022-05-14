import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SeaView from "@/views/SeaView.vue";
import MountainView from "@/views/MountainView.vue";
import MapViewVue from "@/views/MapView.vue";
import WeatherViewVue from "@/views/WeatherView.vue";
import TravelViewVue from "@/views/TravelView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    meta: { transition: "fade", mode: "out-in" },
    component: HomeView,
  },

  {
    path: "/sea",
    name: "sea",
    meta: { transition: "fade", mode: "out-in" },
    component: SeaView,
  },
  {
    path: "/mountain",
    name: "mountain",
    meta: { transition: "fade", mode: "out-in" },
    component: MountainView,
  },
  {
    path: "/map",
    name: "map",
    meta: { transition: "fade", mode: "out-in" },
    component: MapViewVue,
  },
  {
    path: "/weather",
    name: "weather",
    meta: { transition: "fade", mode: "out-in" },
    component: WeatherViewVue,
  },
  {
    path: "/travel",
    name: "travel",
    meta: { transition: "fade", mode: "out-in" },
    component: TravelViewVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
