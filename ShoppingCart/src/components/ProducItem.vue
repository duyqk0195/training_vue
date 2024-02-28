
<template>
    <v-container class="pl-0 pr-0">
        <v-row align="center">
            <v-col cols="2" md="2" class="pl-0 pr-0">
                <v-img width="80" height="65" :src="item.thumbnail_url"></v-img>
            </v-col>
            <v-col cols="6" md="6" class="pl-0 pr-0">
                <div class="text-body-1">
                    <p class="font-weight-black">{{ item.name }}</p>
                </div>
                <div class="text-caption">
                    <p class="font-weight-regular">
                        <v-icon size="12" :color="item.rating_average > 0 ? 'yellow-darken-2' : 'grey-lighten-1'">
                            <i class="fas fa-star"></i>
                        </v-icon>
                        <v-icon size="12" :color="item.rating_average > 1 ? 'yellow-darken-2' : 'grey-lighten-1'">
                            <i class="fas fa-star"></i>
                        </v-icon>
                        <v-icon size="12" :color="item.rating_average > 2 ? 'yellow-darken-2' : 'grey-lighten-1'">
                            <i class="fas fa-star"></i>
                        </v-icon>
                        <v-icon size="12" :color="item.rating_average > 3 ? 'yellow-darken-2' : 'grey-lighten-1'">
                            <i class="fas fa-star"></i>
                        </v-icon>
                        <v-icon size="12" :color="item.rating_average > 4 ? 'yellow-darken-2' : 'grey-lighten-1'">
                            <i class="fas fa-star"></i>
                        </v-icon>
                        {{ getQuantitySold }}
                    </p>
                </div>
            </v-col>
            <v-col cols="3" md="3" class="pl-0 pr-0" align-self="start" justify="end">
                <div cols="12" md="12" class="text-subtitle-1" color="amber-darken-4">
                    <p class="text-danger text-center font-weight-bold">{{ getPrice }}</p>
                </div>
                <div cols="12" md="12" class="text-caption text-center text-decoration-line-through">
                    {{ getOriginalPrice }}
                </div>
            </v-col>
            <v-col cols="auto" md="auto" align-self="center" class="pl-0 pr-0">
                <v-btn icon="mdi-open-in-new" size="x-small" @click="onAction(item)">
                    <slot name="iconAction"><i class="fas fa-plus text-danger"></i></slot>
                </v-btn>
            </v-col>
            <v-divider class="border-opacity-100"></v-divider>
        </v-row>
    </v-container>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { formatCurrency } from "@/core/utils/formatter";

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const getQuantitySold = computed(() => {
    if (props.item.quantity_sold) {
        return props.item.quantity_sold.text;
    }
    return "Đã bán 0";
})

const getPrice = computed(() => {
    // return formatCurrency(props.item.price);
    return formatCurrency(props.item.price);
})

const getOriginalPrice = computed(() => {
    if (props.item.price == props.item.original_price) {
        return "";
    }
    return formatCurrency(props.item.original_price);
})

const emit = defineEmits(["on-action",]);

function onAction(item) {
    emit("on-action", item);
}


</script>

<style lang="scss" scoped></style>