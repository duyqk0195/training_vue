<template>
    <div>
        <div class="flex py-6 px-3 bg-secondary rounded-md shadow-md cursor-pointer ">
            <div class=" flex flex-col flex-1 self-center">
                <h2 class=" text-3xl">
                    {{ city.city }}
                </h2>
                <h3>
                    {{ city.state }}
                </h3>
            </div>
            <div class="flex flex-1 items-center flex-col self-center">
                <img class="w-[50px] h-[50px] object-cover"
                    :src="`http://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`" />
            </div>
            <div class=" flex flex-col gap-2 self-center">
                <p class=" text-3xl self-end">
                    {{ Math.round((city.weather.main.temp - 32) / 1.8) }}&degC
                </p>
                <div class=" flex gap-2">
                    <span class=" text-sm">
                        H: {{ Math.round((city.weather.main.temp_max - 32) / 1.8) }}&degC
                    </span>
                    <span class="text-sm">
                        L: {{ Math.round((city.weather.main.temp_min - 32) / 1.8) }}&degC
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    city: {
        type: Object,
        required: true,
    },
});

</script>

<style lang="scss" scoped></style>