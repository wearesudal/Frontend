<script setup>
  import { ref, onMounted } from 'vue';
  import { localAxios } from '@/util/http-commons';
  //import { useRoute } from 'vue-router';
  import { useRouter } from 'vue-router';
  const ax = localAxios();
  const board = ref([]);
  const router = useRouter();

  onMounted(() => {
    getUserDetail();
  });

  // const route = useRoute();

  const getUserDetail = () => {
    console.log('print detail');
    ax.get('/user/info') // ,
      // {
      // params: {
      // ServiceKey: VITE_OPEN_API_SERVICE_KEY,
      // pageNo: 1,
      // numOfRows: 20,
      // LAWD_CD: 11110,
      // DEAL_YMD: 201512
      // },
      // }
      .then(({ data }) => {
        console.log('유저정보' + data);
        board.value = data.data;
      })
      .catch((error) => {
        console.log(error);
      });
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
          <td>{{ user.userName }}</td>
        </tr>
        <tr>
          <th class="title-cell">아이디</th>
          <td>{{ board.content }}</td>
        </tr>
        <tr>
          <th class="title-cell">비밀번호</th>
          <td>{{ board.hit }}</td>
        </tr>
      </table>
    </div>
    <br /><br />

    <button type="button" class="btn btn-outline-primary mb-3" @click="moveEdit">수정하기</button>
  </div>
</template>

<style scoped></style>
