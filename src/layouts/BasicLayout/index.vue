<script setup >
import { inject, watch, ref, computed } from 'vue';
import useCommon from '@/core/hooks/useCommon'

const { storeGetters } = useCommon('useCartStore')


const countCart = computed(() => {
  const carts = storeGetters();
  return carts.items.value.length;
})

</script>

<template>
  <div class="basic-layout">
    <header>
      <v-toolbar light prominent>
        <v-toolbar-title>
          <RouterLink to="/">
            <v-img :width="150"
              src="https://shopeefood.vn/app/assets/img/shopeefoodvn.png?4aa1a38e8da801f4029b80734905f3f7">
            </v-img>
          </RouterLink>
        </v-toolbar-title>
        <v-btn color="yellow-darken-4" class='text-none'>
          <RouterLink to="/cart">{{ `Cart (${countCart})` }}</RouterLink>
        </v-btn>
      </v-toolbar>
    </header>
    <div class="layout-root">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
