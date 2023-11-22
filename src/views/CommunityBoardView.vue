<script setup>
import { ref, onMounted } from 'vue';
import { localAxios } from "@/util/http-commons";
const ax = localAxios()
const communities = ref([]);

onMounted(() => {
  getCommunities();
});

const getCommunities = () => {
  ax.get("/board/category?category=community")
    .then(({ data }) => {
      console.log(data);
      communities.value = data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

</script>

<template>
  <div class="community">
    <h3 align="center" style="font-weight: bold">🦦오기수달 커뮤니티🦦</h3>
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
        <tr v-for="(community, idx) in communities">
          <td>{{ idx + 1 }}</td>
          <td>
            <router-link :to="{ name: 'boardDetail', params: { postIdx: community.postIdx } }">
              {{ community.title }}
            </router-link>
          </td>
          <td>{{ community.hit }}</td>
          <td>{{ community.createTime }}</td>
        </tr>
      </tbody>
    </table>
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
