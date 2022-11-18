<template>
  <div class="group">
    <input class="input" name="style1" type="text" required v-model="text" />
    <label for="style1" class="label">
      Поиск
    </label>
  </div>
  <ul class="container">
    <hello-world v-for="item in store.storeData">
      <img v-if="item.icon" class="card__icon" :src="item.icon">
      <p class="card__text" style="{color: 'black'}">{{ item.display_name }}</p>
    </hello-world>
  </ul>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { useStore } from '@/stores/search';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const store = useStore()
    const text = ref('')
    watch(text, async (newText) => {
      store.fetchData(newText)
    })

    return {
      text,
      store
    }
  }
});
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: flex;
  flex-direction: column;
  width: calc(100% - 150px);
  margin: 0;
  padding: 0;

  .card__icon {
    width: 20px;
    height: 20px;
    padding: 10px;
  }
}

.group {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  .label {
    margin-top: 12px;
    margin-left: 8px;
    position: absolute;
    transition: all 1s ease;
    pointer-events: none;
  }

  .input {
    width: 350px;
    height: 40px;
    background-color: transparent;
    border: solid 1px black;
    border-radius: 5px;
    outline: none;
    font-size: 15px;

    &:focus~label,
    &:valid~label {
      margin-top: -10px;
      padding: 0 2px;
      background-color: white;
      transition: all 1s ease;
    }
  }
}
</style>
