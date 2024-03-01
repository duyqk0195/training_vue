
<template>
    <v-col>
        <v-row class="mt-8">
        </v-row>
        <v-row class="mt-8">
            <v-spacer></v-spacer>
            <v-col cols="12" md="7">
                <v-card>
                    <v-card-title>
                        <search-bar @on-search="onSearch" :loading="isSearchLoading" />
                    </v-card-title>
                    <v-card-subtitle>
                        <div>Tất cả sản phẩm</div>
                    </v-card-subtitle>
                    <v-card-item>
                        <v-row cols="12" md="12" class="mr-0 ml-0">
                            <produc-item v-for="item in items" @on-action="addToCart" :item="item" />
                        </v-row>
                        <v-row cols="12" md="7">
                            <v-spacer></v-spacer>
                            <v-btn class="mb-5 mt-5" :loading="isLoadMore" color="deep-orange-darken-1" @click="loadMore"
                                dark v-if="isShowLoadMore">
                                Tảithêm
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-row>
                    </v-card-item>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>

    </v-col>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { LocalStorage } from "@/core/utils/storage";
import api from "@/services/axios.service";
import useCommon from '@/core/hooks/useCommon'
import SearchBar from "./SearchBar.vue";

const { storeGetters } = useCommon('useCartStore')

const items = ref([]);
const tmp_items = ref([]);
const page = ref(1);
const isLoadMore = ref(true);
const isShowLoadMore = ref(true);
const isSearchLoading = ref(false);


watch(page, (newVal, oldVal) => {
    getRestaurant(newVal);
})


onMounted(() => {
    getRestaurant(page.value);
})

function addToCart(restaurant) {
    storeGetters().items.value.push(restaurant);
    LocalStorage.set("cart", storeGetters().items.value);
}

function loadMore() {
    isLoadMore.value = true;
    page.value++;
}

function checkLoadMore(paging) {
    if (paging.last_page > paging.current_page) {
        isShowLoadMore.value = true;
    } else {
        isShowLoadMore.value = false;
    }
}

function onSearch(value) {
    isSearchLoading.value = true;
    isShowLoadMore.value = !value;
    filter(value);
    isSearchLoading.value = false;
}


async function getRestaurant(pageValue) {
    const response = await api.get(`/personalish/v1/blocks/listings?limit=40&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=714e6c11-05be-90b0-27e2-1a7d39f02bf3&category=1795&page=${pageValue}&urlKey=dien-thoai-smartphone`);
    tmp_items.value = tmp_items.value.concat(response.data);
    console.log("items", response)
    isLoadMore.value = false;
    filter();
    checkLoadMore(response.paging);

}



function filter(value) {
    if (value) {
        items.value = tmp_items.value.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    } else {
        items.value = tmp_items.value;
    }
}



</script>

<style lang="scss" scoped></style>