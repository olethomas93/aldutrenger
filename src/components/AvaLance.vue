<script setup lang="ts">
import { onMounted, ref, computed } from "vue";

const VARSOM_URL =
  "https://api01.nve.no/hydrology/forecast/avalanche/v6.0.1/api/AvalancheWarningByCoordinates/Detail/";

const avalanceData = ref();
const location = ref();
const errorStr = ref();

onMounted(async () => {
  await locateMe();
  await fetchData(location.value.coords);
});

const fetchData = async (pos: any) => {
  const url1 = `${VARSOM_URL}${pos.latitude}/${pos.longitude}/1`;
  avalanceData.value = await (await fetch(url1)).json();

  console.log(avalanceData.value);

  return true;
};

const locateMe = async () => {
  let temp = false;
  try {
    location.value = await getLocation();

    temp = true;
  } catch (e: any) {
    errorStr.value = e.message;
  }

  return temp;
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
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-sm"
        v-for="(forcast, index) in avalanceData"
        :key="forcast"
      >
        <div class="card shadow p-3 mb-5 bg-white rounded" style="height: 100%">
          <div class="card-body">
            <h5 class="card-title">
              {{ forcast.RegionName }}
            </h5>

            <h6 :class="'color' + forcast.DangerLevel" class="badge">
              {{ forcast.DangerLevel }}
            </h6>
            <div>
              <h6>{{ forcast.MainText }}</h6>
              <button
                class="btn btn-sm btn-outline-info"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#details' + index"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Detaljer
              </button>
              <div class="collapse" :id="'details' + index">
                <div class="card card-body">
                  <h6>{{ forcast.AvalancheDanger }}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.widget {
  padding-top: 5%;
}

.color2 {
  background-color: #eed202;
}
.color1 {
  background-color: green;
}

color3 {
  background-color: red;
}
</style>
