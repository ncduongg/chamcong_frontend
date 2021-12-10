import {
  AppBar,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import apiAdmin from "api/apiAdmin";
import { dataFormat } from "components/from-controls/FromatData/FromatData";
import TodoList from "features/TodoListCheckin/components/TodoList";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import ListDataGrid from "../components/ListDataGrid";
import TodoListNV from "../../TodoListCheckin/components/TodoListNV";
import "./styles.scss";
import { GridMenuIcon } from "@material-ui/data-grid";
const columnsListFile = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "filename",
    headerName: "Tên File",
    width: 250,
    editable: true,
  },
  {
    field: "filedate",
    headerName: "Ngày",
    type: "number",
    width: 250,
    editable: true,
  },
  {
    field: "filepath",
    headerName: "Thư mục",
    type: "number",
    width: 150,
    editable: true,
  },
];
const columnsListVanPhong = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "nameVP",
    headerName: "Tên File",
    width: 250,
    editable: true,
  },
  {
    field: "status",
    headerName: "Ngày",
    type: "number",
    width: 250,
    editable: true,
  },
];
function AdminUploadFile(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState("Chọn File...");
  const [dataListFile, setDataListFile] = useState([]);
  const [dataListFileNhanVien, setDataListFileNhanVien] = useState([]);
  const [dataTodoList, setDataTodoList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [readFile, setReadFile] = useState([]);
  const [readFileNhanVien, setReadFileNhanVien] = useState([]);
  const [vanphong, setVanPhong] = useState([]);
  const [vanphongCheck, setVanPhongCheck] = useState([]);
  const [vanphongInput, setVanPhongInput] = useState({});
  const [vanphongInputText, setVanPhongInputText] = useState();
  const [refestListFile, setRefestListFile] = useState(false);
  const [refestListVanPhong, setRefestVanPhong] = useState(false);
  const [valueFile, setValueFile] = useState(0);
  const [dataTodoListNhanVien, setDataTodoListNhanVien] = useState([]);
  const uploadFile = async (e) => {
    await setFile(e.target.value.replace("C:\\fakepath\\", ""));
    setSelectedFile(e.target.files[0]);
  };
  // Upload File
  const handleUploadFile = async () => {
    try {
      if (selectedFile === null) {
        enqueueSnackbar("Bạn chưa chọn File nào?", {
          variant: "error",
        });
        return;
      }
      if (typeof selectedFile === "undefined") {
        setFile("Chọn File...");
        enqueueSnackbar("Bạn chưa chọn File nào?", {
          variant: "error",
        });
        return;
      }
      const res = await apiAdmin.uploadFile(selectedFile, valueFile);
      if (res.data.dataFile) {
        enqueueSnackbar(res.data.message, {
          variant: "success",
        });
        setRefestListFile(refestListFile ? false : true);
        setSelectedFile(null);
        setFile("Chọn File...");
        return;
      }
      enqueueSnackbar(res.data.message, {
        variant: "error",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Ghi file
  const handleGhiFile = async () => {
    if (readFile.length === 0) {
      enqueueSnackbar("Bạn chưa chọn File nào?", {
        variant: "error",
      });
      return;
    }
    if (vanphongCheck.length > 1) {
      enqueueSnackbar("Bạn chỉ được chọn 1 Văn Phòng", {
        variant: "error",
      });
      return;
    }
    if (vanphongCheck.length === 0) {
      enqueueSnackbar("Bạn chọn 1 Văn Phòng để ghi", {
        variant: "error",
      });
      return;
    }
    const newObj = {
      idFile: readFile,
      idVanPhong: vanphongCheck,
    };
    const res = await apiAdmin.writeFile(newObj);
    if (res.data.status) {
      enqueueSnackbar(res.data.message, {
        variant: "success",
      });
      return;
    }
  };
  //Ghi file NhanVien
  const handleGhiFileNhanVien = async () => {
    if (readFileNhanVien.length === 0) {
      enqueueSnackbar("Bạn chưa chọn File nào?", {
        variant: "error",
      });
      return;
    }
    if (vanphongCheck.length > 1) {
      enqueueSnackbar("Bạn chỉ được chọn 1 Văn Phòng", {
        variant: "error",
      });
      return;
    }
    if (vanphongCheck.length === 0) {
      enqueueSnackbar("Bạn chọn 1 Văn Phòng để ghi", {
        variant: "error",
      });
      return;
    }
    const newObj = {
      update: true,
      idFile: readFileNhanVien,
      idVanPhong: vanphongCheck,
    };
    const res = await apiAdmin.writeFileNhanVien(newObj);
    if (res.data.status) {
      enqueueSnackbar(res.data.message, {
        variant: "success",
      });
      return;
    }
  };
  //Ghi file Update NhanVien
  // const handleUpdateFileNhanVien = async () => {
  //   if (readFileNhanVien.length === 0) {
  //     enqueueSnackbar("Bạn chưa chọn File nào?", {
  //       variant: "error",
  //     });
  //     return;
  //   }
  //   if (vanphongCheck.length > 1) {
  //     enqueueSnackbar("Bạn chỉ được chọn 1 Văn Phòng", {
  //       variant: "error",
  //     });
  //     return;
  //   }
  //   if (vanphongCheck.length === 0) {
  //     enqueueSnackbar("Bạn chọn 1 Văn Phòng để ghi", {
  //       variant: "error",
  //     });
  //     return;
  //   }
  //   const newObj = {
  //     update: false,
  //     idFile: readFileNhanVien,
  //     idVanPhong: vanphongCheck,
  //   };
  //   const res = await apiAdmin.writeFileNhanVien(newObj);
  //   if (res.data.status) {
  //     enqueueSnackbar(res.data.message, {
  //       variant: "success",
  //     });
  //     return;
  //   }
  // };
  //Button them van phong
  const handleClickAddVanPhong = async () => {
    if (Object.entries(vanphongInput).length === 0) {
      enqueueSnackbar("Vui lòng nhập tên văn phòng", {
        variant: "error",
      });
      return;
    }
    const res = await apiAdmin.addListVanPhong(vanphongInput);
    if (res.data.status) {
      enqueueSnackbar(res.data.message, {
        variant: "success",
      });
      setRefestVanPhong(refestListVanPhong ? false : true);
      setVanPhongInput({});
      setVanPhongInputText("");
      return;
    }
    if (!res.data.status) {
      enqueueSnackbar(res.data.message, {
        variant: "error",
      });
      return;
    }
  };

  // Lay list Van Phong
  const handleCheckVanPhong = (id) => {
    setVanPhongCheck(id);
  };
  useEffect(() => {
    (async () => {
      const res = await apiAdmin.getListVanPhong();
      const rawData = res.data.data;
      let newTableData = rawData.map((x) => {
        const newX = {
          id: x._id,
          ...x,
        };
        return newX;
      });
      setVanPhong(newTableData);
    })();
  }, [refestListVanPhong]);
  //Doc file
  const handleReadFile = (id) => {
    setReadFile(id);
  };
  useEffect(() => {
    (async () => {
      const res = await apiAdmin.readFile(readFile);
      setDataTodoList(dataFormat(res.data.data));
    })();
  }, [readFile]);
  // Doc file NhanVien
  const handleReadFileNhanVien = (id) => {
    setReadFileNhanVien(id);
  };
  useEffect(() => {
    (async () => {
      const res = await apiAdmin.readFileNhanVien(readFileNhanVien);
      setDataTodoListNhanVien(res.data.data);
    })();
  }, [readFileNhanVien]);
  // api goi list danh sach file!!!
  useEffect(() => {
    (async () => {
      const res = await apiAdmin.getListFile(0);
      const rawData = res.data.data;
      let newTableData = rawData.map((x) => {
        const newX = {
          id: x._id,
          ...x,
        };
        return newX;
      });
      // neu de du lieu tinh thi hien du lieu API luc hien luc khon
      setTimeout(() => {
        setDataListFile(newTableData);
      }, 10);
    })();
    (async () => {
      const res = await apiAdmin.getListFile(1);
      const rawData = res.data.data;
      let newTableData = rawData.map((x) => {
        const newX = {
          id: x._id,
          ...x,
        };
        return newX;
      });
      // neu de du lieu tinh thi hien du lieu API luc hien luc khon
      setTimeout(() => {
        setDataListFileNhanVien(newTableData);
      }, 10);
    })();
  }, [refestListFile]);
  // cho loai file
  const handleChangeFile = (e) => {
    setValueFile(e.target.value);
  };
  return (
    <div>
      <div className="container-fuild xxx">
        <div className="row">
          <div className="container image-logo">
            <img
              src="https://dth.com.vn/img/core-img/logo.png"
              className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
              alt=""
            ></img>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    onChange={(e) => uploadFile(e)}
                  />
                  <label className="custom-file-label">{file}</label>
                </div>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="controlled-radio-buttons-group"
                    value={valueFile}
                    onChange={handleChangeFile}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="File Chấm Công"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="File Danh Sách Nhân Viên"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="col-md-5">
                <Button
                  onClick={handleUploadFile}
                  variant="contained"
                  component="label"
                  color="success"
                >
                  Upload File
                </Button>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit" component="div">
                    File chấm công
                  </Typography>
                </Toolbar>
              </AppBar>
              <div className="col-md-8">
                <TodoList datacheckin={dataTodoList} />
              </div>
              <div className="col-md-4">
                <div className="col-md-12">
                  <ListDataGrid
                    dataFile={dataListFile}
                    onHandleFile={handleReadFile}
                    columns={columnsListFile}
                  />
                </div>
                <div className="col-md-12">
                  <br />
                  <Button
                    onClick={handleGhiFile}
                    variant="contained"
                    component="label"
                    className="btn-file"
                  >
                    Ghi File DS Chấm Công
                  </Button>
                  <Button
                    onClick={handleUploadFile}
                    variant="contained"
                    component="label"
                    className="btn-file"
                    color="error"
                  >
                    Xóa File
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit" component="div">
                    File danh sách Nhân Viên
                  </Typography>
                </Toolbar>
              </AppBar>
              <div className="col-md-8">
                <TodoListNV listnv={dataTodoListNhanVien} />
              </div>
              <div className="col-md-4">
                <div className="col-md-12">
                  <ListDataGrid
                    dataFile={dataListFileNhanVien}
                    onHandleFile={handleReadFileNhanVien}
                    columns={columnsListFile}
                  />
                </div>
                <div className="col-md-12">
                  <br />
                  <Button
                    onClick={handleGhiFileNhanVien}
                    variant="contained"
                    component="label"
                    className="btn-file"
                  >
                    Ghi File DS Nhân Viên
                  </Button>
                  <Button
                    onClick={handleUploadFile}
                    variant="contained"
                    component="label"
                    className="btn-file"
                    color="error"
                  >
                    Xóa File
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <AppBar position="static">
                <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit" component="div">
                    Văn Phòng
                  </Typography>
                </Toolbar>
              </AppBar>
              <div className="col-md-8">
                <ListDataGrid
                  dataFile={vanphong}
                  onHandleFile={handleCheckVanPhong}
                  columns={columnsListVanPhong}
                />
              </div>
              <div className="col-md-4">
                <div className="col-md-12">
                  <TextField
                    id="outlined-basic"
                    onKeyUp={(e) =>
                      setVanPhongInput({
                        nameVP: e.target.value,
                        status: "Bình thường",
                      })
                    }
                    label="Văn Phòng"
                    variant="outlined"
                    className="input_vanPhong"
                  />
                </div>
                <div className="col-md-12">
                  <Button
                    onClick={handleClickAddVanPhong}
                    variant="contained"
                    component="label"
                  >
                    Thêm Văn Phòng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUploadFile;
{
  /* <div className="col-md-8">
                <div className="container-fluid">
                  <div className="col-md-12">
                    <TodoList datacheckin={dataTodoList} />
                  </div>
                  <div className="col-md-12">
                    <TodoListNV listnv={dataTodoList} />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9">
                      <ListDataGrid
                        dataFile={dataListFile}
                        onHandleFile={handleReadFile}
                        columns={columnsListFile}
                      />
                      <TextField
                        id="outlined-basic"
                        onKeyUp={(e) =>
                          setVanPhongInput({
                            nameVP: e.target.value,
                            status: "Bình thường",
                          })
                        }
                        label="Văn Phòng"
                        variant="outlined"
                        className="input_vanPhong"
                      />
                      <Button
                        onClick={handleClickAddVanPhong}
                        variant="contained"
                        component="label"
                        className="btn-vanphong"
                      >
                        Thêm Văn Phòng
                      </Button>
                      <ListDataGrid
                        dataFile={vanphong}
                        onHandleFile={handleCheckVanPhong}
                        columns={columnsListVanPhong}
                      />
                    </div>
                    <div className="col-md-3">
                      <Button
                        onClick={handleGhiFile}
                        variant="contained"
                        component="label"
                        className="btn-file"
                      >
                        Ghi File SQL
                      </Button>
                      <Button
                        onClick={handleUploadFile}
                        variant="outlined"
                        component="label"
                        className="btn-file"
                      >
                        Xóa File
                      </Button>
                    </div>
                  </div>
                </div>
              </div> */
}
