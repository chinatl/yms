import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '../views/layout/index'
export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login', component: () => import('@/views/login/index'), name: '登录' },
    { path: '/login', component: () => import('@/views/login/index') },
    {
      path: '/SubsidyDeclaration',
      component: Layout,
      children: [
        {
          path: 'index',
          name: '补助申报',
          component: () => import('@/views/SubsidyDeclaration/index'),
          meta: { title: '补助申报', requiresAuth: true, name: '补助申报' }
        }
      ]
    },
    {
      path: '/UserDeclaration',
      component: Layout,
      children: [
        {
          path: 'index',
          name: '我的申报',
          component: () => import('@/views/UserDeclaration/index'),
          meta: { title: '我的申报', requiresAuth: true, name: '我的申报' }
        }
      ]
    },
    {
      path: '/UserSubsidy',
      component: Layout,
      children: [
        {
          path: 'index',
          name: '我的补助',
          component: () => import('@/views/UserSubsidy/index'),
          meta: { title: '我的补助', requiresAuth: true, name: '我的补助' }
        }
      ]
    },
    {
      path: '/UserGranting',
      component: Layout,
      children: [
        {
          path: 'index',
          name: '我的发放',
          component: () => import('@/views/UserGranting/index'),
          meta: { title: '我的发放', requiresAuth: true, name: '我的发放' }
        }
      ]
    }
  ]
})
