"use client";
import { useEffect, useState } from "react";
import Login from "./Login";
import Registration from "./Registration";
import axios from "axios";

const Home = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    axios
      .get("api/admin/login/login")
      .then((res) => {
        setLogin(res.data.login);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return login ? <Login /> : <Registration />;
};

export default Home;
