import { createRouter, createWebHistory } from "vue-router";
import { estaAutenticado } from "../utils/utilsAuth";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/index.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/login/index.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: () => import("../views/usuarios/index.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: () => ({ name: "home" }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !estaAutenticado()) {
    next({ name: "login" });
  } else {
    next();
  }
});
export default router;
