<template>
    <div :id='`bottom-feeder-${id}`' class="bottom-feeder"> </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { useSplashyStore } from "@/stores/splashy.js"

const store = useSplashyStore();
const id = Date.now()

onMounted(() => {
  const observer = new IntersectionObserver(
    (a) => {
        if (a[0].isIntersecting) {
          store.load_next_batch();
        }
    }, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
    }
  );
  
  observer.observe(document.querySelector("#bottom-feeder-"+id))
})
</script>

<style lang="scss">
.bottom-feeder {
  padding: 2rem;
}
</style>
