<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div>
    <ul class="nav">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/mountain">
          <font-awesome class="nav-link" icon="mountain" href="/mountain" />
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/sea">
          <font-awesome class="nav-link" icon="water" href="/sea" />
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/weather">
          <font-awesome class="nav-link" icon="cloud" href="/weather" />
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/travel">
          <font-awesome class="nav-link" icon="plane" href="/travel" />
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/map">
          <font-awesome class="nav-link" icon="map" href="/map" />
        </a>
      </li>
    </ul>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

.nav-link {
  color: black;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
