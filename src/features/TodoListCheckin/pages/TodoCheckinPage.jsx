import UserApi from "api/apiUser";
import { dataFormat } from "components/from-controls/FromatData/FromatData";
import SelectDate from "components/SelectDate";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoList from "../components/TodoList";
import * as moment from 'moment'
import "./styles.scss";
function TodoCheckinPage(props) {
  const dateNow = moment().toISOString()
  const dateOld = moment().subtract(1,'months').toISOString()
  const [checkin, setCheckin] = useState([]);
  const [update, setUpdate] = useState([dateOld, dateNow]);
  const id = useSelector((state) => state.login.user.id);
  const getdate = (date) => {
    if (!date) return;
    const dateNew = [
      moment(date[0]).toISOString(),
      moment(date[1]).toISOString()
    ];
    setUpdate(dateNew);
  };
  useEffect(() => {
    (async () => {
      const res = await UserApi.getById(id, update[0], update[1]);
      if (res.data["err"] === "Id nhân viên không đúng") return;
      dataFormat(res.data);
      setCheckin(dataFormat(res.data));
    })();
  }, [update]);
  return (
    <div>
      <div className="container">
        <div className="col-md-12 image-logo">
          <img
            src="https://dth.com.vn/img/core-img/logo.png"
            className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
            alt=""
          ></img>
        </div>
        <SelectDate getdate={getdate} date={update}/>
        <TodoList datacheckin={checkin}/>
      </div>
    </div>
  );
}

export default TodoCheckinPage;
