import axios from "axios";

//? baseURL
const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//? REQUEST
$axios.interceptors.request.use(
  async (request: any) => {
    request.headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

//? RESPONSE
$axios.interceptors.response.use(
  (res) => res,

  async (error) => {
    if (error.response.status === 401) {
      if (!!localStorage.getItem("refreshToken")) {
        try {
          const res = await $axios.post("/refresh", {
            token: localStorage.getItem("refreshToken"),
          });
          localStorage.setItem("accessToken", res.data.accessToken);

          $axios.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
          error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;

          return await $axios(error.config);
        } catch (err) {
          console.error(err);
        }
      } else {
        localStorage.clear();
        // @ts-ignore
        Window.location = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default $axios;
