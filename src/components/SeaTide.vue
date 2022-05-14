<script setup lang="ts">
import { onMounted, ref } from "vue";

const API_URL = "https://www.kartverket.no/api/vsl/tideforecast";
const TIDE_LEVEL = "https://www.kartverket.no/api/vsl/tideLevels";

const currentLevel = ref();
const nextHighTide = ref();
const tideForecast = ref();
const nextLowTide = ref();
const location = ref();
const gettingLocation = ref(false);
const errorStr = ref();

onMounted(async () => {
  await locateMe();
  await fetchData(location.value.coords);
});

const fetchData = async (pos: any) => {
  const url1 = `${API_URL}?latitude=${pos.latitude}&longitude=${pos.longitude}&place=&language=nb`;
  const url2 = `${TIDE_LEVEL}?latitude=${pos.latitude}&longitude=${pos.longitude}&place=&language=nb`;
  tideForecast.value = await (await fetch(url1)).json();
  let tideData = await (await fetch(url2)).json();
  console.log(tideData);

  parseTideData(tideData);

  return true;
};
const parseTideData = (tideData: any) => {
  currentLevel.value = tideData.result.currentLevel.measurement.value;

  nextHighTide.value = handleTime(
    new Date(tideData.result.nextHighTide.dateTime)
  );

  nextLowTide.value = handleTime(
    new Date(tideData.result.nextLowTide.dateTime)
  );
};
const getLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation is not available."));
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve(pos);
      },
      (err) => {
        reject(err);
      }
    );
  });
};

const handleTime = (dataD: Date) => {
  let data = new Date(dataD);
  let hrs = data.getHours();
  let mins = data.getMinutes();
  let hour = hrs.toString();
  let minute = mins.toString();
  if (hrs <= 9) hour = "0" + hrs;
  if (mins < 10) minute = "0" + mins;
  const postTime = hour + ":" + minute;
  return postTime;
};
const locateMe = async () => {
  gettingLocation.value = true;
  try {
    gettingLocation.value = false;
    location.value = await getLocation();
  } catch (e: any) {
    gettingLocation.value = false;
    errorStr.value = e.message;
  }

  return true;
};
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm">
        <div
          class="card border-light shadow-lg p-3 mb-5 rounded"
          style="height: 100%"
        >
          <h5 class="mb-0 text-dark">Vannstand nå</h5>

          <div class="content">
            <img src="../assets/tide.svg" style="width: 40%" />
            <div
              class="card-body mb-1 text-dark"
              style="color: white"
              v-if="currentLevel"
            >
              {{ currentLevel }}cm
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm">
        <div
          class="card border-light shadow-lg p-3 mb-5 rounded"
          style="height: 100%"
        >
          <h5 class="mb-0 text-dark">Neste høyvann</h5>

          <div class="content">
            <img src="../assets/tideup.svg" style="width: 40%" />
            <div class="card-body mb-0 text-dark" v-if="nextHighTide">
              {{ nextHighTide }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm">
        <div
          class="card border-light shadow-lg p-3 mb-5 rounded"
          style="height: 100%"
        >
          <h5 class="mb-0 text-dark">Neste lavvann</h5>

          <div class="content">
            <img
              src="../assets/tidedown.svg"
              style="width: 40%; color: black"
            />

            <div class="card-body mb-0 text-dark" v-if="nextLowTide">
              {{ nextLowTide }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards {
  align-items: center;
}
.aligncolumn {
  display: flex;
  align-items: center;
  align-content: stretch;
  flex-direction: row-reverse;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.widget {
  padding-top: 5%;
}

.card-body {
  font-weight: bold;
}
.card-title {
  font-family: sans-serif;
  font-weight: bold;
}
</style>
