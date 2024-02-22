
<script setup>
import { ref, defineProps, defineEmits, onMounted, computed } from 'vue';
import CardItem from '@/components/CardItem.vue';

const emit = defineEmits(['close-game']);
const height = ref(0);
const width = ref(0);
// use to set/get the value of the ref element from `the template
const gameContentDiv = ref(null);
const cardSize = ref({ width: 0, height: 0, cardWith: 0, cardHeight: 0 });

const props = defineProps({
    mapSize: {
        type: Number,
    },
});

function closeGame() {
    console.log('Close game');
    emit('close-game');
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

const onResize = computed(() => {
    return calculateCardSize();
})

onMounted(() => {
    // calculateCardSize();
    width.value = gameContentDiv.value.offsetWidth;
    height.value = gameContentDiv.value.offsetHeight;
})

</script>

<template>
    <div class="game-map">
        <div class="header close-game">
            <p> You Playing The Map: {{ `${mapSize}x${mapSize}` }}</p>
            <i class="fa-solid fa-xmark" @click="closeGame"></i>
        </div>
        <div class="game-content" ref="gameContentDiv">
            <div class="test" :style="{ width: `${onResize.width}px`, height: `${onResize.height}px` }">
                <div class="col-map" v-for="i in mapSize">
                    <card-item v-for="i in mapSize" :cardSize="{ width: onResize.cardWith, height: onResize.cardHeight }" />
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
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
}

.test {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
}
</style>