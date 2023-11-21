import { createRouter, createWebHistory } from 'vue-router';
import TheMainView from '../views/TheMainView.vue';

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
          name: 'user-login',
          component: () => import('@/components/user/UserLogin.vue'),
        },
        {
          path: 'join',
          name: 'user-join',
          component: () => import('@/components/user/UserJoin.vue'),
        },
        {
          path: 'mypage',
          name: 'user-mypage',
          //beforeEnter: onlyAuthUser,
          component: () => import('@/components/user/UserMyPage.vue'),
        },
      ],
    },
    {
      path: '/board',
      name: 'notice',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NoticeBoardView.vue'),
    },
    {
      path: '/faq',
      name: 'faq',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FAQBoardView.vue'),
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/CommunityBoardView.vue'),
    },
  ],
});

export default router;
