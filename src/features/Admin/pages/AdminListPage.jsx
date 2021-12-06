import apiAdmin from "api/apiAdmin";
import { ExportCSV } from "components/ExportExcel";
import { dataFormat } from "components/from-controls/FromatData/FromatData";
import SelectDate from "components/SelectDate";
import SelectOption from "components/SelectOption";
import TodoList from "features/TodoListCheckin/components/TodoList";
import * as moment from "moment";
import React, { useEffect, useState } from "react";
function AdminListPage(props) {
  const dateNow = moment().toLocaleString();
  const dateOld = moment().subtract(1, "months").toLocaleString();
  const [checkin, setCheckin] = useState([]);
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
          if (res.data["err"] === "Id nhân viên không đúng") return;
          setCheckin(dataFormat(res.data));
        }
        if (typeof updateNv === "undefined") {
          setCheckin([]);
          setCheckinAllLocal([]);
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
        if (res.data["err"] === "Id nhân viên không đúng") return;
        setCheckinAllLocal(dataFormat(res.data));
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
          setUpdateNV();
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
      <div className="container-fuild">
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
                  title={"Văn Phòng"}
                />
              </div>
              <div className="col-md-2">
                <SelectOption
                  onChange={handleChange}
                  value={nhanvien}
                  title={"Nhân Viên"}
                />
              </div>
              <div className="col-md-4">
                <SelectDate getdate={getdate} date={update} />
              </div>
              <div className="col-md-2">
                <ExportCSV
                  csvData={checkin}
                  titleButton="Xuất File Nhân Viên"
                />
              </div>
              <div className="col-md-2">
                <ExportCSV
                  csvData={checkinAllLocal}
                  fileNameStart="All"
                  titleButton="Xuất File Tất Cả Nhân Viênnnn"
                />
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <TodoList datacheckin={checkin} getdate={getdate} date={update} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminListPage;
