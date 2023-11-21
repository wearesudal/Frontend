<script setup></script>

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
            <label for="username" class="form-label">이름 : </label>
            <input type="text" class="form-control" placeholder="이름" />
          </div>
          <div class="mb-3">
            <label for="userid" class="form-label">아이디 : </label>
            <input type="text" class="form-control" placeholder="아이디" />
          </div>
          <div class="mb-3">
            <label for="userpwd" class="form-label">비밀번호 : </label>
            <input type="text" class="form-control" placeholder="비밀번호" />
          </div>
          <div class="mb-3">
            <label for="pwdcheck" class="form-label">비밀번호 확인 : </label>
            <input type="text" class="form-control" id="pwdcheck" placeholder="비밀번호 확인" />
          </div>
          <div class="mb-3">
            <label for="emailid" class="form-label">이메일 : </label>
            <div class="input-group">
              <input type="text" class="form-control" placeholder="이메일아이디" />
              <span class="input-group-text">@</span>
              <select class="form-select" aria-label="이메일 도메인 선택">
                <option selected>선택</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="kakao.com">kakao.com</option>
                <option value="daum.net">daum.net</option>
              </select>
            </div>
          </div>
          <div class="col-auto text-center">
            <button type="button" class="btn mb-3" style="background-color: rgb(175, 190, 207)">
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
