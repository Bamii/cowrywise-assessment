<template>
  <div class="error-container">
    <div class="text">{{ props.text || "Application Error" }}</div>
    <div class="sub-text">Please reload the page.</div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  text: string
}
const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.error-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: tomato;
  color: white;
  padding: 0.5rem 0;
  font-size: 14px;

  .text {
    margin-bottom: 0.2rem;
  }

  .sub-text {
    font-size: 12px;
  }
}
</style>
