<template>
  <div class="loading-container">
    <Card v-for="item in [0, 1, 2]" :key="item" :class="randomClass(item)" />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
const CLASSES = ["one", "two", "three"];

export default {
  name: "LoadingList",
  components: { Card },
  methods: {
    randomClass(item) {
      return CLASSES[item];
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-container {
  width: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 2rem;
  position: relative;
  top: -3rem;

  @media (min-width: 600px) {
    flex-direction: row;
  }

  @media (min-width: 600px) and (max-width: 960px) {
    margin: 0 7rem;
  }

  @media only screen and (min-width: 960px) {
    width: 70%;
    margin: 0 13.5rem;
  }
}
.card {
  width: 100%;
  flex: 1;
  background: var(--gray-lighter);
  margin: 0 2rem 2rem 0;

  &.one {
    height: 9rem;
  }

  &.two {
    height: 15rem;
  }

  &.three {
    height: 12rem;
  }

  @media (min-width: 600px) and (max-width: 960px) {
    width: auto;
  }
}
</style>
