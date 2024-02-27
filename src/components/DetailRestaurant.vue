
<template>
    <v-col>
        <v-row class="mt-8">
            <!-- <v-spacer></v-spacer>
            <v-col cols="12" md="5">
                <v-img cover
                    src="https://images.foody.vn/res/g120/1198418/prof/s640x400/foody-upload-api-foody-mobile-im-1274efeb-240205121132.jpeg"></v-img>
            </v-col>
            <v-col cols="12" md="6">
                <div class="text-h5">Trà Sữa Maycha - 23 Nguyễn Văn Cừ</div>
                <div class="text-caption">23 Nguyễn Văn Cừ, Phường 1, Quận 5, TP. Hồ Chí Minh</div>
                <v-icon class="ml-1" color="yellow-darken-2">
                    <i class="fas fa-star"></i>
                </v-icon>
                <v-icon class="ml-1" color="yellow-darken-2">
                    <i class="fas fa-star"></i>
                </v-icon>
                <v-icon class="ml-1" color="yellow-darken-2">
                    <i class="fas fa-star"></i>
                </v-icon>
                <v-icon class="ml-1" color="yellow-darken-2">
                    <i class="fas fa-star"></i>
                </v-icon>
            </v-col>
            <v-spacer></v-spacer> -->
        </v-row>
        <v-row class="mt-8">
            <v-spacer></v-spacer>
            <v-col cols="12" md="7">
                <v-card>
                    <v-card-title>
                        <div class="text-h6">Danh sách tìm kiếm</div>
                    </v-card-title>
                    <v-card-item>
                        <restaurant-item v-for="item in items" @add-to-cart="addToCart" :item="item" />
                    </v-card-item>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row cols="12" md="7">
            <v-spacer></v-spacer>
            <v-btn class="mb-5" :loading="isLoadMore" color="deep-orange-darken-1" @click="loadMore" dark
                v-if="isShowLoadMore">
                Tảithêm
            </v-btn>
            <v-spacer></v-spacer>
        </v-row>
    </v-col>
</template>

<script setup>
import { defineEmits, onMounted, ref, computed, watch } from "vue";
import { LocalStorage } from "@/core/utils/storage";
import api from "@/services/axios.service";
import useCommon from '@/core/hooks/useCommon'

const { storeGetters } = useCommon('useCartStore')

const items = ref([]);
const page = ref(1);
const isLoadMore = ref(true);
const isShowLoadMore = ref(true);


// define computed/watched properties here
const getItems = computed(() => {
    return items.value;
})

watch(page, (newVal, oldVal) => {
    getRestaurant(newVal);
})


onMounted(() => {
    getRestaurant(page.value);
    // loadCartFromLocalStorage();
})

function addToCart(restaurant) {
    storeGetters().items.value.push(restaurant);
    LocalStorage.set("cart", storeGetters().items.value);
}

function loadMore() {
    isLoadMore.value = true;
    page.value++;
}

async function getRestaurant(pageValue) {
    const response = await api.get(`/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=714e6c11-05be-90b0-27e2-1a7d39f02bf3&category=1795&page=${pageValue}&urlKey=dien-thoai-smartphone`);
    items.value = items.value.concat(response.data);
    console.log("items", response)
    isLoadMore.value = false;
    checkLoadMore(response.paging);

}

function checkLoadMore(paging) {
    if (paging.last_page > paging.current_page) {
        isShowLoadMore.value = true;
    } else {
        isShowLoadMore.value = false;
    }
}


</script>

<style lang="scss" scoped></style>