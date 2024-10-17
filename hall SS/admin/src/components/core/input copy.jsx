import React from "react";
import TextField from "@mui/material/TextField";

const CustomInput = ({
  size,
  id,
  name,
  label,
  formikProps,
  style,
  type,
  disabled,
  max,
}) => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <div
      className={`form-floatng w-full ${
        formikProps.errors[name] ? "has-error" : ""
      }`}
    >
      {type ==="date" ?  <TextField
        disabled={disabled && disabled}
        id={id}
        name={name}
        label={label}
        type={type ? type : "text"}
        variant="outlined"
        fullWidth
        value={formikProps.values[name]}
        onChange={formikProps.handleChange}
        onBlur={formikProps.handleBlur}
        error={formikProps.touched[name] && Boolean(formikProps.errors[name])}
        helperText={
          formikProps.touched.vehicle_category &&
          formikProps.errors.vehicle_category
        }
        margin="normal"
        size={size ? "small" : "medium"}
        InputLabelProps={{
          shrink: type === "date",
        }}
        inputProps={{
          max: type === "date" && today, // Set the maximum date to today's date
        }}
      /> :<TextField
      disabled={disabled && disabled}
      id={id}
      name={name}
      label={label}
      type={type ? type : "text"}
      variant="outlined"
      fullWidth
      value={formikProps.values[name]}
      onChange={formikProps.handleChange}
      onBlur={formikProps.handleBlur}
      error={formikProps.touched[name] && Boolean(formikProps.errors[name])}
      helperText={
        formikProps.touched.vehicle_category &&
        formikProps.errors.vehicle_category
      }
      margin="normal"
      size={size ? "small" : "medium"}
    />}
    </div>
  );
};

export default CustomInput;
