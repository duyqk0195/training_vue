import { Router } from "vue-router";
import { authStore } from "../stores/authStore";

const checkAuth = (router: Router) => {
  router.beforeEach((to, from, next) => {
    let isAuthenticated = authStore().isAuthenticated();
    console.log(isAuthenticated);
    if (to.name === "loginView") {
      if (isAuthenticated) {
        next({ name: "home" });
        return;
      }
      next();
    } else if (isAuthenticated) {
      next();
    } else next({ name: "loginView" });
  });
};

export default checkAuth;
