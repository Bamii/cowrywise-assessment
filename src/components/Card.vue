<template>
  <div v-if="details" class="block card">
    <img :src="details.urls.small" class="image" alt="" />

    <div class="overlay">
      <div class="details">
        <div class="name">{{ details.user.name }}</div>
        <div class="location">{{ details.user.location || "World" }}</div>
      </div>
    </div>
  </div>

  <div v-else class="block card loader">
    <div class="lines">
      <div class="line long"></div>
      <div class="line mid"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["details", "index"],
};
</script>

<style lang="scss" scoped>
.block {
  cursor: pointer;
  break-inside: avoid;
  /* margin-bottom: 1rem; */
  height: auto;
  min-height: 2rem;
  position: relative;
  border-radius: 0.5rem;
  min-width: 17rem;

  .overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(#0000, #000);
    text-align: left;
    border-radius: 0.5rem;
  }

  .details {
    padding: 1.5rem;
    color: white;

    .name {
      font-size: 1.3rem;
    }

    .location {
      font-size: 0.8rem;
    }
  }

  &.loader {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .lines {
      margin: 1rem;

      .line {
        padding: 0.2rem;
        border-radius: 2rem;
        background: var(--gray-light);
        margin: 0.5rem 0;
        animation: blink 1.2s infinite;

        &.full {
          width: 100%;
        }
        &.long {
          width: 75%;
        }
        &.mid {
          width: 50%;
        }
        &.short {
          width: 25%;
        }
      }

      @keyframes blink {
        0% {
          opacity: 0;
        }
        60% {
          opacity: 1;
        }
        80% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    }
  }
}

img {
  min-height: 3rem;
  height: 100%;
  width: 100%;
  overflow: hidden;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>
