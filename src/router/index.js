import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Authentication from '@/views/Authentication.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: "main",
      isPrivate: true,
    }
  },
  {
    path: '/login',
    name: 'Authentication',
    component: Authentication,
    meta: {
      layout: "login",
      isPrivate: false,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isPrivate)) {
    if (localStorage.getItem('authenticated')) {
      next();
      return
    }
    next({ name: "Authentication" });
  } else {
    next();
  }

  if (to.matched.some((record) => record.name === 'Authentication')) {
    if (localStorage.getItem('authenticated')) {
      next({ name: "Home" });
    }
  } else {
    next();
  }
});

export default router
