import { authStore } from "../stores/authStore";
import api from "./axios.service";
import { md5 } from "js-md5";

const login = async (username: string, password: string) => {
  let md5Password = md5(password);
  const data = JSON.stringify({
    username: username,
    password: md5Password,
  });
  var result = await api.post(
    "https://choc-coffe.onrender.com/api/user/login",
    data
  );
  return result;
};

const logout = () => {
  new Promise((resolve, _) => setTimeout(() => resolve(true), 1000));
  authStore().logout();
  return true;
};

const authServices = {
  login,
  logout,
};

export default authServices;
