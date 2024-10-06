
<template>
  <div class="">
    <Header>
      <slot></slot>
    </Header>
    
    <ErrorContainer v-if="error && (!props.list || props.list.length == 0)" :text="error" />
    <CardList :loading="props.loading" :items="props.list" />
  </div>
</template>

<script setup lang="ts">
import ErrorContainer from "@/components/Error.vue";
import Header from "@/components/Header.vue";
import CardList from "@/components/CardList.vue";
import { type ResponseData } from "@/types"

type Props = {
  list: ResponseData[] | null,
  error: String | null,
  loading: Boolean,
}
const props = defineProps<Props>()
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