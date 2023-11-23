<script setup>
import { ref, onMounted } from 'vue';
import { localAxios } from "@/util/http-commons";
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router';
const ax = localAxios()
const board = ref([]);
const router = useRouter();

onMounted(() => {
    getBoardDetail();
});

const route = useRoute();
const postIdx = route.params.postIdx;
let category = route.params.category;
let title = "";
let content = "";

const getBoardDetail = () => {
    console.log("print detail");
    ax.get("/board/search/" + postIdx)
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
};

const moveList = () => {
  router.push({ name: 'main' });
}

const deleteButtonDidClick = () => {
    ax.delete("/board", {
        params: {
            boardIdx: postIdx
        }
    }).then(data => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });
    moveList();
}

const updateButtonDidClick = () => { 
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
    console.log("board");
    console.log(board.value);
    router.push({ name: 'boardUpdate', params: { boardInfo: board.value } });
    // , params: {board.value});
}
</script>

<template>
    <div class="detail">
        <h3 align="center" style="font-weight: bold">게시글 자세히 보기</h3>
        <div class="table-container">
            <table>
                <tr>
                    <th class="title-cell">제목</th>
                    <td>{{ board.title }}</td>
                </tr>
                <tr>
                    <th class="title-cell">글 내용</th>
                    <td>{{ board.content }}</td>
                </tr>
                <tr>
                    <th class="title-cell">조회수</th>
                    <td>{{ board.hit }}</td>
                </tr>
                <tr>
                    <th class="title-cell">작성자</th>
                    <td>{{ board.userIdx }}</td>
                </tr>
                <tr>
                    <th class="title-cell">작성 시간</th>
                    <td>{{ board.createTime }}</td>
                </tr>
            </table>
        </div>
        <br><br>
        <div>
            <button @click="deleteButtonDidClick">삭제하기</button>
        </div>
    </div>
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