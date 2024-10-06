<template>
  <div class="header">
    <div class="inner container"> 
        <slot></slot>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.header {
  background: var(--gray-light);
  width: 100%;

  .inner {
    text-align: left;
    padding: 6rem 0rem;
    margin: 0 auto;
    
    @media (min-width: 600px) and (max-width: 960px) {
        padding: 7rem 0rem;
    }
    
    @media only screen and (min-width: 960px) {
        padding: 8rem 0rem;
    }
  }
}
</style>