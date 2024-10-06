
<template>
  <div class="">
    <Header>
      <slot></slot>
    </Header>

    <ErrorContainer v-if="error && (props.list.length == 0 || !props.list)" :text="error" />
    
    <CardList :loading="props.loading" :items="props.list" />
    
    <!-- <BottomFeeder /> -->
  </div>
</template>

<script setup lang="ts">
import ErrorContainer from "@/components/Error.vue";
import Header from "@/components/Header.vue";
// import LoadingList from "@/components/Loading.vue";
import CardList from "@/components/CardList.vue";
// import BottomFeeder from "@/components/BottomFeeder.vue";
// import { ref } from "vue";
// import { useSplashyStore } from "@/stores/counter"

// const store = useSplashyStore();

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