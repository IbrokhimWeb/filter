import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $axios from "../../../axios";
import { LoginPostType } from "../../../static/types";

const Login = () => {
  const navigate = useNavigate();

  const [data] = useState<LoginPostType>({
    email: "ibrokhim@ibrokhim.ibrokhim",
    password: "ibrokhimibrokhim",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await $axios.post(`/login/`, data);
        localStorage.setItem("accessToken", res?.data?.access);
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    })();
  });

  return <></>;
};

export default Login;
