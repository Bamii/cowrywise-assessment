<template>
  <Layout
    :list="store.list"
    :loading="store.state.loading"
    :error="store.state.error"
  >
    <div class="search-container">
        <form v-if="store.state.current_context == 'default'" @submit.prevent="search" class="">
            <Input
                :text="query"
                :value="query"
                @update:value="query = $event"
                :submitter="search"
            />
        </form>

        <form id="search-quote-container" @submit.prevent="search" v-show="store.state.current_context != 'default'">
            <!-- <template v-if="store.state.">Searching for </template> -->
            Search Results for
        
            <label id="search_quote_label" for="search_quote">"{{ query }}"</label>
            <input class="search-text" name="search_quote" id="search_quote" v-model="query">
        </form>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import Layout from "@/components/layout.vue";
import Input from "@/components/Input.vue";
import {useSplashyStore} from "@/stores/splashy"
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from 'vue-router'

let store = useSplashyStore();
const router = useRouter();
const route = useRoute();
const query = ref("")

onMounted(() => {
  const search = route.query.search as string | null;

  (async function() {
      if(search) {
        query.value = search;
        await store.search(search)    
      } else {
        await store.load_initial();
      }
      
      document.querySelector("#search_quote")?.addEventListener("focus", () => {
        document.querySelector("#search_quote_label")?.classList.add("underline")
      })
    
      document.querySelector("#search_quote")?.addEventListener("blur", () => {
        document.querySelector("#search_quote_label")?.classList.remove("underline")
      })
  })();
})

watch(
  () => route.query.search,
  async search => {
    if(!search) store.load_initial();
    else store.search(search as string)
  }
)

const search = () => {
  router.push({ query: { search: query.value } })
}
</script>

<style lang="scss" scoped>
.search-container {
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--blue-dark);

  @media (min-width: 600px) {
    font-size: 2.7rem;
  }
}
.search-text {
    background: transparent;
    width: max-content;
    height: max-content;
    font-size: 1.6rem;
    border: none;
    height: 0.1px;
    width: 0.2px;
    color: transparent;
    outline: none;
    @media (min-width: 600px) {
      font-size: 2.4rem;
    }
}

#search_quote_label {
    color: var(--blue-light);
    &.underline {
        text-decoration: underline;
        text-underline-offset: 4px;
        tex-decoration-thickness: 3px;
    }
}
</style>
