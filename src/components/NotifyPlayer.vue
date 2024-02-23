<template>
    <div class="sp-container">
        <div class="sp-content">
            <h2 class="frame-4">{{ message }}</h2>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    message: {
        type: String,
        default: 'You Win',
    },
});
</script>
<style lang="scss" scoped>
.sp-content {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    z-index: 1000;
}

.sp-container h2 {
    position: absolute;
    top: 50%;
    line-height: 100px;
    height: 90px;
    margin-top: -50px;
    font-size: 90px;
    width: 100%;
    text-align: center;
    color: transparent;
    -webkit-animation: blurFadeInOut 3s ease-in backwards;
    -moz-animation: blurFadeInOut 3s ease-in backwards;
    -ms-animation: blurFadeInOut 3s ease-in backwards;
    animation: blurFadeInOut 3s ease-in backwards;
}

.sp-container h2.frame-4 {
    font-size: 200px;
}

@-webkit-keyframes blurFadeInOut {
    0% {
        opacity: 0;
        text-shadow: 0px 0px 40px var(--vt-c-text-light-1);
        -webkit-transform: scale(1.3);
    }

    20%,
    75% {
        opacity: 1;
        text-shadow: 0px 0px 1px var(--vt-c-text-light-1);
        -webkit-transform: scale(1);
    }

    100% {
        opacity: 0;
        text-shadow: 0px 0px 50px var(--vt-c-text-light-1);
        -webkit-transform: scale(0);
    }
}

@-moz-keyframes blurFadeInOut {
    0% {
        opacity: 0;
        text-shadow: 0px 0px 40px var(--vt-c-text-light-1);
        -moz-transform: scale(1.3);
    }

    20%,
    75% {
        opacity: 1;
        text-shadow: 0px 0px 1px var(--vt-c-text-light-1);
        -moz-transform: scale(1);
    }

    100% {
        opacity: 0;
        text-shadow: 0px 0px 50px var(--vt-c-text-light-1);
        -moz-transform: scale(0);
    }
}

/**/

@keyframes blurFadeInOut {
    0% {
        opacity: 0;
        text-shadow: 0px 0px 40px var(--vt-c-text-light-1);
        transform: scale(1.3);
    }

    20%,
    75% {
        opacity: 1;
        text-shadow: 0px 0px 1px var(--vt-c-text-light-1);
        transform: scale(1);
    }

    100% {
        opacity: 0;
        text-shadow: 0px 0px 50px var(--vt-c-text-light-1);
        transform: scale(0);
    }
}
</style>