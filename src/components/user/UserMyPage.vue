<script setup>
  import { ref, onMounted } from 'vue';
  import { localAxios } from '@/util/http-commons';
  import { useRouter } from 'vue-router';
  import { userDetail } from '../../api/user';

  const ax = localAxios();
  const user = ref('');
  const router = useRouter();

  onMounted(() => {
    getUserDetail();
  });

  const getUserDetail = () => {
    userDetail().then((res) => {
      console.log(res);
    });
  };

  const moveHome = () => {
    router.push({ name: 'main' });
  };
  const moveEdit = () => {
    router.push({ name: 'edit' });
  };

  //const updateButtonDidClick = () => {
  // console.log("update");
  // ax.put("/board", {
  //     postIdx: postIdx,
  //     category: 'faq',
  //     title: "title",
  //     content: "content"
  // }).then(data => {
  //     console.log(data);
  // }).catch((error) => {
  //     console.log(error);
  // });
  // moveList();
  // console.log('user');
  // console.log(user.value);
  //router.push({ name: 'boardUpdate', params: { userInfo: board.value } });
  // , params: {board.value});
  //};
</script>

<template>
  <div class="detail">
    <h2 class="my-3 py-3 shadow-sm bg-light text-center">
      <mark class="orange">내 정보</mark>
    </h2>
    <div class="table-container">
      <table>
        <tr>
          <th class="title-cell">이름</th>
          <td></td>
        </tr>
        <tr>
          <th class="title-cell">아이디</th>
          <td></td>
        </tr>
        <!-- <tr>
          <th class="title-cell">비밀번호</th>
          <td>{{ board.hit }}</td>
        </tr> -->
      </table>
    </div>
    <br /><br />
    <div class="col-auto text-center">
      <button
        type="button"
        class="btn ms-1 mb-3"
        @click="moveHome"
        style="background-color: rgb(175, 190, 207)"
      >
        홈으로
      </button>
      <button
        type="button"
        class="btn ms-1 mb-3"
        @click="moveEdit"
        style="background-color: rgb(175, 190, 207)"
      >
        수정하기
      </button>
    </div>
  </div>
</template>

<style scoped></style>
