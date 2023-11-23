<script setup>
  import { useMenuStore } from '../stores/menu.js';
  import { storeToRefs } from 'pinia';

  const menuStore = useMenuStore();

  // 반응형을 유지하면서 스토어에서 속성을 추출하려면, storeToRefs()를 사용
  // https://pinia.vuejs.kr/core-concepts/
  const { menuList } = storeToRefs(menuStore);
  const { changeMenuState } = menuStore;

  const logout = () => {
    changeMenuState();
  };
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top">
    <div class="container-fluid">
      <router-link :to="{ name: 'main' }" class="navbar-brand">
        <img
          src="@/assets/sudal.jpg"
          class="rounded mx-auto d-block"
          alt="..."
          height="50"
          width="50"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav me-auto my-2 my-lg-0">
          <li class="nav-item">
            <a class="nav-link">
              <router-link :to="{ name: 'notice' }" class="nav-link">공지사항</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <router-link :to="{ name: 'faq' }" class="nav-link">FAQ</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <router-link :to="{ name: 'community' }" class="nav-link">커뮤니티</router-link>
            </a>
          </li>

          <!--<li class="nav-item">
            <router-link :to="{ name: 'board' }" class="nav-link">게시판</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'estations' }" class="nav-link">전기차충전소</router-link>
          </li>-->
        </ul>
        <!-- <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="검색..."
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="button">search</button>
        </form> -->
        <ul class="navbar-nav ms-auto my-2 my-lg-0">
          <template v-for="menu in menuList" :key="menu.routeName">
            <template v-if="menu.show">
              <template v-if="menu.routeName === 'user-logout'">
                <li class="nav-item">
                  <router-link to="/" @click="logout" class="nav-link">{{ menu.name }}</router-link>
                </li>
              </template>
              <template v-else>
                <li class="nav-item">
                  <router-link :to="{ name: menu.routeName }" class="nav-link">{{
                    menu.name
                  }}</router-link>
                </li>
              </template>
            </template>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
