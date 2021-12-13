import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateRangePicker from "@mui/lab/DateRangePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import vi from "date-fns/locale/vi";
import React from "react";
function SelectDate(props) {
  const { getdate, date } = props;
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi}>
        <DateRangePicker
          startText="Check-in"
          endText="Check-out"
          value={date}
          onChange={(newValue) => {
            const newDate = [newValue[0], newValue[1]];
            if (
              typeof newDate[0] !== "NaN" &&
              typeof newDate[1] !== "NaN" &&
              newDate[1] > newDate[0]
            ) {
              getdate(newDate);
            }
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </div>
  );
}

export default SelectDate;
