<script setup>
import PokeballItem from '@/components/PokeballItem.vue'
import GameMap from "@/components/GameMap.vue";
import { computed, watch, ref, onMounted } from 'vue';

const maps = [
    { size: 4, name: 'Easy' },
    { size: 6, name: 'Medium' },
    { size: 8, name: 'Hard' },
    { size: 10, name: 'Super Hard' },
];
function startGame(size) {
    console.log('Select mode to start game', size);
    mapSize.value = size;
}

function closeGame() {
    console.log('Close game');
    mapSize.value = 0;
}

const mapSize = ref(0);

// Listen to the change of mapId to start game
const isStartGame = computed(() => {
    return mapSize.value != 0;
})

</script>
<template>
    <div class="content">
        <div class="pokeball" v-if="!isStartGame">
            <div class="pokeball_header">
                <h1 class="title">POKE MEMORIES</h1>
                <p class="subTitle">Select mode to start game</p>
            </div>
            <div class="pokeball_map">
                <pokeball-item class="map" v-for="map in maps" :map="map" :key="map.size" @start-game="startGame" />
            </div>
        </div>
        <div class="game-map-view" v-if="isStartGame">
            <game-map @close-game="closeGame" :mapSize="mapSize" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './styles.scss';
</style>