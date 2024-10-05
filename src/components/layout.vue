
<template>
  <div class="container">
    <Header>
      <slot></slot>
    </Header>

    <LoadingList v-if="loading" />
    <ErrorContainer v-else-if="error" :text="error" />
    
    <CardList :loading="loading" :items="props.list" />
    
    <BottomFeeder />
  </div>
</template>

<script setup lang="ts">
import ErrorContainer from "@/components/Error.vue";
import Header from "@/components/Header.vue";
import LoadingList from "@/components/Loading.vue";
import CardList from "@/components/CardList.vue";
import BottomFeeder from "@/components/BottomFeeder.vue";
import { ref } from "vue";
import { useSplashyStore } from "@/stores/counter"
const THROTTLE_TIMEOUT = 5000;
const BOTTOM_LEEWAY = 200;
const store = useSplashyStore();

const props = defineProps({
  list: Array,
  error: String,
  loading: Boolean,
})
</script>

<style lang="scss" scoped>
#bottom-feeder {
  padding: 2rem;
  margin: 2rem 0;
}
.container {
  position: relative;
}
</style>