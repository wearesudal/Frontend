<script setup>
import { ref, onMounted } from 'vue';
import { localAxios } from "@/util/http-commons";
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router';
const ax = localAxios()
const board = ref([]);
const router = useRouter();

onMounted(() => {
    setBoardCategory();
});

const route = useRoute();
const category = route.params.category;
const article = ref({
  category: "",
  title: "",
  content: ""
});
const title = ref();
const content = ref();

const getBoardDetail = () => {
    console.log("print detail");
    ax.get("/board/search/" + 2)
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
            board.value = data.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

const setBoardCategory = () => { 
    console.log("print category " + category);
    article.category = category;
    console.log("print category ~ : " + article.category)
}

const moveList = () => {
  router.push({ name: category });
}

const writeBoardDidClick = () => {
    console.log("글쓰기 요청");
    article.title = title.value;
    article.content = content.value;
    console.log("print title : " + article.title);
    console.log("print content : " + article.content);
    ax.post("/board", {
        category: article.category,
        title: article.title,
        content: article.content
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => { 
        console.log(response.data);
        moveList();
    }).catch((error) => {
        console.log(error);
    });
} 
</script>

<template>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="subject" class="form-label">제목 : </label>
        <input type="text" class="form-control" v-model="title" placeholder="제목..." />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">내용 : </label>
        <textarea class="form-control" v-model="content" rows="10"></textarea>
      </div>
      <div class="col-auto text-center">
        <button type="submit" class="btn btn-outline-primary mb-3" @click="writeBoardDidClick">
          글작성
        </button>
        <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">
          목록으로이동...
        </button>
      </div>
    </form>
  </template>
  

<style>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    width: 30%;
    /* 타이틀 셀 너비 조정 */
}

/* 추가 스타일링을 위한 클래스 */
.title-cell {
    font-weight: bold;
}

/* 레이아웃을 위한 스타일 */
.table-container {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    /* 테이블 최대 너비 설정 */
    margin: auto;
}

@media (max-width: 600px) {
    th {
        width: 100%;
        /* 작은 화면에서는 타이틀 셀을 꽉 채우도록 조정 */
    }
}
</style>
