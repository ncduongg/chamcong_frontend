import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectOption({ onChange, value, title }) {
  const [nv, setNV] = React.useState("");
  const handleChange = (event) => {
    setNV(event.target.value);
    onChange(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {value.length === 0 ? "Chọn Văn Phòng Trước" : title}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={nv}
          label={title}
          onChange={handleChange}
        >
          {title === "Nhân Viên" &&
            value.map((item) => (
              <MenuItem value={item.idUser} key={item._id}>
                {item.idUser} - {item.nameUser}
              </MenuItem>
            ))}
          {title === "Văn Phòng" &&
            value.map((item) => (
              <MenuItem value={item._id} key={item._id}>
                {item.nameVP}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
