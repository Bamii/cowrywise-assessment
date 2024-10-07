<template>
  <div @click="modalOpen = true" v-if="props.details" :class="`block card ` + cls">
    <img :src="props.details.urls?.thumb" class="image" alt="" />

    <div class="overlay">
      <div class="details">
        <div class="name">{{ props.details.user?.name }}</div>
        <div class="location">{{ props.details.user?.location || "World" }}</div>
      </div>
    </div>
  </div>

  <div v-else :class="`block card loader ` + cls">
    <div class="lines">
      <div class="line long"></div>
      <div class="line mid"></div>
    </div>
  </div>
  
  <teleport to="body">
    <Transition>
    <div v-if="modalOpen" class="modal-mask">
      <div class="modal">
        <div @click="modalOpen = false" class="modal-close">X</div>
        <div class="image-container">
          <img :src="selectedPhoto?.urls.regular" alt="" />
        </div>
        <div class="details">
          <div class="detail name">{{ selectedPhoto?.user.name }}</div>
          <div class="detail location">{{ selectedPhoto?.user.location }}</div>
        </div>
      </div>
    </div>
    </Transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { type ResponseData } from "@/types"

type Props = {
  details?: ResponseData,
  cls?: string
}
const props = defineProps<Props>()
const modalOpen = ref(false)
const selectedPhoto = props.details as ResponseData;
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.block {
  cursor: pointer;
  break-inside: avoid;
  height: auto;
  min-height: 6rem;
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
    background: #f5f5f5;
    
    &.tall { height: 20rem }
    &.mid { height: 14rem }
    &.short { height: 9rem }

    .lines {
      margin: 1rem;

      .line {
        padding: 0.2rem;
        border-radius: 2rem;
        background: var(--gray-light);
        margin: 0.5rem 0;
        animation: blink 1.2s infinite;

        &.full { width: 100% }
        &.long { width: 75% }
        &.mid { width: 50% }
        &.short { width: 25% }
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

.modal-mask {
  position: fixed;
  width: 100vw;
  top: 0;
  height: 100vh;
  overflow-y: scroll;
  background: var(--opaque-black);

  .modal {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 90%;
    margin: 6rem auto;
    border-radius: 1rem;

    .modal-close {
      position: absolute;
      top: -3.5rem;
      width: max-content;
      right: 0rem;
      color: white;
      padding: 0.8rem;
      border-radius: 0.4rem;
      cursor: pointer;

      &:hover {
        background: white;
        color: var(--blue-dark);
      }
    }

    .image-container {
      width: 100%;
      min-height: 5rem;
      background: white;
      border-radius: 1rem 1rem 0 0;

      img {
        width: 100%;
        border-radius: 1rem 1rem 0 0;
      }
    }

    .details {
      background: white;
      padding: 2rem;
      border-radius: 0 0 1rem 1rem;

      .detail {
        padding: 0.2rem 0;
        color: var(--blue-dark);

        &.name {
          font-size: 1.7rem;
        }

        &.location {
          font-size: 1rem;
          font-weight: 300;
        }
      }
    }
  }

  @media only screen and (min-width: 960px) {
    .modal {
      width: 70%;
      margin: 7rem auto;

      .modal-close {
        right: -5rem;
      }
    }
  }
}
</style>
