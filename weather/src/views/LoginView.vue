<template>
    <div class="flex flex-row flex-1 items-center">
        <LoginForm class=" flex flex-col w-full items-center" :message="message" @submitLogin="onLogin" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import authService from '@/services/authService';
import { useRouter } from 'vue-router';
import validate from '@/core/utils/validation';
import { authStore } from "../stores/authStore";
import LoginForm from '../components/LoginForm.vue';
import useCommon from '@/core/hooks/useCommon'
const { storeGetters } = useCommon('useCommonStore')

const router = useRouter();
const message = ref('');
const authStorage = authStore();

const onLogin = (username, password) => {
    storeGetters().loading.value = true;
    message.value = '';
    validate.account(username, password, (msg) => {
        message.value = msg;
        storeGetters().loading.value = false;
    }, async () => {
        const result = await authService.login(username, password);
        if (result) {
            if (result.status === 200) {
                saveToken(result.data.token);
                router.push({ name: 'home' });
            } else {
                message.value = result.message;
            }
        } else {
            message.value = 'Invalid username or password';
        }
        storeGetters().loading.value = false;
    });
};

function saveToken(token) {
    authStorage.saveToken(token);
}

</script>

<style lang="css" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>
