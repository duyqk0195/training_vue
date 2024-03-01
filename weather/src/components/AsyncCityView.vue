
<template>
    <div class=" flex flex-col flex-1 items-center">
        <!-- Banner -->
        <div v-if="route.query.preview" class="text-white p-4 bg-secondary w-full text-center">
            <p>You are currently previewing this city, click the "+" icon to add it to your list of cities to track.</p>
        </div>
        <!-- Weather Overview -->
        <div class="flex flex-col items-center text-white py-12">
            <h1 class="text-5xl font-bold">{{ route.params.city }}</h1>
            <p class="text-sm mb-12 pt-2">
                {{
                    new Date(weatherData.currentTime).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'long',
                        day: '2-digit',
                    })
                }}
                {{
                    new Date(weatherData.currentTime).toLocaleTimeString('en-US', {
                        timeStyle: 'short',
                    })
                }}
            </p>
            <p class="text-8xl mb-8">
                {{
                    Math.round((weatherData.current.temp - 32) / 1.8)
                }}
                &degC
            </p>
            <p>
                Feel like: {{
                    Math.round((weatherData.current.feels_like - 32) / 1.8)
                }}&degC
            </p>
            <p class="capitalize">
                {{
                    weatherData.current.weather[0].description
                }}
            </p>
            <img class="w-150 h-auto"
                :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
                :alt="weatherData.current.weather[0].description" />
        </div>
        <hr class="border-white border-opacity-10 border w-full" />
        <!-- Hourly -->
        <div class=" max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class=" mb-4">Hourly Weather</h2>
                <div class="flex gap-10 overflow-x-scroll">
                    <div class="mb-4" v-for="hourData in weatherData.hourly" :key="hourData.dt">
                        <p class="whitespace-nowrap text-md">
                            {{
                                new Date(hourData.currentTime).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                })
                            }}
                        </p>
                        <img class="w-auto h-[50px] object-cover"
                            :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}.png`"
                            :alt="hourData.weather[0].description" />
                        <p class="text-sm">
                            {{
                                Math.round((hourData.temp - 32) / 1.8)
                            }}&degC
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- weekly -->

        <hr class="border-white border-opacity-10 border w-full" />

        <div class="max-w-screen-md w-full py-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">7 Day Forecast</h2>
                <div class="flex items-center" v-for="day in weatherData.daily" :key="day.dt">
                    <p class="flex-1">
                        {{
                            new Date(day.dt * 1000).toLocaleDateString('en-US', {
                                weekday: 'long',
                            })
                        }}</p>
                    <img class="w-[50px] h-[50px] object-cover"
                        :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" />
                    <div class="flex gap-2 flex-1 justify-end">
                        <p>
                            H: {{
                                Math.round((day.temp.max - 32) / 1.8)
                            }}&degC
                        </p>
                        <p>
                            L: {{
                                Math.round((day.temp.min - 32) / 1.8)
                            }}&degC
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();

const getWeatherData = async () => {
    const { city, state } = route.params;
    const { lat, lng } = route.query;
    try {
        const weatherData = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
        );
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = weatherData.data.current.dt * 1000 + localOffset;
        weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

        weatherData.data.hourly.forEach(hour => {
            const utc = hour.dt * 1000 + localOffset;
            hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
        });
        return weatherData.data;
    } catch (error) {

    }
};

const weatherData = await getWeatherData();
</script>

<style lang="scss" scoped></style>