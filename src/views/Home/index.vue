<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
import DetailRestaurant from '@/components/DetailRestaurant.vue';
import { provide, ref } from "vue";

// const carts = ref([]);
</script>

<template>
  <main>
    <detail-restaurant />
  </main>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
