
<script setup>
import { ref, defineProps, defineEmits, onMounted, computed, watch, onBeforeMount } from 'vue';
import CardItem from '@/components/CardItem.vue';
import NotifyPlayer from '@/components/NotifyPlayer.vue';


const emit = defineEmits(['close-game']);
const height = ref(0);
const width = ref(0);
// use to set/get the value of the ref element from `the template
const gameContentDiv = ref(null);
const gameMap = ref([]);
const isNotify = ref(false);
const message = ref('You Win');
const valueProgress = ref(10);
const maxProgress = ref(100);
const valueLevel = ref(1);
const colorProgress = ref('#b9660ccc');

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

const progressValue = computed(() => {
    return valueProgress.value;
})


watch(valueProgress, (value) => {
    if (value === 0) {
        isNotify.value = true;
        message.value = 'Game Over';
        timeoutFunction(false);
        return;
    }
    const valuePercent = value / maxProgress.value * 100;
    colorProgress.value = valuePercent > 60 ? '#0f562fcc' : valuePercent > 40 ? '#4f560fcc' : '#56200fcc';
    countDownTimer()
    console.log('Timeout game', valueProgress.value, maxProgress.value);
})
watch(gameMap, (value) => {
    maxProgress.value = props.mapSize * props.mapSize * 3;
    valueProgress.value = maxProgress.value;
})

// lifecycle hook
onMounted(() => {
    console.log('Mounted');
    width.value = gameContentDiv.value.offsetWidth;
    height.value = gameContentDiv.value.offsetHeight;
    resetGame();
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
        checkWin();
    }
}
let timeoutId = null;
function timeoutFunction(isLevelUp) {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        if (isLevelUp) {
            resetGame(isLevelUp);
        }
        else {
            closeGame();
        }
    }, 3000)
}

let timeoutGameId = null;
function countDownTimer() {
    if (timeoutGameId) {
        clearTimeout(timeoutGameId);
    }
    timeoutGameId = setTimeout(() => {
        valueProgress.value = valueProgress.value - 1;
    }, 1000)
}

function checkWin() {
    let isWin = true;
    gameMap.value.forEach((row) => {
        row.forEach((item) => {
            if (!item.isMatch) {
                isWin = false;
            }
        })
    })
    if (isWin) {
        isNotify.value = true;
        message.value = 'You Win';
        clearTimeout(timeoutGameId);
        timeoutFunction(true);
    }
}

function resetGame(isLevelUp = false) {
    if (isLevelUp) {
        valueLevel.value = valueLevel.value + 1;
    } else {
        valueLevel.value = 1;
    }
    genMap();
    isNotify.value = false;
    valueProgress.value = 100;
    clearTimeout(timeoutId);
    clearTimeout(timeoutGameId);
    countDownTimer();
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
        <div class="header">
            <div class="close-game">
                <i class="fa-solid fa-xmark" @click="closeGame"></i>
                <p> You Playing Map {{ `${mapSize}x${mapSize}` }} - Level {{ valueLevel }}</p>
            </div>
            <div class="progress-game" :style="{ width: `${onResize.width}px` }">
                <progress :value="progressValue" :max="maxProgress" :color="'red'"></progress>
                <p>{{ progressValue }}s</p>
            </div>

        </div>
        <div class=" game-content" ref="gameContentDiv">
            <div class="test" :style="{ width: `${onResize.width}px`, height: `${onResize.height}px` }">
                <div class="col-map" v-for="items in gameMap">
                    <card-item v-for="item in items" :cardSize="{ width: onResize.cardWith, height: onResize.cardHeight }"
                        :item="item" @flip-card="onFlipCard" @flip-card-complete="onFlipCardComplete" />
                </div>
            </div>
        </div>
        <notify-player v-if="isNotify" :message="message" />
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

.header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 10px;

}

.close-game {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    flex: 1;
}

.close-game>i {
    font-size: 2rem;
    align-items: center;
    margin: 0;
}

.close-game>p {
    font-size: 2rem;
    align-items: center;
    margin: 0;
    margin-left: 2rem;
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



.progress-game {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    height: 100%;
    width: 100%;
    flex: 1;
}

.progress-game>p {
    font-size: 2rem;
    margin: 0;
    padding: 0 10px;
    width: 10%;
}

progress {
    border-radius: 7px;
    width: 30%;
    height: 100%;
    box-shadow: 1px 1px 4px rgba(159, 231, 17, 0.2);
    width: 25%;
}

progress::-webkit-progress-bar {
    background-color: var(--vt-c-text-light-2);
    border-radius: 8px;
}

progress::-webkit-progress-value {
    background-color: v-bind(colorProgress);
    border-radius: 8px;
    box-shadow: 1px 1px 5px #56200fcc;
}
</style>