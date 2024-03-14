<template>
    <header class="sticky top-0 bg-primary shadow-lg">
        <nav class="container flex flex-col sm:flex-row items-center text-white py-6">
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-sun text-2xl"></i>
                    <p class="text-2xl">The Local Weather</p>
                </div>
            </RouterLink>
            <div class="flex gap-3 flex-1 justify-end">
                <i v-show="isShowAdded"
                    class="fa-solid fa-plus text-xl hover:text-secondary duration-150 cursor-pointer" @click="addCity">
                </i>
                <i class="fa-solid fa-circle-info text-xl hover:text-gray-400 duration-150 cursor-pointer"
                    @click="toggleModal">
                </i>
                <!-- Logout -->
                <i v-show="isShowLogout"
                    class="fa-solid fa-right-from-bracket text-xl hover:text-gray-400 duration-150 cursor-pointer"
                    @click="onLogout" />
            </div>

            <BaseModal :modal-active="modalActive" @close-modal="toggleModal">
                <div class="text-black">
                    <h1 class="text-2xl mb-1">About:</h1>
                    <p class="mb-4">
                        The Local Weather allows you to track the current and
                        future weather of cities of your choosing.
                    </p>
                    <h2 class="text-2xl">How it works:</h2>
                    <ol class="list-decimal list-inside mb-4">
                        <li>
                            Search for your city by entering the name into the
                            search bar.
                        </li>
                        <li>
                            Select a city within the results, this will take
                            you to the current weather for your selection.
                        </li>
                        <li>
                            Track the city by clicking on the "+" icon in the
                            top right. This will save the city to view at a
                            later time on the home page.
                        </li>
                    </ol>

                    <h2 class="text-2xl">Removing a city</h2>
                    <p>
                        If you no longer wish to track a city, simply select
                        the city within the home page. At the bottom of the
                        page, there will be am option to delete the city.
                    </p>
                </div>
            </BaseModal>
        </nav>
    </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { uid } from "uid";
import { STORAGE_KEY } from '@/core/constants/storageKeys';
import authService from "../services/authService";


const modalActive = ref(false);
const savedCities = ref([]);
const route = useRoute();
const router = useRouter();


const isShowAdded = computed(() => {
    return !route.query.id && route.name === 'cityView';
});

const isShowLogout = computed(() => {
    return route.name !== 'loginView';
});

const toggleModal = () => {
    modalActive.value = !modalActive.value;
};

const addCity = () => {

    savedCities.value = JSON.parse(localStorage.getItem(STORAGE_KEY.CITIES)) || [];

    const cityObject = {
        id: uid(),
        state: route.params.state,
        city: route.params.city,
        coords: {
            lat: route.query.lat,
            lng: route.query.lng,
        },
    }

    savedCities.value.push(cityObject);
    localStorage.setItem(STORAGE_KEY.CITIES, JSON.stringify(savedCities.value));

    let query = Object.assign({}, route.query);
    query.id = cityObject.id;
    router.replace({ query });
};

const onLogout = () => {
    authService.logout();
    router.push({ name: 'loginView' });
};

</script>../services/authService