<script setup>
import { defineEmits, onMounted, ref, computed, watch, inject } from "vue";
import useCommon from '@/core/hooks/useCommon'

const { storeGetters } = useCommon('useCartStore')
const items = ref([]);

onMounted(() => {
    items.value = storeGetters().items.value;

    console.log("items", items.value);
})

const getItems = computed(() => {
    return items.value;
})

</script>

<template>
    <v-col>
        <v-row class="mt-8">
        </v-row>
        <v-row class="mt-8">
            <v-spacer></v-spacer>
            <v-col cols="12" md="7">
                <v-card>
                    <v-card-title>
                        <div class="text-h6">Giỏ hàng</div>
                    </v-card-title>
                    <v-card-item>
                        <restaurant-item v-for="item in items" :item="item" :isShowAdd="false" />
                    </v-card-item>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-col>
</template>

<style lang="scss" scoped></style>