import { createRouter, createWebHistory } from 'vue-router';
import TheMainView from '../views/TheMainView.vue';
import BoardDetailVue from '../views/BoardDetailView.vue';
import BoardWriteVue from '../views/BoardWriteView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: TheMainView,
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/TheUserView.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/components/user/UserLogin.vue'),
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/components/user/UserJoin.vue'),
        },
        {
          path: 'info',
          name: 'info',
          //beforeEnter: onlyAuthUser,
          component: () => import('@/components/user/UserMyPage.vue'),
        },
        // {
        //   path: 'logout',
        //   name: 'logout',
        //   component: () => import('@/components/user/UserLogout.vue'),
        // },
      ],
    },
    {
      path: '/notice',
      name: 'notice',
      component: () => import('../views/NoticeBoardView.vue'),
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FAQBoardView.vue'),
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/CommunityBoardView.vue'),
    },
    {
      path: '/board/detail/:postIdx?/:category?',
      name: 'boardDetail',
      component: BoardDetailVue,
    },
    {
      path: '/board/write/:category?',
      name: 'boardWrite',
      component: BoardWriteVue,
    },
  ],
});

export default router;
