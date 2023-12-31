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
const map = ref();

const selectedCity = ref('')
const selectedGugun = ref('')
const selectedDong = ref('')
const selectedYear = ref('')
const selectedMonth = ref('')

onMounted(() => {
  getCities();
  getGuguns();
  getDongs();
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

const displayMarker = () => {
  console.log("display : " + apartments.value.length)
  console.log(apartments.value);
  for (let i = 0; i < apartments.value.length; i++) {
    let pos = apartments.value[i];
    console.log(i + "번째 pos " + pos.lat + ", " + pos.lng);
    var marker = new kakao.maps.Marker({
      map: map.value,
      position: new kakao.maps.LatLng(pos.lat, pos.lng)
    });
  }
}

const initMap = (lat, lng) => {
  var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
  var options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
    level: 4 //지도의 레벨(확대, 축소 정도)
  };

  map.value = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
}

const getApartmentInfos = () => {
  ax.get("/map", {
    params: {
      sidoName: selectedCity.value,
      gugunName: selectedGugun.value,
      dongName: selectedDong.value,
      dealYear: selectedYear.value,
      dealMonth: selectedMonth.value
    }
  }).then(({ data }) => {
    apartments.value = data.data;
    initMap(apartments.value[0].lat, apartments.value[0].lng);
    displayMarker();
  }).catch((error) => {
    console.log(error);
  })
}
</script>

<template>
  <div align="center">
    <h1>🦦아기수달 부동산🦦</h1>
    <br>
    <div>
      <div class="selectbox-container">
        <select id="city" name="city" v-model="selectedCity">
          <option v-for="city in cityInfo" :value="city.cityName">{{ city.cityName }}</option>
        </select>
      </div>
      <div class="selectbox-container">
        <select id="gugun" name="gugun" v-model="selectedGugun">
          <option v-for="gugun in gugunInfo" :value="gugun.gugunName">{{ gugun.gugunName }}</option>
        </select>
      </div>
      <div class="selectbox-container">
        <select id="dong" name="dong" v-model="selectedDong">
          <option v-for="dong in dongInfo" :value="dong.dongName">{{ dong.dongName }}</option>
        </select>
      </div>
      <div class="selectbox-container">
        <select id="year" name="year" v-model="selectedYear">
          <option v-for="year in yearInfo" :value="year" :label="year">{{ year }}</option>
        </select>
      </div>
      <div class="selectbox-container">
        <select id="month" name="month" v-model="selectedMonth">
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
      <table class="table table-hover">
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
      ? this.initMap(37.450403, 126.655795)
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
    initMap(lat, lng) {
      var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(lat, lng), //지도의 중심좌표.
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

col:nth-child(1) {
  width: 5%;
}

col:nth-child(2) {
  width: 50%;
}

col:nth-child(3) {
  width: 5%;
}

col:nth-child(4) {
  width: 20%;
}

col:nth-child(5) {
  width: 20%;
}


td,
th {
  border: 1px solid rgb(175, 190, 207);
  padding: 8px;
  text-align: center;
}
</style>