import apiAdmin from "api/apiAdmin";
import SelectOption from "components/SelectOption";
import EditItem from "features/TodoListCheckin/components/EditItem";
import AddItem from "features/TodoListCheckin/components/AddItem";
import React, { useEffect, useState } from "react";
import ListDataGrid from "../components/ListDataGrid";
import _ from "lodash";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
const columnsListNhanVien = [
  // { field: "id", headerName: "ID", width: 100 },
  {
    field: "nameUser",
    headerName: "Tên Nhân Viên",
    width: 250,
  },
  {
    field: "idUser",
    headerName: "Mã Chấm Công",
    type: "number",
    width: 250,
  },
];
const AdminQuanLyNhanVien = (props) => {
  const history = useHistory();
  const headerCheckLoginAdmin = useSelector((state) => state.loginadmin.admin);
  const isLogin = !!headerCheckLoginAdmin.username;
  if (!isLogin) history.push(`/Admin`);
  const { enqueueSnackbar } = useSnackbar();
  //state List Nhan Vien
  const [listNV, setListNV] = useState([]);
  const [arrayNvSelected, setArrayNvSelected] = useState([]);
  //state List Van Phong
  const [vanphong, setVanPhong] = useState([]);
  const [vanphongChange, setVanPhongChange] = useState([]);
  const [refreshListNV, setRefreshListNV] = useState(true);
  // func change Van Phong
  const handleClickVanPhongChange = (e) => {
    setVanPhongChange(e);
  };

  // func change get Array Nhan Vien
  const handleChangeArraySelected = (e) => {
    const ArrayObjectSelected = [];
    e.forEach((nv) => {
      listNV.forEach((el) => {
        if (nv === el.id) {
          ArrayObjectSelected.push(el);
        }
      });
    });
    setArrayNvSelected(ArrayObjectSelected);
  };
  // func get Name Nhan vien
  const handleUpdateNhanVien = async (e) => {
    const res = await apiAdmin.updateNhanVien(e);
    if (res.data.status) {
      enqueueSnackbar(res.data.message, {
        variant: "success",
      });

      setRefreshListNV(!refreshListNV);
      return;
    }
    enqueueSnackbar(res.data.message, {
      variant: "error",
    });
  };
  // func get ma cham cong, ten nhan vien tu input
  const handleClickAddNhanVien = async (name, idCC) => {
    if (name === " " || name === "" || idCC === "" || idCC === " ") {
      enqueueSnackbar("Vui lòng nhập đúng", {
        variant: "error",
      });
      return;
    }
    if (vanphongChange.length === 0) {
      enqueueSnackbar("Vui lòng chọn văn phòng", {
        variant: "error",
      });
      return;
    }
    try {
      const nv = {
        name: name,
        idCC: idCC,
        idvanphong: vanphongChange,
      };
      const res = await apiAdmin.addNhanVien(nv);
      enqueueSnackbar(res.data.message, {
        variant: res.data.status ? "success" : "error",
      });
      setRefreshListNV(!refreshListNV);
    } catch (error) {
      enqueueSnackbar(`Error :  ${error}`, {
        variant: "error",
      });
      return;
    }
  };
  // get List Van Phong
  useEffect(() => {
    (async () => {
      const res = await apiAdmin.getListVanPhong();
      setVanPhong(res.data.data);
    })();
  }, []);
  // get list nhan vien
  useEffect(() => {
    (async () => {
      const res = await apiAdmin.getIDandUser(vanphongChange);
      const rawData = res.data.user;
      let newTableData = rawData.map((x) => {
        const newX = {
          id: x.idUser,
          ...x,
        };
        return newX;
      });
      setListNV(newTableData);
    })();
  }, [vanphongChange, refreshListNV]);
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
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7">
                <ListDataGrid
                  dataFile={listNV}
                  onHandleFile={handleChangeArraySelected}
                  columns={columnsListNhanVien}
                />
              </div>
              <div className="col-md-5">
                <div className="col-md-12">
                  <SelectOption
                    title="Văn Phòng"
                    value={vanphong}
                    onChange={handleClickVanPhongChange}
                  />
                </div>
                <div className="col-md-12">
                  {arrayNvSelected &&
                    arrayNvSelected.map((val) => (
                      <EditItem
                        key={val.id}
                        onSubmitChange={handleUpdateNhanVien}
                        value={val}
                      />
                    ))}
                  <AddItem onClickAddNhanVien={handleClickAddNhanVien} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuanLyNhanVien;
