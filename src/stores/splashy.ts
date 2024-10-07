import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
const UNSPLASH_CLIENT_KEY = "eg99CQE4E4auZzqv63Lv7LNpcRCq-lMz9q3w1dwzPSg"
import { type State, type ResponseData } from "@/types"

export const useSplashyStore = defineStore('counter', () => {
  const loading = ref(false);
  const error = ref(null);
  const state: State = reactive({
    loading: false,
    error: null,
    data: null,
    current_page: 0,
    total_pages: 0,
    current_context: "default", // search, default
    search_text: "",
    // search: new Map(),
    search: {
      /*
        search_text: {
          data: [],
          page: 1,
        }
      */
    }
  })

  const load_initial = async () => {
    state.current_context = "default"
    state.search_text = "";
    state.error = null;

    if (state.data || state.loading) return;
    state.loading = true;

    return axios
      .get(
        `https://api.unsplash.com/search/photos/?client_id=${UNSPLASH_CLIENT_KEY}&page=1&query=African`
      )
      .then((response) => {
        console.log(response.data)
        state.data = Object.values(response.data.results) as ResponseData[]
        state.total_pages = response.data.total_pages;
        state.current_page = 1;
        return response.data;
      })
      .catch((error) => {
        state.error = error;
        return "error!";
      })
      .finally(() => {
        state.loading = false;
      });
  }

  const load_next_batch = async () => {
    state.error = null;
    if (state.loading) return;

    state.loading = true;
    const is_search_context = state.current_context == "search";
    const text = is_search_context ? state.search_text : "African";

    let page = (is_search_context ? state.search[text].page : state.current_page)
    if(is_search_context) {
      if (state.search[text].total_pages == page) return;
    } else {
      if (state.total_pages == page) return;
    }

    page += 1;
    let url = `https://api.unsplash.com/search/photos/?client_id=${UNSPLASH_CLIENT_KEY}&page=${page}`
    if (text) url += `&query=${text}`
    return axios
      .get(url)
      .then((response) => {
        const data: ResponseData[] = Object.values(response.data.results);
        if (is_search_context) {
          state.search[text] = {
            ...state.search[text],
            data: [...(state.search[text].data ?? []), ...data],
            page
          }
        } else {
          state.data = [...(state.data ?? []), ...data]
          state.current_page = page;
        }

        return response.data;
      })
      .catch((error) => {
        state.error = error;
        return "error!";
      })
      .finally(() => {
        state.loading = false;
      });
  }

  const search = async (query: string) => {
    state.error = null;
    
    let meta = state.search[query];
    if (meta && meta.data.length > 0) {
      return;
    }

    meta = state.search[query] = {
      total_pages: 0,
      data: [],
      page: 1
    }
    
    if (state.loading) return;
    state.loading = true;
    state.current_context = "search"
    state.search_text = query;

    try {
      return axios
        .get(
          `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_CLIENT_KEY}&page=${1}&query=${query}>`
        )
        .then((response) => {
          const data: ResponseData[]  = Object.values(response.data.results);
          state.search[query] = {
            ...(state.search[query] ?? { total_pages: 0 }),
            data: [...(state.search[query].data ?? []), ...data],
            page: meta.page
          }
          return response.data.results;
        })
        .catch((error) => {
          console.log(error)
          state.error = error;
          return "Error!";
        })
        .finally(() => {
          state.loading = false;
        });
    } catch (e) { console.log(e) }
  }

  const list = computed(() => state.current_context == "search" ? state.search[state.search_text].data : state.data)

  return { state, list, error, loading, load_next_batch, load_initial, search }
})
