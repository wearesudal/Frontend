<script setup>
import { ref, onMounted } from 'vue';
import { localAxios } from "@/util/http-commons";
import { useRouter } from 'vue-router';
const ax = localAxios()
const questions = ref([]);
const router = useRouter();

onMounted(() => {
  getQuestions();
});

const getQuestions = () => {
  ax.get("/board/category?category=faq")
    .then(({ data }) => {
      console.log(data);
      questions.value = data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

function writeButtonDidClick() {
  router.push({name: 'boardWrite', params: { category: 'faq' }});
}
</script>

<template>
  <div class="faq">
    <h3 align="center" style="font-weight: bold">🦦오기수달 FAQ🦦</h3>
    <table class="">
      <colgroup>
        <col>
        <col>
        <col>
        <col>
      </colgroup>
      <thead>
        <tr>
          <th scope="col">순번</th>
          <th scope="col">제목</th>
          <th scope="col">조회수</th>
          <th scope="col">작성 일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, idx) in questions">
          <td>{{ idx + 1 }}</td>
          <td>
            <router-link :to="{ name: 'boardDetail', params: { postIdx: question.postIdx, category: 'faq'} }">
              {{ question.title }}
            </router-link>
          </td>
          <td>{{ question.hit }}</td>
          <td>{{ question.createTime }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button @click="writeButtonDidClick">글쓰기</button>
    </div>
  </div>
</template>

<style>
mark.purple {
  background: linear-gradient(to top, #c354ff 20%, transparent 30%);
}

table {
  width: 100%;
  border-collapse: collapse;
}

colgroup {
  width: 10%;
  /* 전체 너비의 50%를 첫 번째 열에 할당 */
}

col:nth-child(2) {
  width: 50%;
  /* 전체 너비의 30%를 두 번째 열에 할당 */
}

col:nth-child(3) {
  width: 20%;
  /* 전체 너비의 10%를 세 번째 열에 할당 */
}

col:nth-child(4) {
  width: 20%;
  /* 전체 너비의 10%를 네 번째 열에 할당 */
}

td,
th {
  border: 1px solid rgb(175, 190, 207);
  padding: 8px;
  text-align: center;
}
</style>
