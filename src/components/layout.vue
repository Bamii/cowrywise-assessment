
<template>
  <div class="">
    <ErrorContainer v-if="error" :text="error" />

    <Header>
      <slot></slot>
    </Header>

    <CardList :loading="props.loading" :items="props.list" />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import ErrorContainer from "@/components/Error.vue";
// @ts-ignore
import Header from "@/components/Header.vue";
// @ts-ignore
import CardList from "@/components/CardList.vue";
import { type ResponseData } from "@/types"

type Props = {
  list: ResponseData[] | null,
  error: string | null,
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
