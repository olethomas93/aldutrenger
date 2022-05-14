<script setup lang="ts">
import { onMounted, ref } from "vue";

const API_URL = "https://api.met.no/weatherapi/locationforecast/2.0/compact";

const WeatherForecast = ref();

const weatherNow = ref();
const weatherTomorrow = ref();
const weatherthird = ref();
const icon_weather_third = ref();
const icon_weather = ref();
const icon_weather_tomorrow = ref();
const index = ref();
const location = ref();
const gettingLocation = ref(false);
const errorStr = ref();

const weatherData = ref();

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
  //console.log(new Date().toISOString());

  parseWeatherData(WeatherForecast.value);

  return true;
};

const filterDates = (timeseries: Array<any>) => {
  let today = [];
  let tomorrow = [];
  let dayAfterTomorrow = [];
  let dateNow = new Date();
  let datetomorrow = new Date(dateNow);
  datetomorrow.setDate(dateNow.getDate() + 1);
  let afterTomorrow = new Date(datetomorrow);
  afterTomorrow.setDate(datetomorrow.getDate() + 1);
  console.log(dateNow.getDate());

  for (let i of timeseries) {
    let date = new Date(i.time);

    if (date.getDate() == dateNow.getDate()) {
      today.push(i);
    }

    if (date.getDate() == datetomorrow.getDate()) {
      tomorrow.push(i);
    }

    if (date.getDate() == afterTomorrow.getDate()) {
      dayAfterTomorrow.push(i);
    }
  }

  return { today: today, tomorrow: tomorrow, dayafter: dayAfterTomorrow };
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
  //console.log(closest);

  return index;
};
const parseWeatherData = (weatherForecast: any) => {
  weatherData.value = filterDates(weatherForecast.properties.timeseries);
  console.log(weatherData);

  index.value = getIndex(weatherForecast.properties.timeseries);
};

const printDate = (item: any) => {
  return handleTime(item.time);
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

const roundNumber = (numb: number) => {
  return numb.toFixed();
};
const handleTime = (dataD: Date) => {
  let data = new Date(dataD);
  let hrs = data.getHours();
  let mins = data.getMinutes();
  let hour = hrs.toString();
  let minute = mins.toString();
  if (hrs <= 9) hour = "0" + hrs;
  if (mins < 10) minute = "0" + mins;
  const postTime = hour;
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
      <div class="col-sm-4">
        <div
          v-if="weatherData"
          class="card border-light shadow-lg p-3 mb-5 rounded-lg cards"
          style="height: 100%"
        >
          <div class="wrapper">
            <img
              :src="
                'img/weather/' +
                weatherData.today[0].data.next_1_hours.summary.symbol_code +
                '.svg'
              "
              style="width: 20%"
              alt="ds"
            />
            <div>
              <h5 class="mb-0 text-dark">Været nå</h5>

              <div
                class="card-body mb-1 text-dark"
                style="color: white"
                v-if="weatherData"
              >
                {{
                  roundNumber(
                    weatherData.today[0].data.instant.details.air_temperature
                  )
                }}&#xb0;
              </div>
            </div>
          </div>
          <div class="small">
            <template v-for="item in weatherData.today" v-bind:key="item">
              <div>
                <img
                  :src="
                    'img/weather/' +
                    item.data.next_1_hours.summary.symbol_code +
                    '.svg'
                  "
                  style="width: 4vh"
                  alt="ds"
                />

                <div class="temp">
                  <h6>
                    {{
                      roundNumber(item.data.instant.details.air_temperature)
                    }}&#xb0;
                  </h6>

                  <h6>kl {{ printDate(item) }}</h6>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div
          v-if="weatherData"
          class="card border-light shadow-lg p-3 mb-5 rounded-lg cards"
          style="height: 100%"
        >
          <div class="wrapper">
            <img
              :src="
                'img/weather/' +
                weatherData.tomorrow[0].data.next_1_hours.summary.symbol_code +
                '.svg'
              "
              style="width: 20%"
              alt="ds"
            />
            <div>
              <h5 class="mb-0 text-dark">Været i morgen</h5>

              <div class="card-body mb-1 text-dark">
                {{
                  roundNumber(
                    weatherData.tomorrow[12].data.instant.details
                      .air_temperature
                  )
                }}&#xb0;
              </div>
            </div>
          </div>
          <div class="small">
            <template v-for="item in weatherData.tomorrow" v-bind:key="item">
              <div>
                <img
                  :src="
                    'img/weather/' +
                    item.data.next_1_hours.summary.symbol_code +
                    '.svg'
                  "
                  style="width: 4vh"
                  alt="ds"
                />
                <div class="temp">
                  <h6>
                    {{
                      roundNumber(item.data.instant.details.air_temperature)
                    }}&#xb0;
                  </h6>

                  <h6>kl {{ printDate(item) }}</h6>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div
          v-if="weatherData"
          class="card border-light shadow-lg p-3 mb-5 rounded-lg cards"
          style="height: 100%"
        >
          <div class="wrapper">
            <img
              :src="
                'img/weather/' +
                weatherData.dayafter[12].data.next_1_hours.summary.symbol_code +
                '.svg'
              "
              style="width: 20%"
              alt="ds"
            />
            <div>
              <h5 class="mb-0 text-dark">Været i overmorgen</h5>

              <div class="card-body mb-1 text-dark" style="color: white">
                {{
                  roundNumber(
                    weatherData.dayafter[12].data.instant.details
                      .air_temperature
                  )
                }}&#xb0;
              </div>
            </div>
          </div>
          <div class="small">
            <template v-for="item in weatherData.dayafter" v-bind:key="item">
              <div>
                <img
                  :src="
                    'img/weather/' +
                    item.data.next_1_hours.summary.symbol_code +
                    '.svg'
                  "
                  style="width: 4vh"
                  alt="ds"
                />

                <div class="temp">
                  <h6>
                    {{
                      roundNumber(item.data.instant.details.air_temperature)
                    }}&#xb0;
                  </h6>

                  <h6>kl {{ printDate(item) }}</h6>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.small {
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: auto;
  column-gap: 10%;
}

.temp {
  overflow: auto;
}
.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
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
