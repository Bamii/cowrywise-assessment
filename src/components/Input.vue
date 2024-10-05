<template>
  <div class="input-group">
    <SearchIcon class="search-icon" />
    <input
      @input="$emit('update:value', $event.target.value)"
      :value="value"
      class="search-input"
      type="text"
      placeholder="Search for photo"
    />
    <button
      @click.prevent="submitter"
      v-show="text.length > 0"
      class="search-submit"
      type="submit"
    >
      lets go!
    </button>
  </div>
</template>

<script>
import SearchIcon from "@/components/SearchIcon.vue";

export default {
  name: "Input",
  components: { SearchIcon },
  props: ["value", "submitter", "text"],
  emits: ["update:value"],
};
</script>

<style lang="scss" scoped>
.input-group {
  width: 100%;
  display: flex;
  background: white;
  border-radius: 0.8rem;
  align-items: center;
  padding: 0 1rem 0 1rem;
  color: var(--blue-dark);
  box-sizing: border-box;
  /* box-shadow:  */

  .search-input {
    width: 100%;
    margin: 0.6rem 0.5rem 0.6rem 0.5rem;
    border: 0;
    font-size: clamp(14px, 18px,1rem);
    padding: 0.5rem;
    color: var(--blue-dark);

    &:focus {
      outline: dotted var(--gray-dark);
    }
  }

  .search-submit {
    padding: 0.5rem 1rem;
    min-width: max-content;
    background: white;
    color: var(--blue-dark);
    border: 0;
    border-radius: 0.7rem;
    cursor: pointer;
    font-size: 1.2rem;

    &:hover {
      border: 2px solid var(--blue-dark);
      background: whitesmoke;
      color: var(--blue-dark);
    }
  }

  @media (min-width: 600px) {
    padding-left: 2rem;

    .search-input {
      margin: 1rem 1.5rem 1rem 1.5rem;
    }

    .search-submit {
      padding: 0.8rem 2rem;
    }
  }
}
</style>
