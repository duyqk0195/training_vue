
<script setup>
import { ref, defineProps, defineEmits, onMounted, computed, watch, onBeforeMount } from 'vue';
import CardItem from '@/components/CardItem.vue';

const emit = defineEmits(['close-game']);
const height = ref(0);
const width = ref(0);
// use to set/get the value of the ref element from `the template
const gameContentDiv = ref(null);

const gameMap = ref([]);

// define the props
const props = defineProps({
    mapSize: {
        type: Number,
    },
});

// define the computed/watched properties
const onResize = computed(() => {
    return calculateCardSize();
})

// circular dependency
// onBeforeMount(() => {
// })

onMounted(() => {
    console.log('Mounted');
    width.value = gameContentDiv.value.offsetWidth;
    height.value = gameContentDiv.value.offsetHeight;
    genMap();
})

// define function 
function closeGame() {
    console.log('Close game');
    emit('close-game');
}

function genMap() {
    const maps = [];
    const tmpMaps = [];
    const size = props.mapSize;
    const length = (size * size) / 2;
    const numbers = Array.from({ length: length }, (_, i) => i + 1).concat(Array.from({ length: length }, (_, i) => i + 1));
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);

    for (let i = 0; i < size; i++) {
        maps[i] = [];
        tmpMaps[i] = [];
        for (let j = 0; j < size; j++) {
            const img = shuffledNumbers[i * size + j];
            tmpMaps[i][j] = shuffledNumbers[i * size + j];
            maps[i][j] = {
                image: img,
                isOpen: false,
                isMatch: false,
            }
        }
    }
    gameMap.value = maps;
    console.log(tmpMaps);
}

function calculateCardSize() {
    let widthDiv = width.value;
    let heightDiv = height.value;
    const min = Math.min(widthDiv, heightDiv);
    const wCard = (min) / props.mapSize;
    const hCard = wCard * 1.5;
    console.log(`Width: ${width}, Height: ${min}  ${hCard} ${wCard}`);
    const size = { width: min, height: min, cardWith: wCard * 0.9, cardHeight: wCard * 0.9 };
    return size;
}
const itemFirst = ref(null);
function onFlipCard(itemSelected) {
    const indexSelected = getIndexOf(itemSelected);
    itemSelected.isOpen = true;
    gameMap.value[indexSelected[0]][indexSelected[1]] = itemSelected;
}

function onFlipCardComplete(itemSelected) {
    if (itemFirst.value === null) {
        itemFirst.value = itemSelected;
    } else {
        const indexSelected = getIndexOf(itemSelected);
        const indexFirst = getIndexOf(itemFirst.value);
        if (indexSelected[0] === indexFirst[0] && indexSelected[1] === indexFirst[1])
            return;

        if (itemFirst.value.image === itemSelected.image) {
            itemFirst.value.isMatch = true;
            itemSelected.isMatch = true;
        } else {
            itemFirst.value.isOpen = false;
            itemSelected.isOpen = false;
        }
        console.log(indexFirst);
        gameMap.value[indexFirst[0]][indexFirst[1]] = itemFirst.value;
        gameMap.value[indexSelected[0]][indexSelected[1]] = itemSelected;
        itemFirst.value = null;
    }
}

function getIndexOf(item) {
    let index = [-1, -1];
    const target = item;
    const array = gameMap.value;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === target) {
                index = [i, j];
                break;
            }
        }
        if (index[0] !== -1) break;
    }
    return index;
}

</script>

<template>
    <div class="game-map">
        <div class="header close-game">
            <p> You Playing The Map: {{ `${mapSize}x${mapSize}` }}</p>
            <i class="fa-solid fa-xmark" @click="closeGame"></i>
        </div>
        <div class="game-content" ref="gameContentDiv">
            <div class="test" :style="{ width: `${onResize.width}px`, height: `${onResize.height}px` }">
                <div class="col-map" v-for="items in gameMap">
                    <card-item v-for="item in items" :cardSize="{ width: onResize.cardWith, height: onResize.cardHeight }"
                        :item="item" @flip-card="onFlipCard" @flip-card-complete="onFlipCardComplete" />
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.game-map {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 20px;
}

.close-game {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 10px;

}

.header>i {
    font-size: 2rem;
    align-items: center;
    margin: 0;
}

.header>p {
    font-size: 2rem;
    align-items: center;
    margin: 0;
}

.game-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 60px;
}

.col-map {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-evenly;
}

.test {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
}
</style>