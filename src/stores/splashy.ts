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
        state.data = Object.values(response.data) as ResponseData[]
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
    // if (!state.data) return

    state.error = null;
    if (state.loading) return;

    state.loading = true;
    const text = state.current_context == "search" ? state.search_text : "African";

    const page = (state.current_context == "search" ? state.search[text].page : state.current_page) + 1
    let url = `https://api.unsplash.com/search/photos/?client_id=${UNSPLASH_CLIENT_KEY}&page=${page}`
    if (text) url += `&query=${text}`

    return axios
      .get(url)
      .then((response) => {
        const data: ResponseData[] = Object.values(response.data);
        if (state.current_context == "search") {
          state.search[text] = {
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
    state.current_context = "search"
    state.search_text = query;
    state.error = null;

    if (state.loading) return;
    state.loading = true;

    try {
      let meta = state.search[query];

      if (meta && meta.data.length > 0) {
        return;
      }

      meta = state.search[query] = {
        data: [],
        page: 1
      }

      return axios
        .get(
          `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_CLIENT_KEY}&page=${1}&query=${query}>`
        )
        .then((response) => {
          const data: ResponseData[]  = Object.values(response.data.results);
          state.search[query] = {
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
