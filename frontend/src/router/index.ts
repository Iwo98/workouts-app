import { getMe } from "@frontend/lib/api/endpoints/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/sign-in",
      name: "sign-in",
      meta: { guestOnly: true },
      component: () => import("@frontend/views/SignInView.vue"),
    },
    {
      path: "/log-in",
      name: "log-in",
      meta: { guestOnly: true },
      component: () => import("@frontend/views/LogInView.vue"),
    },

    {
      path: "/",
      component: () => import("@frontend/layouts/AuthenticatedLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("../views/DashboardView.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(async (to) => {
  const result = await getMe();

  if (to.meta.requiresAuth && result === "guest") {
    return {
      name: "log-in",
      query: { redirect: to.fullPath },
    };
  }

  if (to.meta.guestOnly && result === "authorized") {
    return { name: "dashboard" };
  }
});

export default router;
