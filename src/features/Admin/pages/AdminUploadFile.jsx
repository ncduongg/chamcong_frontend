import { Button, TextField } from '@mui/material';
import apiAdmin from 'api/apiAdmin';
import { dataFormat } from 'components/from-controls/FromatData/FromatData';
import TodoList from 'features/TodoListCheckin/components/TodoList';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import ListFile from '../components/ListFile';
import './styles.scss';
const columnsListFile = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: 'filename',
        headerName: 'Tên File',
        width: 250,
        editable: true,
    },
    {
        field: 'filedate',
        headerName: 'Ngày',
        type: 'number',
        width: 250,
        editable: true,
    },
    {
        field: 'filepath',
        headerName: 'Thư mục',
        type: 'number',
        width: 150,
        editable: true,
    },
];
const columnsListVanPhong = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: 'nameVP',
        headerName: 'Tên File',
        width: 250,
        editable: true,
    },
    {
        field: 'status',
        headerName: 'Ngày',
        type: 'number',
        width: 250,
        editable: true,
    },
];
function AdminUploadFile(props) {
    const { enqueueSnackbar } = useSnackbar();
    const [file, setFile] = useState("Chọn File...")
    const [dataListFile, setDataListFile] = useState([])
    const [dataTodoList, setDataTodoList] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);
    const [readFile, setReadFile] = useState([])
    const [vanphong,setVanPhong] = useState([])
    const [vanphongCheck,setVanPhongCheck] = useState([])
    const [vanphongInput,setVanPhongInput] = useState({})
    const [vanphongInputText,setVanPhongInputText] = useState()
    const [refestListFile,setRefestListFile] = useState(false)
    const [refestListVanPhong,setRefestVanPhong] = useState(false)
    const uploadFile = async (e) => {
        await setFile(e.target.value.replace("C:\\fakepath\\", ""))
        setSelectedFile(e.target.files[0])
    }
    // Upload File
    const handleUploadFile = async () => {
        try {
            if(selectedFile === null){
                enqueueSnackbar("Bạn chưa chọn File nào?", {
                    variant: 'error',
                });
                return;
            }
            if(typeof selectedFile  === "undefined"){
                setFile("Chọn File...")
                enqueueSnackbar("Bạn chưa chọn File nào?", {
                    variant: 'error',
                });
                return;
            }
            const res = await apiAdmin.uploadFile(selectedFile)
            if(res.data.dataFile){
                enqueueSnackbar(res.data.message, {
                    variant: 'success',
                });
                setRefestListFile(refestListFile ? false :true)
                setSelectedFile(null)
                setFile("Chọn File...")
                return;
            }
            enqueueSnackbar(res.data.message, {
                variant: 'error',
            });
        } catch (error) {
            console.log(error);
        }
    }
    //Ghi file
    const handleGhiFile = async ()  =>{
        if(readFile.length === 0){
            enqueueSnackbar("Bạn chưa chọn File nào?", {
                variant: 'error',
            });
            return;
        }
        if(vanphongCheck.length > 1){
            enqueueSnackbar("Bạn chỉ được chọn 1 Văn Phòng", {
                variant: 'error',
            });
            return;
        }
        if(vanphongCheck.length === 0){
            enqueueSnackbar("Bạn chọn 1 Văn Phòng để ghi", {
                variant: 'error',
            });
            return;
        }
        const newObj = {
            idFile : readFile,
            idVanPhong : vanphongCheck
        }
        const res = await apiAdmin.writeFile(newObj)
        if(res.data.status){
            enqueueSnackbar(res.data.message, {
                variant: 'success',
            })
            return
        }

    }
    //Button them van phong
    const handleClickAddVanPhong = async () =>{
        if(Object.entries(vanphongInput).length === 0){
            enqueueSnackbar("Vui lòng nhập tên văn phòng", {
                variant: 'error',
            });
            return;
        }
        const res = await apiAdmin.addListVanPhong(vanphongInput)
        if(res.data.status){
            enqueueSnackbar(res.data.message, {
                variant: 'success',
            });
            setRefestVanPhong(refestListVanPhong ? false :true)
            setVanPhongInput({})
            setVanPhongInputText("")
            return
        }
        if(!res.data.status){
            enqueueSnackbar(res.data.message, {
                variant: 'error',
            });
            return
        }
    }
    // Lay list Van Phong
    const handleCheckVanPhong = (id) =>{
        setVanPhongCheck(id)
    }
    useEffect(() =>{
        (
            async () =>{
                const res = await apiAdmin.getListVanPhong()
                const newDataFile = []
                const rawData = res.data.data
                let newTableData = rawData.map((x) => {
                    const newX = {
                        id: x._id,
                        ...x
                    }
                    return newX
                })
                setVanPhong(newTableData)
            }
        )()
    },[refestListVanPhong])
    //Doc file
    const handleReadFile = (id) => {
        setReadFile(id)
    }
    useEffect(() => {
        (
            async () => {
                const res = await apiAdmin.readFile(readFile)
                setDataTodoList(dataFormat(res.data.data));
            }
        )()
    }, [readFile])
    // api goi list danh sach file!!!
    useEffect(() => {
        (
            async () => {
                const res = await apiAdmin.getListFile();
                const newDataFile = []
                const rawData = res.data.data
                let newTableData = rawData.map((x) => {
                    const newX = {
                        id: x._id,
                        ...x
                    }
                    return newX
                })
                // neu de du lieu tinh thi hien du lieu API luc hien luc khon
                setTimeout(() => {
                    setDataListFile(newTableData)
                }, 10);

            }
        )()

    }, [refestListFile])
    return (
        <div>
            <div className="container-fuild">
                <div className="row">
                    <div className="col-md-12 image-logo">
                        <img
                            src="https://dth.com.vn/img/core-img/logo.png"
                            className="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}"
                            alt=""
                        ></img>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" onChange={(e) => uploadFile(e)} />
                                    <label className="custom-file-label">{file}</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <Button
                                    onClick={handleUploadFile}
                                    variant="contained"
                                    component="label"
                                >
                                    Upload File
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-8">
                                    <TodoList datacheckin={dataTodoList} />
                                </div>
                                <div className="col-md-4">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-9">
                                                <ListFile dataFile={dataListFile} onHandleFile={handleReadFile} columns={columnsListFile}/>
                                                <TextField  value={vanphongInputText} id="outlined-basic" onChange={e => setVanPhongInput({nameVP: e.target.value,status:"Bình thường"})} label="Văn Phòng" variant="outlined" className="input_vanPhong"/>
                                                <Button
                                                    onClick={handleClickAddVanPhong}
                                                    variant="contained"
                                                    component="label"
                                                    className="btn-vanphong"
                                                >
                                                    Thêm Văn Phòng
                                                </Button>
                                                <ListFile dataFile={vanphong} onHandleFile={handleCheckVanPhong} columns={columnsListVanPhong}/>
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