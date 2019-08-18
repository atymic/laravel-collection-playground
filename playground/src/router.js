import Vue from 'vue';
import Router from 'vue-router';
import Playground from './components/Playground'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Playground,
    },
    {
      path: '/p/:playground',
      component: Playground,
    },
  ],
});
