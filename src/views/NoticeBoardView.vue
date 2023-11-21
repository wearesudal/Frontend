<script setup>
  import { ref, onMounted } from 'vue';
  import { localAxios } from "@/util/http-commons";
const ax = localAxios()
  // const url = import.meta.env.VITE_ELECTRIC_CHARGING_STATION_URL;
  // const serviceKey = import.meta.env.VITE_OPEN_API_SERVICE_KEY;
  // const { VITE_APART_MAEMAE_URL } = import.meta.env;
  const notices = ref([]);

  onMounted(() => {
    getNotices();
  });

const getNotices = () => {
  ax.get("/board")
    // ,
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
        console.log(data);
        notices.value = data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };
</script>

<template>
  <div class="notice">
    <h3 align="center" style="font-weight: bold">🦦오기수달 공지사항🦦</h3>
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
          <th scope="col">글쓴이</th>
          <th scope="col">글쓴 시간</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(notice, idx) in notices">
          <td>{{ idx + 1 }}</td>
          <td>{{ notice.title }}</td>
          <td>{{ notice.userIdx }}</td>
          <td>{{ notice.createTime }}</td>
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
      width: 10%; /* 전체 너비의 50%를 첫 번째 열에 할당 */
    }

    col:nth-child(2) {
      width: 50%; /* 전체 너비의 30%를 두 번째 열에 할당 */
    }

    col:nth-child(3) {
      width: 20%; /* 전체 너비의 10%를 세 번째 열에 할당 */
    }

    col:nth-child(4) {
      width: 20%; /* 전체 너비의 10%를 네 번째 열에 할당 */
    }

    td, th {
      border: 1px solid rgb(175, 190, 207);
      padding: 8px;
      text-align: center;
    }
</style>
