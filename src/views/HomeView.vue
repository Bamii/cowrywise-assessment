<template>
  <Layout
    :list="_state.state.data"
    :loading="photos.loading"
    :error="photos.error"
  >
    <div class="search-container">
      <form @submit.prevent="search" class="">
        <Input
          :text="query"
          :value="query"
          @update:value="query = $event"
          :submitter="search"
        />
      </form>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layout.vue";
import Input from "@/components/Input.vue";
import {useSplashyStore} from "@/stores/counter.ts"
import { reactive, onMounted, ref } from "vue";

let _state = useSplashyStore();
const query = ref("")
const photos = reactive({
  list: [],
  error: null,
  loading: false
})

onMounted(() => {
  _state.load_initial();
})

const search = () => {}
</script>

<style lang="scss" scoped>
.search-container {
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--blue-dark);

  @media (min-width: 600px) {
    font-size: 2.5rem;
  }
}
</style>
