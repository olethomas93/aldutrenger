<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>

  <iframe
    title="Entur-widget"
    frameBorder="0"
    style="display: block; height: 100vh; width: 100%"
    src="https://widget.entur.no/compact?target=_target&defaultLang=nob"
  ></iframe>
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
  },
});
</script>
