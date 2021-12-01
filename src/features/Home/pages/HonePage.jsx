import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Home from "../components/Home";

function HonePage(props) {
  const login = useSelector((state) => state.login.user);
  const history = useHistory();
  const isLogin = !!login.id;
  const goToChecin = () => {
    history.push("/Checkin");
  };
  if (isLogin) {
    goToChecin();
  }
  return (
    <div>
      <Home />
    </div>
  );
}

export default HonePage;
