import Vue from 'vue'
import Router from 'vue-router'
import Login from "../pages/login/Login";
import Index from "../pages/index/index";
import User from "../pages/user/User";
import Area from "../pages/area/Area";
import Menu from "../pages/menu/Menu";
import Juese from "../pages/juese/Juese";
import Public from "../pages/public/public";
import People from "../pages/people/People";
import Dictionaries from "../pages/dictionaries/Dictionaries";
import Collect from "../pages/collect/Collect";
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name : 'login',
      component: Login
    },
    {
      path: '/index',
      name : 'index',
      component: Index,
      children:[
        {
          path: '/index/user',
          name : 'user',
          component: User,
        },
        {
          path: '/index/area',
          name : 'area',
          component: Area,
        },
        {
          path: '/index/menu',
          name : 'menu',
          component: Menu,
        },
        {
          path: '/index/juese',
          name : 'juese',
          component: Juese,
        },
        {
          path: '/index/people',
          name : 'people',
          component: People,
        },
        {
          path: '/index/public',
          name : 'public',
          component: Public,
        },
        {
          path: '/index/people',
          name : 'people',
          component: People,
        },
        {
          path: '/index/dictionaries',
          name : 'dictionaries',
          component: Dictionaries,
        },
        {
          path: '/index/collect',
          name : 'collect',
          component: Collect,
        },
      ]
    }
  ]
})
