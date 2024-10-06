<template>
  <div class="list-container container">
    <div class="columns-container">
      <div class="column" v-for="(column, index) in shared_columns" v-bind:key="column">
        <Card
          v-for="(item, index) in column"
          :key="item.id"
          :index="index"
          :details="item"
          @click="() => openPhoto(item)"
        />

        <Card v-if="props.loading" :cls="`${['short', 'tall', 'mid'][index]}`" />
        <Card v-if="props.loading" :cls="`${['mid', 'short', 'mid'][index]}`" />
        
        <BottomFeeder />
      </div>
    </div>
  </div>

  <teleport to="body">
    <div v-if="modalOpen" class="modal-mask">
      <div class="modal">
        <div @click="modalOpen = false" class="modal-close">X</div>
        <div class="image-container">
          <img :src="selectedPhoto?.urls.regular" alt="" />
        </div>
        <div class="details">
          <div class="detail name">{{ selectedPhoto?.user.name }}</div>
          <div class="detail location">{{ selectedPhoto?.user.location }}</div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import BottomFeeder from "@/components/BottomFeeder.vue";
import Card from "@/components/Card.vue";
import { reactive, onMounted, computed } from "vue"

const props = defineProps({
  items: Array,
  loading: Boolean
})

console.log(getComputedStyle(document.body).getPropertyValue('--columns'))
const state = reactive({
  columns: parseInt(getComputedStyle(document.body).getPropertyValue('--columns')),
  selected: null,
  modal_open: false
})

onMounted(() => {
  addEventListener("resize", resizer)
})

function resizer () {
 state.columns = parseInt(getComputedStyle(document.body).getPropertyValue('--columns'))
}

const shared_columns = computed(() => [...new Array(state.columns)]
    .map((_,index) => (props.items ?? [])
        .filter((e, i) => i % state.columns == index)))
  
function openPhoto(details) {
  this.selectedPhoto = details;
  this.modalOpen = true;
}
</script>

<style lang="scss" scoped>
.list-container {
  width: auto;
  margin: 0 auto;
  position: relative;
  top: -3rem;

  .columns-container {
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 2.5rem;
    margin: 0 2rem;

    .column {
      display: flex;
      flex-direction: column;
      /* margin-right: 2rem; */
      gap: 1.5rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
