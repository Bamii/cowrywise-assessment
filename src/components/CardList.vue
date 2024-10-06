<template>
  <div class="list-container container">
    <div id="columns-container" class="columns-container">
      <div class="column" v-for="(column, index) in shared_columns" v-bind:key="index">
        <Card
          v-for="(item, index) in column"
          :key="item.id"
          :index="index"
          :details="item"
        />

        <Card v-if="props.loading" :cls="`${['short', 'tall', 'mid'][index]}`" />
        <Card v-if="props.loading" :cls="`${['mid', 'short', 'mid'][index]}`" />
        
        <BottomFeeder v-if="props.items?.length" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BottomFeeder from "@/components/BottomFeeder.vue";
import Card from "@/components/Card.vue";
import { reactive, onMounted, computed, type ComputedRef } from "vue";
import { type ResponseData } from "@/types";

type Props = {
  items: ResponseData[] | null,
  loading: Boolean
}
const props = defineProps<Props>()

const cols = getComputedStyle(document.body).getPropertyValue('--columns');
const state = reactive({
  columns: parseInt(cols),
  selected: null,
  modal_open: false
})

onMounted(() => {
  addEventListener("resize", resizer)
})

function resizer () {
  state.columns = parseInt(getComputedStyle(document.body).getPropertyValue('--columns'))
}

const shared_columns: ComputedRef<ResponseData[][]> = computed(() => 
  [...new Array(state.columns)].map((_,index) => 
      (props.items ?? []).filter((e, i) => i % state.columns == index)))
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
