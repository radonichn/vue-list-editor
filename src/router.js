import Vue from "vue";
import VueRouter from "vue-router";
import Users from "./components/Users.vue";
import Courses from "./components/Courses.vue";
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Users
    },
    {
      path: "/courses",
      component: Courses
    }
  ],
  mode: "history"
});
export default router;
