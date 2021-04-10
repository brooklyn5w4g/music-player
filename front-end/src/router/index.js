import Vue from 'vue'
import VueRouter from 'vue-router'
import Albums from '../views/Albums.vue'
import Songs from '../views/Songs.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/album',
    name: 'songs',
    component: Songs
  },
  {
    path: '/',
    name: 'albums',
    component: Albums
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
