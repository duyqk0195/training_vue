<template>
    <div class="card" :class="{ 'is-flipped': isOpen }"
        :style="{ width: `${cardSize.width}px`, height: `${cardSize.height}px` }" @click="onFlipCard(item)">
        <div class="card-face card-face-front">
            <img src="@/assets/images/icon_back.png" alt="Card image">
        </div>
        <div class="card-face card-face-back">
            <img :src="getImage" alt="Card image">
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, computed, onUpdated } from 'vue';
// const isFlipped = ref(false);

const emit = defineEmits(['flip-card', 'flip-card-complete']);

// define props
const props = defineProps({
    cardSize: {
        type: Object,
        required: true,
    },
    item: {
        type: Object,
        required: true,
    },
});


// define computed/watched properties
const getImage = computed(() => {
    return `src/assets/images/${props.item.image}.png`;
});

const isOpen = computed(() => {
    return props.item.isOpen || props.item.isMatch;
});

// define function
function onFlipCard(image) {
    emit('flip-card', image);
    // isFlipped.value = !isFlipped.value;
    timeoutFunction(image);
}
let timeoutId = null;
function timeoutFunction(image) {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        emit('flip-card-complete', image);
    }, 600)
}


</script>

<style lang="scss" scoped>
.card {
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.2);
    width: 149px;
    height: 198px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-background);
    margin: 0px;
    will-change: transform;
    transform-style: preserve-3d;
    transition: transform 0.6s;

}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.card>.card-face>img {
    width: 50%;
    height: 0%w;
}

.card.is-flipped {
    transform: rotateY(-180deg);
}

.card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    align-items: center;
    justify-content: center;
    display: flex;
}

.card-face-back {
    transform: rotateY(180deg);
    background: var(--vt-c-text-light-2);
    border-radius: 15px;
}
</style>