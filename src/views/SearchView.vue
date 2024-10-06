
<template>
    <Layout
    :list="_state.state.data"
    :loading="_state.state.loading"
    :error="_state.state.error"
  >
    <div class="search-container">
      <template v-if="_state.state.loading">Searching for </template>
      <template v-else>Search Results for </template>

      <span class="search-text">"{{ searchText }}"</span>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layout.vue";
import Input from "@/components/Input.vue";
import {useSplashyStore} from "@/stores/splashy.ts"
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router'
let store = useSplashyStore();
const router = useRouter();
const query = ref("")

onMounted(() => {
  store.load_initial();
})

const search = () => {
  router.push({ path: "/search", query: { q: query.value } })
  // store.search(query.value)
}
</script>


<style lang="scss" scoped>
.search-container {
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--blue-dark);

  @media (min-width: 600px) {
    font-size: 2.5rem;
  }

  .search-text {
    color: var(--gray-dark);
  }
}
</style>