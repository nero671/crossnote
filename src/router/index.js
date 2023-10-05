import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Uimini from 'uimini/dist/css/uimini.css'

import Library from '@/components/Task'
import Home from '@/components/Home'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'

Vue.use(Router)
Vue.use(Uimini)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter (to, from, next) {
      store.getters.checkUser ? next() : next('/login')
    }
  },
  {
    path: '/library',
    name: 'library',
    component: Library,
    beforeEnter (to, from, next) {
      store.getters.checkUser ? next() : next('/login')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  }
  ]
})
