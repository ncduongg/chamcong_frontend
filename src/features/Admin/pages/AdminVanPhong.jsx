import { Button, TextField } from "@mui/material";
import apiAdmin from "api/apiAdmin";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import ListDataGrid from "../components/ListDataGrid";
const columnsListVanPhong = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "nameVP",
    headerName: "Tên văn phòng",
    width: 250,
    editable: true,
  },
  {
    field: "deviceID",
    headerName: "Mã máy chấm công",
    type: "number",
    width: 250,
    editable: true,
  },
  {
    field: "status",
    headerName: "Trạng Thái",
    type: "number",
    width: 250,
    editable: true,
  },
];
const AdminVanPhong = (props) => {
  const history = useHistory();
  const headerCheckLoginAdmin = useSelector((state) => state.loginadmin.admin);
  const isLogin = !!headerCheckLoginAdmin.username;
  if (!isLogin) history.push(`/Admin`);
  const { enqueueSnackbar } = useSnackbar();
  const [vanphong, setVanPhong] = useState([]);
  const [vanphongInput, setVanPhongInput] = useState({
    nameVP: "",
    deviceID: "",
    status: "Bình thường",
  });
  const [refestListVanPhong, setRefestVanPhong] = useState(false);
  const [vanphongCheck, setVanPhongCheck] = useState([]);
  const handleCheckVanPhong = (id) => {
    setVanPhongCheck(id);
  };
  // lay du lieu tu api
  useEffect(() => {
    (async () => {
      const res = await apiAdmin.getListVanPhong();
      Promise.resolve(res)
        .then((res) => {
          const rawData = res.data.data;
          let newTableData = rawData.map((x) => {
            const newX = {
              id: x._id,
              ...x,
            };
            return newX;
          });
          return newTableData;
        })
        .then((newTableData) => {
          setVanPhong(newTableData);
        });
    })();
  }, [refestListVanPhong]);
  const handleClickAddVanPhong = async () => {
    if (vanphongInput.nameVP === "" || vanphongInput.deviceID === "") {
      enqueueSnackbar(
        "Vui lòng nhập Đủ và Đúng Tên văn phòng + Mã máy chấm công",
        {
          variant: "error",
        }
      );
      return;
    }
    const res = await apiAdmin.addListVanPhong(vanphongInput);
    if (res.data.status) {
      enqueueSnackbar(res.data.message, {
        variant: "success",
      });
      setRefestVanPhong(!refestListVanPhong);
      setVanPhongInput({
        nameVP: "",
        deviceID: "",
        status: "Bình thường",
      });
      return;
    }
    if (!res.data.status) {
      enqueueSnackbar(res.data.message, {
        variant: "error",
      });
      return;
    }
  };
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
          <div className="container-fluid tableShow">
            <div className="row">
              <div className="col-md-7">
                <ListDataGrid
                  dataFile={vanphong}
                  onHandleFile={handleCheckVanPhong}
                  columns={columnsListVanPhong}
                />
              </div>
              <div className="col-md-5">
                <div className="col-md-12">
                  <TextField
                    onChange={(e) =>
                      setVanPhongInput({
                        ...vanphongInput,
                        nameVP: e.target.value,
                      })
                    }
                    label="Văn Phòng"
                    variant="outlined"
                    className="input_vanPhong"
                  />
                </div>
                <div className="col-md-12">
                  <TextField
                    onChange={(e) =>
                      setVanPhongInput({
                        ...vanphongInput,
                        deviceID: e.target.value,
                        status: "Bình thường",
                      })
                    }
                    label="Mã máy chấm công"
                    variant="outlined"
                    className="input_vanPhong"
                  />
                </div>
                <div className="col-md-12">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleClickAddVanPhong}
                  >
                    Thêm văn phòng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminVanPhong;
