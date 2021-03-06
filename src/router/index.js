import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home,
  },

  {
    path: '/about',
    name: 'about',
    component: About,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
