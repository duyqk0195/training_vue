import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";
import LoginView from "../views/LoginView.vue";
import checkAuth from "./auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/weather/:state/:city",
    name: "cityView",
    component: CityView,
    meta: {
      title: "City Weather",
    },
  },
  {
    path: "/login",
    name: "loginView",
    component: LoginView,
    meta: {
      title: "Login",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Weather App`;
  console.log(to.name, from.name);

  next();
});

checkAuth(router);

export default router;
