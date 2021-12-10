import { Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import "./styles.scss";
const EditItem = (props) => {
  const { value, id, onSubmitChange } = props;
  const [valueNhanVien, setValueNhanVien] = useState(value.nameUser);
  const handelChangeValueInput = (e) => {
    setValueNhanVien(e.target.value);
  };
  const handelClickUpdateNV = () => {
    const newNhanVien = {
      idUser: value.idUser,
      local: value.local,
      nameUser: valueNhanVien,
    };
    onSubmitChange(newNhanVien);
  };
  return (
    <div>
      <div className="container-fluid Edit-item">
        <div className="row Edit-item_container">
          <div className="col-md-1">
            <p>{value.id}</p>
          </div>
          <div className="col-md-5">
            <TextField
              value={valueNhanVien}
              label="Tên nhân viên"
              onChange={handelChangeValueInput}
            />
          </div>
          <div className="col-md-3">
            <Button
              variant="contained"
              className="Edit-item_button"
              onClick={handelClickUpdateNV}
            >
              Update
            </Button>
          </div>
          <div className="col-md-3">
            <Button
              variant="contained"
              color="error"
              className="Edit-item_button"
              onClick={handelClickUpdateNV}
            >
              Xoá
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
