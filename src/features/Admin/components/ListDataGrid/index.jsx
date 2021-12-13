import { DataGrid } from "@mui/x-data-grid";
import React from "react";
const ListDataGrid = (props) => {
  const { dataFile, onHandleFile, columns } = props;
  const handleChangeFile = (id) => {
    onHandleFile(id);
  };
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={dataFile}
          columns={columns}
          checkboxSelection
          editRowsModel="false"
          onSelectionModelChange={handleChangeFile}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>
    </>
  );
};

export default ListDataGrid;
