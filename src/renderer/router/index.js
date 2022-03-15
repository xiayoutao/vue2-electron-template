import Vue from 'vue';
import VueRouter from 'vue-router';
import FrameLayout from '@/layout/frame-layout';
import { ipcRenderer } from 'electron';

const originalPush = VueRouter.prototype.push;

//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(error => error);
};

const importPage = file => () => import(`@/views${file}`);

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      name: 'index',
      path: '/',
      component: FrameLayout,
      redirect: '/home',
      children: [
        {
          name: 'home',
          path: '/home',
          meta: {
            title: '首页',
          },
          component: importPage('/home'),
        },
        {
          name: 'demo',
          path: '/demo',
          meta: {
            title: 'Demo',
          },
          component: importPage('/demo'),
        },
      ],
    },
    {
      name: 'tray',
      path: '/tray',
      component: importPage('/windows/tray'),
    },
    {
      name: 'setting',
      path: '/setting',
      component: importPage('/windows/setting'),
    },
    {
      name: 'skins',
      path: '/skins',
      component: importPage('/windows/skins'),
    },
    {
      name: 'menus',
      path: '/menus',
      component: importPage('/windows/menus'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.auth) {
    next();
  } else {
    next();
  }
});

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    ipcRenderer.send('set-tray-title', to.meta.title);
  }
});

export default router;