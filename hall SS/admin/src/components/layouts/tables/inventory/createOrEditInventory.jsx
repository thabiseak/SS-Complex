import React from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import CustomInput from "../../../core/input";
import FormikDatePicker from "../../../core/dateInput";
import { addAPI, editAPI } from "../../../../service/api";
import toast, { Toaster } from "react-hot-toast";
import CustomImageInput from "../../../core/imagesInput";
import { convertFileToBase64, isBase64 } from "../../../core/fileUtils";
import CustomSelect from "../../../core/select";
// import { editAPI } from "../../../../service/api";

const CreateOrEditInventory = ({ edit, AllData, handleClose, onGridReady }) => {
  const categoryOptions = [
    { value: "category1", label: "Category 1" },
    { value: "category2", label: "Category 2" },
    { value: "Test", label: "Test" },
    // Add more options as needed
  ];
  const GBPOptions = [
    { value: "UNAVAILABILE", label: "UNAVAILABILE" },
    { value: "AVAILABILE", label: "AVAILABILE" },
    // Add more options as needed
  ];
  //  dob: Edit ? AllData.dateOfBirth || "" : "",

  const AllFeild = {
    itemName: edit ? AllData && AllData.itemName : "",
    category: edit ? AllData && AllData.category : "",
    quantityAvailable: edit ? AllData && AllData.quantityAvailable : "",
    quantityOnOrder: edit ? AllData && AllData.quantityOnOrder : "",
    UnitPrice: edit ? AllData && AllData.UnitPrice : "",
    Date: edit ? AllData && AllData.Date : "",
    Condition: edit ? AllData && AllData.Condition : "",
    TotalCost: edit ? AllData && AllData.TotalCost : "",
    status: edit ? AllData && AllData.status : "",
  };
  const postPromoCode = async (data) => {
    let obj = {};
    obj = data;
    var base64dCourseImage = "";
    if (data.courseImage) {
      if (isBase64(data.courseImage)) {
        base64dCourseImage = data.courseImage;
      } else {
        base64dCourseImage = await convertFileToBase64(data.courseImage);
      }
    }
    obj.courseImage = base64dCourseImage;
    addAPI("inventory", data)
      .then((resp) => {
        toast.success("Successfully Added!");
        handleClose();
        onGridReady();
      })
      .catch((err) => toast.error("Image long size"));
  };
  const putPromoCode = async (data) => {
    let obj = {};
    obj = data;
    var base64dCourseImage = "";
    if (data.courseImage) {
      if (isBase64(data.courseImage)) {
        base64dCourseImage = data.courseImage;
      } else {
        base64dCourseImage = await convertFileToBase64(data.courseImage);
      }
    }
    obj.courseImage = base64dCourseImage;
    editAPI("inventory/" + AllData._id, obj)
      .then((resp) => {
        toast.success("Successfully edited!");
        onGridReady();
        handleClose();
      })
      .catch((err) => toast.error("something went wrong."));
  };
  const formik = useFormik({
    initialValues: AllFeild,
    onSubmit: (values) => {
      // Handle form submission logic
      console.log("Form submitted:", values);
      if (!edit) {
        postPromoCode(values);
      } else {
        putPromoCode(values);
      }
    },

    validate: (values) => {
      const errors = {};

      if (!values.itemName) {
        errors.itemName = "Cannot be empty";
      }
      if (!values.category) {
        errors.category = "Cannot be empty";
      }
      if (!values.quantityAvailable) {
        errors.quantityAvailable = "Cannot be empty";
      }
      if (!values.quantityOnOrder) {
        errors.quantityOnOrder = "Cannot be empty";
      }
      if (!values.UnitPrice) {
        errors.UnitPrice = "Cannot be empty";
      }
      if (!values.TotalCost) {
        errors.TotalCost = "Cannot be empty";
      }
      if (!values.Date) {
        errors.Date = "Cannot be empty";
      }
      if (!values.Condition) {
        errors.Condition = "Cannot be empty";
      }
      if (!values.status) {
        errors.status = "Cannot be empty";
      }
      // Add more validation logic as needed
      return errors;
    },
  });

  return (
    <div className="p-5" style={{ minWidth: "500px" }}>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full md:w-full p-1">
          <div style={{ margin: "11px 0px 0px 0px" }}>
            <CustomSelect
              id="status"
              name="status"
              label="Status"
              options={GBPOptions}
              formikProps={formik}
              showvalue
              size="small"
            />
          </div>
        </div>

        <CustomInput
          id="itemName"
          name="itemName"
          label=" Item Name"
          variant="outlined"
          fullWidth
          formikProps={formik}
          size
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^A-Za-z ]/g, "");
          }}
        />

        <CustomInput
          placeholder="category"
          // type={"date"}
          id="category"
          name="category"
          label="category"
          variant="outlined"
          fullWidth
          formikProps={formik}
          size
        />
        <CustomInput
          placeholder="quantityAvailable"
          type={"number"}
          id="quantityAvailable"
          name="quantityAvailable"
          label="Quantity Available"
          variant="outlined"
          fullWidth
          formikProps={formik}
          size
        />
        {/* sdfsdsdsdsd */}
        <CustomInput
          placeholder="quantityOnOrder"
          type={"number"}
          id="quantityOnOrder"
          name="Quantity On Order"
          label="Quantity On Order"
          variant="outlined"
          fullWidth
          formikProps={formik}
          size
        />
        <CustomInput
          placeholder="UnitPrice"
          type={"number"}
          id="UnitPrice"
          name="UnitPrice"
          label="Unit Price"
          variant="outlined"
          fullWidth
          formikProps={formik}
          size
        />
        <CustomInput
          placeholder="Total Cost"
          type={"number"}
          id="TotalCost"
          name="TotalCost"
          label="Total Cost"
          variant="outlined"
          fullWidth
          formikProps={formik}
          size
        />
        <CustomInput
          placeholder="Date"
          type={"date"}
          id="Date"
          name="Date"
          label="Date"
          variant="outlined"
          fullWidth
          formikProps={formik}
          size
        />
        <CustomInput
          placeholder="Condition"
          // type={"date"}
          id="Condition"
          name="Condition"
          label="Condition"
          variant="outlined"
          fullWidth
          formikProps={formik}
          size
        />

        {/* Add other form fields as needed */}
        <br />
        <div className="flex justify-center w-full">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              background: "green",
              marginTop: "6px",
              width: "140px",
              margin: "0 auto",
            }}
          >
            {edit ? "Edit" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrEditInventory;
