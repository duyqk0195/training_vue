<template>
    <main class="container text-white">
        <div class="pt-4 mb-8 relative">
            <input v-model="searchQuery" @input="getSearchResult" type="text" placeholder="Search for a city or state"
                class="py-2 px-1 w-full bg-transparent border-b
                 focus:border-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]" />
            <ul v-if="mapboxSearchResults"
                class="absolute bg-secondary text-white w-full shadow-md py-2 px-1 top-[66px]">
                <p v-if="searchError">
                    Sorry, we couldn't find any results for your search.
                </p>
                <p v-if="!searchError && mapboxSearchResults.length === 0">
                    No results found for your search.
                </p>
                <template v-else>
                    <li v-for="result in mapboxSearchResults" :key="result.id" class="py-2 cursor-pointer"
                        @click="previewCity(result)">
                        {{ result.place_name }}
                    </li>
                </template>
            </ul>
        </div>
        <div class=" flex flex-col gap-4">
            <Suspense>
                <CityList />

                <template #fallback>
                    <p>Loading...</p>
                </template>
            </Suspense>
        </div>
    </main>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CityList from '@/components/CityList.vue';
import { STORAGE_KEY } from '@/core/constants/storageKeys';

const mapboxAPIKey =
    "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";

const router = useRouter();
const searchQuery = ref('');
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(false);


const getSearchResult = async () => {
    // Clear the timeout
    clearTimeout(queryTimeout.value);
    // Set a new timeout
    queryTimeout.value = setTimeout(async () => {
        // If the search query is not empty
        if (searchQuery.value !== '') {
            // Try to get the search results from the Mapbox API and set the search results or an error message if the search fails
            try {
                // Get the search results from the Mapbox API
                const result = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
                );
                // Set the search results
                mapboxSearchResults.value = result.data.features;
                searchError.value = false;
            } catch (error) {
                searchError.value = true;
            }
            // If the search query is empty, clear the search results
            return;
        }
        // Clear the search results if the search query is empty
        mapboxSearchResults.value = null;
    }, 300);
};

function previewCity(result) {
    const [city, state] = result.place_name.split(', ');
    const _state = state.replaceAll(' ', '');
    router.push({
        name: 'cityView',
        params: { state: _state, city },
        query: {
            lat: result.center[1],
            lng: result.center[0],
            preview: true,
        }
    });
}
</script>
