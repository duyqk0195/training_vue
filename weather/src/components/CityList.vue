<template>
    <div v-for="city in savedCities" :key="city.id">
        <CityCard :city="city" @click="goToCityView(city)" />
    </div>
    <p v-if="savedCities.length === 0" class="text-white text-opacity-50 text-2xl text-center mt-10">
        <span>
            No locations added yet.
        </span>
        <span class="block">
            To start tracking a location, search for a city or state in the search bar above.
        </span>
    </p>
</template>

<script setup>
import { ref } from 'vue';
import CityCard from './CityCard.vue';
import axios from 'axios';
import { STORAGE_KEY } from '@/core/constants/storageKeys';
import { useRouter } from 'vue-router';

const router = useRouter();
const savedCities = ref([]);

const getCities = async () => {
    const cities = localStorage.getItem(STORAGE_KEY.CITIES);
    if (cities) {
        savedCities.value = JSON.parse(cities);
        const requests = [];
        savedCities.value.forEach((city) => {

            requests.push(
                axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
                )
            );
        });

        const weatherData = await Promise.all(requests);

        weatherData.forEach((weather, index) => {
            savedCities.value[index].weather = weather.data;
        });
    }
};

await getCities();

function goToCityView(city) {
    router.push({
        name: 'cityView',
        params: {
            state: city.state,
            city: city.city,
        },
        query: {
            id: city.id,
            lat: city.coords.lat,
            lng: city.coords.lng,
            preview: true,
        },
    });
};

</script>

<style lang="scss" scoped></style>