import apiAdmin from "api/apiAdmin";
import { ExportCSV } from "components/ExportExcel";
import {
  dataFormat,
  dataFormatEx,
} from "components/from-controls/FromatData/FromatData";
import SelectDate from "components/SelectDate";
import SelectOption from "components/SelectOption";
import TodoList from "features/TodoListCheckin/components/TodoList";
import * as moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
function AdminListPage(props) {
  const history = useHistory();
  const headerCheckLoginAdmin = useSelector((state) => state.loginadmin.admin);
  const isLogin = !!headerCheckLoginAdmin.username;
  if (!isLogin) history.push(`/Admin`);
  const dateNow = moment().startOf("day").toLocaleString();
  const dateOld = moment()
    .startOf("day")
    .subtract(1, "months")
    .toLocaleString();
  const [checkin, setCheckin] = useState([]);
  const [checkinHistory, setCheckinHistory] = useState([]);
  const [checkinAllLocal, setCheckinAllLocal] = useState([]);
  const [update, setUpdate] = useState([dateOld, dateNow]);
  const [updateNv, setUpdateNV] = useState();
  const [nhanvien, setNhanvien] = useState([]);
  const [vanphong, setVanPhong] = useState([]);
  const [vanphongChange, setVanPhongChange] = useState();
  const getdate = (date) => {
    if (!date) return;
    const dateNew = [moment(date[0]), moment(date[1])];
    setUpdate(dateNew);
  };
  // lay list van phong
  useEffect(() => {
    (async () => {
      const res = await apiAdmin.getListVanPhong();
      setVanPhong(res.data.data);
      setCheckin([]);
      setCheckinAllLocal([]);
    })();
  }, []);
  const handleChangeVanPhong = (data) => {
    setVanPhongChange(data);
  };
  // lay list cham cong by id end Local
  useEffect(() => {
    (async () => {
      if (typeof vanphongChange != "undefined") {
        if (typeof updateNv != "undefined") {
          const res = await apiAdmin.getall(
            updateNv,
            update[0],
            update[1],
            vanphongChange
          );
          if (res.data["err"] === "Id nh??n vi??n kh??ng ????ng") {
            setCheckin([]);
            return;
          }
          setCheckinHistory(res.data);
          setCheckin(dataFormat(res.data));
        }
        if (typeof updateNv === "undefined") {
          setCheckin([]);
          // setCheckinAllLocal([]);
        }
      }
    })();
  }, [update, updateNv, nhanvien]);
  // lay list cham cong by local
  useEffect(() => {
    (async () => {
      if (typeof vanphongChange != "undefined") {
        const res = await apiAdmin.getall(
          "null",
          update[0],
          update[1],
          vanphongChange
        );
        if (res.data["err"] === "Id nh??n vi??n kh??ng ????ng") return;
        // console.log(dataFormatEx(res.data));
        await setCheckinAllLocal(dataFormat(res.data));
      }
    })();
  }, [vanphongChange, update]);
  const handleChange = (data) => {
    setUpdateNV(data);
  };
  // lay danh sach nhan vien trong van phong
  useEffect(() => {
    (async () => {
      if (typeof vanphongChange != "undefined") {
        const res = await apiAdmin.getIDandUser(vanphongChange);
        if (res.data.user.length > 0) {
          setNhanvien([]);
          setNhanvien(res.data.user);
        }
        if (res.data.user.length === 0) {
          setTimeout(() => {
            setCheckin([]);
          }, 100);
          setNhanvien([]);
        }
      }
    })();
  }, [vanphongChange]);
  return (
    <div>
      <div className="container-fuild xxx">
        <div className="row">
          <div className="col-md-12 image-logo">
            <img
              src="https://dth.com.vn/img/core-img/logo.png"
              className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle"
              alt=""
            ></img>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-2">
                <SelectOption
                  onChange={handleChangeVanPhong}
                  value={vanphong}
                  title={"V??n Ph??ng"}
                />
              </div>
              <div className="col-md-2">
                <SelectOption
                  onChange={handleChange}
                  value={nhanvien}
                  title={"Nh??n Vi??n"}
                />
              </div>
              <div className="col-md-4">
                <SelectDate getdate={getdate} date={update} />
              </div>
              <div className="col-md-2">
                <ExportCSV
                  csvData={checkin}
                  titleButton="Xu???t File Nh??n Vi??n"
                />
              </div>
              <div className="col-md-2">
                <ExportCSV
                  csvData={checkinAllLocal}
                  fileNameStart="All"
                  titleButton="Xu???t File T???t C??? Nh??n Vi??n"
                />
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <TodoList
              datacheckin={checkin}
              dataHistory={checkinHistory}
              getdate={getdate}
              date={update}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminListPage;
