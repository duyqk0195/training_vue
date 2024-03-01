
<template>
    <div>
        <Suspense>
            <AsyncCityView />
            <template #fallback>
                <div class="flex w-full pt-10">
                    <p class="text-white text-2xl mx-auto">Loading...</p>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import AsyncCityView from '../components/AsyncCityView.vue';

</script>

<style lang="scss" scoped></style>