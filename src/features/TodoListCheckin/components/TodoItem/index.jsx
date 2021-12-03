import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { formatDateTimeVN } from "components/from-controls/FromatDate";
import * as moment from "moment";
function TodoItem(props) {
  const { row, idx, keyindex } = props;
  const newDate = formatDateTimeVN(row.date);
  const newDateEnd = formatDateTimeVN(row.dateEnd);
  return (
    <>
      <TableRow key={idx}>
        <TableCell component="th" scope="row">
          {keyindex + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.nameUser}
        </TableCell>
        <TableCell align="left">{newDate.gio}</TableCell>
        <TableCell align="left">
          {newDate.gio === newDateEnd.gio ? "NaN" : newDateEnd.gio}
        </TableCell>
        <TableCell align="left">{newDate.thu}</TableCell>

        <TableCell align="left">
          {newDate.ngay + " " + newDate.thang + " - " + newDate.nam}
        </TableCell>
        <TableCell align="left">{row.status}</TableCell>
      </TableRow>
    </>
  );
}

export default TodoItem;
