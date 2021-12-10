import { DataGrid } from "@material-ui/data-grid";
import React from "react";
const ListDataGrid = ({ dataFile, onHandleFile, columns }) => {
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
          onSelectionModelChange={handleChangeFile}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>
    </>
  );
};

export default ListDataGrid;