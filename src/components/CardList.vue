<template>
  <div class="list-container">
    <div v-if="props.items" class="columns-container">
      <div class="column" v-for="column in shared_columns" v-bind:key="column">
        <Card
          v-for="(item, index) in column"
          :key="item.id"
          :index="index"
          :details="item"
          @click="() => openPhoto(item)"
        />

        <Card v-if="loading" />
      </div>
    </div>
  </div>

  <teleport to="body">
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
  </teleport>
</template>

<script setup lanng="ts">
import Card from "@/components/Card.vue";
import { reactive, onMounted, computed } from "vue"

const props = defineProps({
  items: Array,
  loading: Boolean
})

const state = reactive({
  columns: parseInt(getComputedStyle(document.body).getPropertyValue('--columns')),
  selected: null,
  modal_open: false
})

onMounted(() => {
  addEventListener("resize", resizer)
})

function resizer () {
 state.columns = parseInt(getComputedStyle(document.body).getPropertyValue('--columns'))
}

const shared_columns = computed(() => [...new Array(state.columns)]
    .map((_,index) => props.items
        .filter((e, i) => i % state.columns == index)))
  
function openPhoto(details) {
  this.selectedPhoto = details;
  this.modalOpen = true;
}
</script>

<style lang="scss" scoped>
.list-container {
  width: auto;
  position: relative;
  top: -3rem;

  --columns: 1;
  .columns-container {
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 12px;
    margin: 0 2rem;

    .column {
      display: flex;
      flex-direction: column;
      margin-right: 2rem;
      gap: 2rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  @media only screen and (min-width: 960px) {
      --columns: 3;
    
    .columns-container {
      margin: 0 13.5rem;
    }
  }

  @media (min-width: 600px) and (max-width: 960px) {
      --columns: 2;
    .columns-container {
      margin: 0 7rem;
    }
  }
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
