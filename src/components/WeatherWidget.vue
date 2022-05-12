<script setup lang="ts">
import { onMounted, ref } from "vue";

const API_URL = "https://api.met.no/weatherapi/locationforecast/2.0/compact";

const WeatherForecast = ref();
const weatherNow = ref();
const icon_weather = ref();
const location = ref();
const gettingLocation = ref(false);
const errorStr = ref();

onMounted(async () => {
  await locateMe();
  await fetchData(location.value.coords);
});

const fetchData = async (pos: any) => {
  const url1 = `${API_URL}?lat=${pos.latitude}&lon=${pos.longitude}`;

  WeatherForecast.value = await (
    await fetch(url1, { headers: { "User-Agent": "TestApp Theisen" } })
  ).json();

  console.log(WeatherForecast.value);
  let millis = Date.now();
  console.log(new Date().toISOString());

  parseWeatherData(WeatherForecast.value);

  return true;
};

const getIndex = (timeseries: Array<any>) => {
  if (timeseries == null) {
    return;
  }
  let index = 0;
  let closest = timeseries[0].time;
  let now = new Date();

  for (let i = 0; i < 24; i++) {
    let date = new Date(timeseries[i].time);

    let diff = +now - +date;

    if (Math.abs(diff) < Math.abs(closest - +now)) {
      closest = timeseries[i].time;
      index = i;
    }
  }
  console.log(closest);

  return index;
};
const parseWeatherData = (weatherForecast: any) => {
  var index: any = getIndex(weatherForecast.properties.timeseries);

  weatherNow.value =
    weatherForecast.properties.timeseries[index].data.instant.details;

  icon_weather.value =
    weatherForecast.properties.timeseries[0].data.next_1_hours.summary.symbol_code;
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
};
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm">
        <div
          class="card border-light shadow-lg p-3 mb-5 rounded-lg cards"
          style="height: 100%; flex-direction: row"
        >
          <img
            :src="'img/weather/' + icon_weather + '.svg'"
            style="width: 20%"
            alt="ds"
          />
          <div>
            <h5 class="mb-0 text-dark">Været nå</h5>

            <div
              class="card-body mb-1 text-dark"
              style="color: white"
              v-if="weatherNow"
            >
              {{ weatherNow.air_temperature }}C&#xb0;
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.aligncolumn {
  display: flex;
  align-items: center;
  align-content: stretch;
  flex-direction: row-reverse;
}

.widget {
  padding-top: 5%;
}

.cards {
  background: #f0f0f0;
}

h5 {
  font-family: "Roboto Slab", sans-serif;
}

.card {
  border-radius: 4%;
}

.card-body {
  font-weight: bold;
}
.card-title {
  font-family: sans-serif;
  font-weight: bold;
}
</style>
