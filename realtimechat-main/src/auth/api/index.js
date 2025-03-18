import axios from "axios";
import { TOKEN_KEY } from "../utils/constants";

const AUTH_API = `${import.meta.env.VITE_API_URL}/api/auth`;

export const registerApi = (userData) =>
  axios
    .post(AUTH_API + "/register", userData)
    .then(({ data }) => {
      if (data.status === "success") {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem("userId", data.result.id);
        localStorage.setItem("user", JSON.stringify(data.result));
        return data.result;
      }
      return null;
    })
    .catch(() => null);

export const loginApi = async (credentials) =>
  axios
    .post(AUTH_API + "/login", credentials)
    .then(({ data }) => {
      console.log("login api-----", data);
      if (data.status === "success") {
        console.log(data.token);
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem("userId", data.result.id);
        localStorage.setItem("user", JSON.stringify(data.result));
        return data.result;
      }
      return null;
    })
    .catch(() => null);

export const checkTokenApi = (token) =>
  axios
    .get(AUTH_API + "/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      if (data.status === "success") {
        return data.result;
      }
      return null;
    })
    .catch(() => null);
