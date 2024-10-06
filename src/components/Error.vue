<script></script>

<template>
  <div class="error-container">
    <div class="text">{{ text || "Application Error" }}</div>
    <div class="sub-text">Please try again later.</div>
  </div>
</template>

<style lang="scss" scoped>
.error-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;

  .text {
    font-size: 2rem;
    margin-bottom: 0.4rem;
  }

  .sub-text {
    font-size: 1.4rem;
  }
}
</style>
