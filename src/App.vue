<script setup lang="ts">
import { RouterView } from 'vue-router'
import Loading from '@/components/Loading/index.vue'
import { computed, onBeforeMount, onActivated } from 'vue'
import useCommon from './core/hooks/useCommon'
import { LocalStorage } from '@/core/utils/storage'

/**
 * Page: Root page
 */
const { storeGetters } = useCommon('useCommonStore')
const isLoading = computed(() => {
  const { loading } = storeGetters()

  return loading.value
})

onBeforeMount(() => {
  loadCartFromLocalStorage();
})
function loadCartFromLocalStorage() {
  const cart = LocalStorage.get("cart");
  if (cart) {
    useCommon('useCartStore').storeGetters().items.value = cart;
  }
}
</script>

<template>
  <RouterView />
  <Loading :is-loading="isLoading" />
</template>
