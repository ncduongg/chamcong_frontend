import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";
function TodoItemNV(props) {
  const { row, idx, keyindex } = props;
  return (
    <>
      <TableRow key={idx}>
        <TableCell component="th" scope="row">
          {keyindex + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.idCC}</TableCell>
      </TableRow>
    </>
  );
}

export default TodoItemNV;
