<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const onSwiper = (swiper: any) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};
</script>

<template>
  <swiper
    :slides-per-view="1"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>
      <img
        src="https://camera.strandafjellet.no:8447/axis-cgi/mjpg/video.cgi?resolution=800x450&amp;dummy=1652445497027"
        height="450"
        width="800"
        alt="Camera Image (8447)"
        style="
          height: 100%;
          left: 0;
          object-fit: cover;

          top: 0;
          width: 100%;
        "
      />
    </swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    ...
  </swiper>
</template>
