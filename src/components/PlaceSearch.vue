<script setup lang="ts">
import { ref } from "vue";

let searchInput = ref("");

const places = ref();

const getPlaces = () => {
  fetch(
    `https://ws.geonorge.no/stedsnavn/v1/navn?sok=${searchInput.value}*&treffPerSide=15&side=1`
  )
    .then((res) => res.json())
    .then((res) => {
      places.value = res.navn;
    });
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <input
          type="text"
          v-model.trim="searchInput"
          placeholder="Søk steder..."
          @keyup="getPlaces"
        /><br />
        <ul>
          <li v-for="place in places" :key="place.stedsnummer">
            {{ place.skrivemåte }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
