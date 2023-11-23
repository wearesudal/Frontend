<script setup>
import { ref, onMounted, watch } from 'vue';
import { localAxios } from "@/util/http-commons";
const ax = localAxios()

let cityInfo = ref([]);
let gugunInfo = ref([]);
let dongInfo = ref([]);
let yearInfo = ref([]);
let monthInfo = ref([]);
let apartments = ref([]);

onMounted(() => {
  getCities();
  getGuguns();
  getDongs();
  // getGuguns();
  // getDongs();
  setYearInfo();
  setMonthInfo();
});

const getCities = () => {
  ax.get("/map/info/city")
    .then(({ data }) => {
      cityInfo.value = data.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

const getGuguns = () => {
  ax.get("/map/info/gugun", {
    params: {
      cityName: '서울특별시'
    }
  }).then(({ data }) => {
      gugunInfo.value = data.data;
    }).catch((error) => {
      console.log(error);
    });
}

const getDongs = () => {
  ax.get("/map/info/dong", {
    params: {
      cityName: '서울특별시',
      gugunName: '강남구'
    }
  }).then(({ data }) => {
      dongInfo.value = data.data;
    }).catch((error) => {
      console.log(error);
    });
}

const setYearInfo = () => {
  for (let i = 2015; i <= 2023; i++) {
    yearInfo.value.push(i);
  }
}

const setMonthInfo = () => {
  for (let i = 1; i <= 12; i++) {
    monthInfo.value.push(i);
  }
}

const getApartmentInfos = () => { 
      ax.get("/map", {
        params: {
          sidoName: '서울특별시',
          gugunName: '강남구',
          dongName: '대치동',
          dealYear: 2015,
          dealMonth: 1
        }
      }).then(({ data }) => {
        console.log(data);
        apartments.value = data.data;
      }).catch((error) => { 
        console.log(error);
      })
    }

watch(cityInfo => {
  console.log(cityInfo.value);
})
</script >

<template>
  <div align="center">
    <h1>🦦아기수달 부동산🦦</h1>
    <br>
    <div>
      <div class="selectbox-container">
        <select id="city" name="city" v-model="cityInfo">
          <option v-for="city in cityInfo" :value="city.cityName">{{ city.cityName }}</option>
        </select>
      </div>
      <div class="selectbox-container">
        <select id="gugun" name="gugun" v-model="gugunInfo">
          <option v-for="gugun in gugunInfo" :value="gugun.gugunName">{{ gugun.gugunName }}</option>
        </select>
      </div>
      <div class="selectbox-container">
        <select id="dong" name="dong" v-model="dongInfo">
          <option v-for="dong in dongInfo" :value="dong.dongName">{{ dong.dongName }}</option>
        </select>
      </div>
      <div class="selectbox-container">
        <select id="year" name="year" v-model="yearInfo">
          <option v-for="year in yearInfo" :value="year" :label="year">{{ year }}</option>
        </select>
      </div>
      <div class="selectbox-container">
        <select id="month" name="month" v-model="monthInfo">
          <option v-for="month in monthInfo" :value="month" :label="month">{{ month }}</option>
        </select>
      </div>
      <div class="selectbox-container" id="searchInfo">
        <button @click="getApartmentInfos()">검색</button>
      </div>
    </div>

    <br><br>
    <div id="map" class="map">
    </div>

    <div>
    <table>
      <colgroup>
        <col>
        <col>
        <col>
        <col>
        <col>
      </colgroup>
      <thead>
        <tr>
          <th scope="col">순번</th>
          <th scope="col">아파트명</th>
          <th scope="col">층</th>
          <th scope="col">전용면적</th>
          <th scope="col">거래가격</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(apartment, idx) in apartments">
          <td>{{ idx + 1 }}</td>
          <td>{{ apartment.apartmentName }}</td>
          <td>{{ apartment.floor }}</td>
          <td>{{ apartment.area }}</td>
          <td>{{ apartment.dealAmount }}</td>
        </tr>
      </tbody>
    </table>
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
  cityInfo() {
    return {
      cityOption: null,
      cityInfo: [],
    }
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

mark.purple {
  background: linear-gradient(to top, #c354ff 20%, transparent 30%);
}

table {
  width: 100%;
  border-collapse: collapse;
}

colgroup {
  width: 5%;
  /* 전체 너비의 50%를 첫 번째 열에 할당 */
}

col:nth-child(2) {
  width: 50%;
  /* 전체 너비의 30%를 두 번째 열에 할당 */
}

col:nth-child(3) {
  width: 5%;
  /* 전체 너비의 10%를 세 번째 열에 할당 */
}

col:nth-child(4) {
  width: 20%;
  /* 전체 너비의 10%를 네 번째 열에 할당 */
}

col:nth-child(5) {
  width: 20;
  /* 전체 너비의 10%를 네 번째 열에 할당 */
}


td,
th {
  border: 1px solid rgb(175, 190, 207);
  padding: 8px;
  text-align: center;
}
</style>