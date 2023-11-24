<script setup>
  import { localAxios } from '@/util/http-commons';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../stores/user';

  const ax = localAxios();
  const router = useRouter();
  const id = ref('');
  const pw = ref('');

  const store = useUserStore();

  const login = () => {
    ax.post(`user/login`, {
      userId: id.value,
      userPass: pw.value,
    })
      .then((data) => {
        console.log(data);
        localStorage.setItem('accessToken', data.data.token);
        localStorage.setItem('userIdx', data.data.userIdx);

        store.setisLogin(true);
        alert('로그인 되었습니다.');
        router.push({ name: 'main' });
      })
      .catch((e) => {
        alert('로그인에 실패했습니다.');
        console.log(e);
      });
  };

  const moveJoin = () => {
    router.push({ name: 'signup' });
  };
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="orange">로그인</mark>
        </h2>
      </div>
      <div class="col-lg-10">
        <form>
          <div class="form-check mb-3 float-end">
            <input class="form-check-input" type="checkbox" />
            <label class="form-check-label" for="saveid"> 아이디저장 </label>
          </div>
          <div class="mb-3 text-start">
            <label for="userId" class="form-label">아이디 : </label>
            <input id="userId" type="text" class="form-control" v-model="id" placeholder="아이디" />
          </div>
          <div class="mb-3 text-start">
            <label for="userPass" class="form-label">비밀번호 : </label>
            <input
              id="userPass"
              type="password"
              class="form-control"
              v-model="pw"
              @keyup.enter="login"
              placeholder="비밀번호"
            />
          </div>
          <div class="col-auto text-center">
            <button
              type="button"
              class="btn ms-1 mb-3"
              @click="login"
              style="background-color: rgb(175, 190, 207)"
            >
              로그인
            </button>
            <button
              type="button"
              class="btn ms-1 mb-3"
              @click="moveJoin"
              style="background-color: rgb(175, 190, 207)"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
