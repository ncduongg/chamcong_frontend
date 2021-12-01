import React from "react";
import PropTypes from "prop-types";
import { Select, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  lable: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, lable, disabled, title } = props;
  const {
    formState: { errors },
  } = form;
  const hasError = errors.username;
  return (
    <Controller
      name={name}
      control={form.control}
      rules={{ required: true }}
      render={({ field }) => (
        <TextField
          {...field}
          isMulti
          error={!!hasError}
          helperText={hasError?.message}
        />
      )}
      margin="normal"
      required
      fullWidth
      variant="outline"
    />
  );
}

export default InputField;
