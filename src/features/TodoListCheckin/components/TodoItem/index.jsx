import React from "react";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import TableRow from "@mui/material/TableRow";
import { formatDateTimeVN } from "components/from-controls/FromatDate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import * as moment from "moment";
import {
  Collapse,
  Table,
  TableBody,
  TableHead,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
function TodoItem(props) {
  const { row, idx, keyindex, rowHistory } = props;
  const [open, setOpen] = React.useState(false);
  const newDate = formatDateTimeVN(row.date);
  const newDateEnd = formatDateTimeVN(row.dateEnd);
  return (
    <>
      <TableRow key={idx}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Lịch sử chấm công
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Ngày</TableCell>
                    <TableCell>Giờ</TableCell>
                    <TableCell align="right">Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowHistory.map((historyRow) => (
                    <TableRow key={historyRow._id}>
                      <TableCell component="th" scope="row">
                        {historyRow.date.split(" ")[0]}
                      </TableCell>
                      <TableCell>{historyRow.date.split(" ")[1]}</TableCell>
                      <TableCell align="right">{historyRow.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default TodoItem;
