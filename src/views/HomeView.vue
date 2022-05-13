<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <WebCams />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import WebCamsVue from "@/components/WebCams.vue";
import WebCams from "@/components/WebCams.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
    WebCams,
  },
});
</script>
