<template>
  <div class="list-container container">
    <div ref="column-ref" id="columns-container" class="columns-container">
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
import { reactive, onMounted, computed, useTemplateRef, type ComputedRef } from "vue";
import { type ResponseData } from "@/types";

type Props = {
  items: ResponseData[] | null,
  loading: Boolean
}
const props = defineProps<Props>()
const myref = useTemplateRef('column-ref');

const cols = () => getComputedStyle(myref.value).getPropertyValue('--columns');
const state = reactive({
  columns: 0,
  selected: null,
  modal_open: false
})

onMounted(() => {
  state.columns = parseInt(cols());
  addEventListener("resize", resizer)
  function resizer () {
    state.columns = parseInt(cols())
  }
})


const shared_columns: ComputedRef<ResponseData[][]> = computed(() =>
  [...new Array(state.columns)].map((_,index) =>
      (props.items ?? []).filter((e, i) => i % state.columns == index)))
</script>

<style lang="scss" scoped>
#columns-container {
    --columns: 1;

    @media only screen and (min-width: 1024px) {
        --columns: 3;
    }

    @media (min-width: 600px) and (max-width: 1024px) {
        --columns: 2;
    }
}

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
