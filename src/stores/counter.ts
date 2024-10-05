import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios';
const UNSPLASH_CLIENT_KEY = "eg99CQE4E4auZzqv63Lv7LNpcRCq-lMz9q3w1dwzPSg"

export const useSplashyStore = defineStore('counter', () => {
  const loading = ref(true);
  const error = ref(null);
  const state = reactive({
    loading: true,
    error: null,
    data: null,
    current_page: null,
    current_context: "default", // search, default
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
    if (state.data) return;
    
    state.loading = true;
    return axios
      .get(
        `https://api.unsplash.com/photos/?client_id=${UNSPLASH_CLIENT_KEY}&page=1`
      )
      .then((response) => {
        console.log(response.data)
        state.data = Object.values(response.data)
        state.current_page = 1;
        state.error = null;
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
    state.loading = true;
    return axios
      .get(
        `https://api.unsplash.com/photos/?client_id=${UNSPLASH_CLIENT_KEY}&page=${state.current_page}`
      )
      .then((response) => {
        state.data = Object.values(response.data)
        state.current_page = state.current_page + 1;
        state.error = null;
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
    if (state.loading) return;
    
    state.loading = true;
    let meta = state.search[query];
    
    if(!meta)
      meta = state.search[query] = {
        data: [],
        page: 1
      }
    
    const page = state.page + 1;

    console.log(`searching page ${page} for query ${query}`);
    return axios
      .get(
        `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_CLIENT_KEY}&page=${page}&query=${query}>`
      )
      .then((response) => {
        state.search[query] = {
          data: [...state.data, ...Object.values(response.data.results)],
          page
        }
        state.error = null;
        return response.data.results;
      })
      .catch((error) => {
        state.error = error;
        return "Error!";
      })
      .finally(() => {
        state.loading = false;
      });
  }

  return { state, error, loading, load_next_batch, load_initial, search }
})
