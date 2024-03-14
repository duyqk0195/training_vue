<template>
    <form class="flex flex-col w-full items-center" @submit="submitLogin">
        <p class="text-4xl font-bold text-white">Login</p>
        <p class="text-white">Please enter your account</p>
        <div class="w-1/2 flex flex-row items-center">
            <input v-model="username" name="email" type="text" class="w-full p-4 px-12 my-4 rounded-md"
                placeholder="Username" required>
            </input>
            <i class="absolute fa-solid fa-user text-3xl text-secondary px-2"></i>
        </div>
        <div class="flex flex-col items-start w-1/2">

            <div class="w-full flex flex-row items-center">
                <input v-model="password" name="password" type="password" class="w-full p-4 px-12 my-4 rounded-md"
                    placeholder="Password" required>
                </input>
                <i class="absolute fa-solid fa-key text-3xl text-secondary px-2"></i>
            </div>
            <p class=" text-red-400">{{ message }}</p>
        </div>

        <button type="submit"
            class="w-1/2 p-4 my-4 bg-white opacity-70 text-secondary cursor-pointer hover:bg-secondary hover:text-white duration-1000 rounded-md">
            Login
        </button>
    </form>
</template>

<script setup>
import { ref, defineProps, defineModel, defineEmits } from 'vue';

const props = defineProps({
    message: String,
});

const username = ref('');
const password = ref('');

const emit = defineEmits(['submit-login']);

const submitLogin = (e) => {
    e.preventDefault();
    emit('submit-login', username.value, password.value);
    // emit.//submitLogin(username.value, password.value);
};



</script>

<style lang="scss" scoped></style>