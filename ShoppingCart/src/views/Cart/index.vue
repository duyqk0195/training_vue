<script setup>
import { defineEmits, onMounted, ref, computed, watch, inject } from "vue";
import useCommon from '@/core/hooks/useCommon'
import { LocalStorage } from '@/core/utils/storage'

const { storeGetters } = useCommon('useCartStore')
const items = ref([]);

onMounted(() => {
    items.value = storeGetters().items.value;

    console.log("items", items.value);
})

const getItems = computed(() => {
    return items.value;
})

function removeFromCart(item) {

    const index = items.value.findIndex(i => i.id === item.id);
    items.value.splice(index, 1);
    storeGetters().items.value = items.value;
    LocalStorage.set("cart", storeGetters().items.value);
}

</script>

<template>
    <v-col>
        <v-row class="mt-8">
        </v-row>
        <v-row class="mt-8">
            <v-spacer></v-spacer>
            <v-col cols="12" md="7">
                <v-card>
                    <v-card-title v-if="items.length > 0">
                        <div class="text-h6">Giỏ hàng</div>
                    </v-card-title>
                    <v-card-item v-if="items.length > 0">
                        <produc-item v-for="item in items" :item="item" @on-action="removeFromCart">
                            <template #iconAction>
                                <i class="fas fa-trash text-danger"></i>
                            </template>
                        </produc-item>
                    </v-card-item>
                    <v-card-item class="pt-10 pb-5" align="center" v-else>
                        <v-icon size="140">
                            <!-- <i class="fas fa-shopping-cart"></i> -->
                            <i class="fa-solid fa-cart-arrow-down"></i>
                        </v-icon>
                        <div class="text">
                            <p class="mt-10 pb-5 text-h3 font-weight-black">Giỏ hàng trống</p>
                        </div>
                    </v-card-item>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-col>
</template>

<style lang="scss" scoped></style>