<script setup>
  import { localAxios } from '@/util/http-commons';
  import { ref } from 'vue';

  const ax = localAxios();
  const name = ref('');
  const id = ref('');
  const pw = ref('');
  const email = ref('');
  const selectedEmail = ref('');

  const join = () => {
    ax.post(`/user/signup`, {
      userName: name.value,
      userId: id.value,
      userPass: pw.value,
      userEmail: email.value + '@' + selectedEmail.value,
    }).then((res) => {
      console.log(res);
    });
  };
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="orange">회원가입</mark>
        </h2>
      </div>
      <div class="col-lg-10 text-start">
        <form>
          <div class="mb-3">
            <label for="userName" class="form-label">이름 : </label>
            <input
              id="userName"
              type="text"
              class="form-control"
              v-model="name"
              placeholder="이름"
            />
          </div>
          <div class="mb-3">
            <label for="userId" class="form-label">아이디 : </label>
            <input id="userId" type="text" class="form-control" v-model="id" placeholder="아이디" />
          </div>
          <div class="mb-3">
            <label for="userPass" class="form-label">비밀번호 : </label>
            <input
              id="userPass"
              type="password"
              class="form-control"
              v-model="pw"
              placeholder="비밀번호"
            />
          </div>
          <div class="mb-3">
            <label for="pwdcheck" class="form-label">비밀번호 확인 : </label>
            <input type="password" class="form-control" id="pwdcheck" placeholder="비밀번호 확인" />
          </div>
          <div class="mb-3">
            <label for="userEmail" class="form-label">이메일 : </label>
            <div class="input-group">
              <input
                id="userEmail"
                type="text"
                class="form-control"
                v-model="email"
                placeholder="이메일아이디"
              />
              <span class="input-group-text">@</span>
              <select v-model="selectedEmail" class="form-select" aria-label="이메일 도메인 선택">
                <option selected>선택</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="kakao.com">kakao.com</option>
                <option value="daum.net">daum.net</option>
              </select>
            </div>
          </div>
          <div class="col-auto text-center">
            <button
              type="button"
              class="btn mb-3"
              style="background-color: rgb(175, 190, 207)"
              @click="join"
            >
              회원가입
            </button>
            <button
              type="button"
              class="btn ms-1 mb-3"
              style="background-color: rgb(175, 190, 207)"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
