import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false);

  const getisLogin = computed(() => isLogin.value);

  const setisLogin = (param) => {
    isLogin.value = param;
  };

  return {
    isLogin,
    getisLogin,
    setisLogin,
  };
});
