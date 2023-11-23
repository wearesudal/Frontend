<script setup>
import { ref, onMounted, watch } from 'vue';
import { localAxios } from "@/util/http-commons";
const ax = localAxios()
const cityInfo = ref([]);
const gugunInifo = ref([]);
const dongInfo = ref([]);
const dealYearInfo = ref([]);
const dealMonthInfo = ref([]);

onMounted(() => {
  console.log("mount됐음~");
});

const siInfo = ["서울특별시", "인천광역시", "부산광역시"];

watch(cityInfo => {
  console.log(cityInfo.value);
})
</script >

<template>
  <div align="center">
    <h1>🦦오기수달의 부동산🦦</h1>
    <br>
    <div>
      <div class="selectbox-container">
        <select id="si" name="si" v-model="cityInfo">
          <option value="option1">선택</option>
          <option v-for="info in siInfo" :value="info" :label="info">{{ info }}</option>
        </select>
      </div>
      <div class="selectbox-container">
        <select id="gugun" name="gugun">
          <option value="option1">선택</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <div class="selectbox-container">
        <select id="dong" name="dong">
          <option value="option1">선택</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <div class="selectbox-container">
        <select id="year" name="year">
          <option value="option1">선택</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <div class="selectbox-container">
        <select id="month" name="month">
          <option value="option1">선택</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <div class="selectbox-container" id="searchInfo">
        <button @click="searchRegion()">검색</button>
      </div>
    </div>

    <br><br>
    <div id="map" class="map">

    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.kakao && window.kakao.maps
      ? this.initMap()
      : this.addKakaoMapScript();
  },
  methods: {
    addKakaoMapScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=본인이 발급받은 appkey 등록";
      document.head.appendChild(script);
    },
    initMap() {
      var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(37.450403, 126.655795), //지도의 중심좌표.
        level: 4 //지도의 레벨(확대, 축소 정도)
      };

      var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    },
    searchRegion() {
      console.log("search Region");
    }
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 400px;
}

.selectbox-container {
  display: inline-block;
  margin-right: 20px;
}
</style>