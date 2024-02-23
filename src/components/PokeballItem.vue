
<script setup >
import router from '@/router';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    map: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['start-game']);

function startGame(size) {
    console.log('start game', size);
    emit('start-game', size);
}
</script>

<template>
    <div class="hover">
        <div class="pokeball_map__item" @click="startGame(map.size)">
            <span class="size">{{ map.size }}x{{ map.size }}</span>
            <span>{{ map.name }}</span>
        </div>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.pokeball_map__item span {
    display: inline;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.5;
}

.pokeball_map__item .size {
    font-size: 2rem;
}


.pokeball_map__item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 150px;
    height: 150px;
    border-radius: 15px;
    border-width: 1px;
    border-style: solid;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 1rem;
}

.hover {
    transition: background-color 0.5s ease-in-out;
}

.hover :hover {
    background-color: #ee9d9d;
    color: #7e405f;
}
</style>