
<template>
    <v-card-text>
        <v-text-field v-model="inputValue" :loading="loading" density="compact" variant="solo" label="Search..." single-line
            hide-details>
            <template v-slot:append-inner>
                <v-icon size="16" @click="onSearch">
                    <i class="fas fa-search"></i>
                </v-icon>
            </template>
        </v-text-field>
    </v-card-text>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from "vue";

const emits = defineEmits(["on-search"]);
const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
});

const inputValue = ref("");
watch(inputValue, (newVal, oldVal) => {
    emits("on-search", newVal);
})

function onSearch() {
    if (props.loading) return;
    emits("on-search", inputValue.value);
}

</script>

<style lang="scss" scoped></style>