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
      <v-layout>
        <v-app-bar color="white">
          <!-- <v-toolbar fixed color="white" elevation="4"> -->
          <RouterLink class="ml-8" to="/">
            <v-img width="80" src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png">
            </v-img>
          </RouterLink>
          <v-spacer></v-spacer>
          <RouterLink to="/cart" class="mr-8">
            <v-btn color="yellow-darken-4" class='text-none' variant="outlined">

              <template v-slot:append>
                <v-icon size="16">
                  <!-- <i class="fas fa-search"></i> -->
                  <i class="fa-solid fa-cart-shopping"></i>
                </v-icon>
              </template>
              {{ countCart }}
            </v-btn>
          </RouterLink>
          <!-- </v-toolbar> -->
        </v-app-bar>
      </v-layout>
    </header>
    <div class="layout-root">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
