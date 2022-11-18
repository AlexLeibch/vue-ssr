<template >
  <li class="card">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
});
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin: 0.3rem 0;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  background: radial-gradient(#60efbc, #58d5c9);
}
</style>
