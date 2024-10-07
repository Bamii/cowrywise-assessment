<template>
  <div class="error-container">
    <div class="text">{{ text || "Application Error" }}</div>
    <div class="sub-text">Please reload the page.</div>
  </div>
</template>

<style lang="scss" scoped>
.error-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: tomatored;
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
