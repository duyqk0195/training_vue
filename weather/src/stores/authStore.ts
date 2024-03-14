import { defineStore } from "pinia";
import { LocalStorage } from "@/stores/storage";
import { STORAGE_KEY } from "@/core/constants/storageKeys";

interface IAuth {
  token: string;
}

const initialState: IAuth = {
  token: LocalStorage.get(STORAGE_KEY.TOKEN) || "",
};

export const authStore = defineStore("auth", {
  state: () => initialState,
  actions: {
    saveToken(token: string) {
      this.token = token;
      LocalStorage.set(STORAGE_KEY.TOKEN, token);
    },
    logout() {
      console.log("logout");
      this.token = "";
      LocalStorage.remove(STORAGE_KEY.TOKEN);
    },
    isAuthenticated() {
      return LocalStorage.get(STORAGE_KEY.TOKEN).length > 0;
    },
  },
});
