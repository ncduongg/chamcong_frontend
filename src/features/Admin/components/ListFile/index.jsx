import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
const ListFile = ({ dataFile,onHandleFile,columns}) => {
    const handleChangeFile =(id) =>{
        onHandleFile(id)
    }
    return (
        <>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={dataFile} columns={columns} checkboxSelection onSelectionModelChange={handleChangeFile}/>
            </div>
        </>
    );
}

export default ListFile;