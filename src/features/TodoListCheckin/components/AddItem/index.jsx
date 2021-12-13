import { Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useSnackbar } from "notistack";
import "./styles.scss";
const AddItem = ({ onClickAddNhanVien }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [valueNhanVien, setValueNhanVien] = useState("");
  const [valueIDChamCong, setValueIDChamCong] = useState("");
  const handelChangeValueNhanVienInput = (e) => {
    setValueNhanVien(e.target.value);
  };
  const handelChangeValueIDChamCongInput = (e) => {
    setValueIDChamCong(e.target.value);
  };
  const handelClickAddNV = () => {
    onClickAddNhanVien(valueNhanVien, valueIDChamCong);
  };
  return (
    <div>
      <div className="container-fluid Edit-item">
        <div className="row Edit-item_container">
          <div className="col-md-1"></div>
          <div className="col-md-7">
            <div className="row">
              <div className="col-md-6">
                <TextField
                  value={valueNhanVien}
                  label="Tên nhân viên"
                  onChange={handelChangeValueNhanVienInput}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  type="number"
                  value={valueIDChamCong}
                  label="Mã chấm công"
                  onChange={handelChangeValueIDChamCongInput}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <Button
              color="success"
              variant="contained"
              className="Edit-item_button"
              onClick={handelClickAddNV}
            >
              Thêm Mới
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
