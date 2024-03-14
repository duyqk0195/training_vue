<script setup lang="ts">
import { RouterView } from 'vue-router';
import SiteNavigation from './components/SiteNavigation.vue'
import { computed, ref, watch } from 'vue'
import LoadingView from '@/components/LoadingView.vue'
import useCommon from './core/hooks/useCommon'
const { storeGetters } = useCommon('useCommonStore')

const { loading } = storeGetters()

const isLoading = computed(() => {
  return loading.value
})

</script>

<template>
  <div class="flex flex-col min-h-screen font-sans bg-primary">
    <SiteNavigation />
    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" mode="out-in" />
      </Transition>
    </RouterView>
    <footer class="sticky top-0 bg-primary shadow-lg py-8">
      <div class="flex items-center text-white flex-col">
        <p>&copy; 2024 Weather App</p>
      </div>
    </footer>
  </div>
  <LoadingView v-if="isLoading" :isLoading="isLoading" />
</template>

<style>
.page-enter-active {
  transition: 600ms ease all;
}

.page-enter-from {
  opacity: 0;
}
</style>
