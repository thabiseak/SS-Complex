import React from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import CustomSelect from "../../core/select";
import CustomInput from "../../core/input";
import FormikDatePicker from "../../core/dateInput";
import { addAPI, editAPI } from "../../../service/api";
import toast, { Toaster } from "react-hot-toast";
import CustomImageInput from "../../core/imagesInput";
import { convertFileToBase64, isBase64 } from "../../core/fileUtils";

const MyForm = ({ edit, AllData, handleClose, onGridReady }) => {
  const categoryOptions = [
    { value: "category1", label: "Category 1" },
    { value: "category2", label: "Category 2" },
    { value: "Test", label: "Test" },
    // Add more options as needed
  ];
  const GBPOptions = [
    { value: "%", label: "%" },
    // Add more options as needed
  ];
  //  dob: Edit ? AllData.dateOfBirth || "" : "",

  const AllFeild = {
    name: edit ? AllData && AllData.name : "",
    dayPrice: edit ? AllData && AllData.dayPrice : "",
    numberOfPerson: edit ? AllData && AllData.numberOfPerson : "",
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
    addAPI("hall", data)
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
    editAPI("hall/" + AllData._id, obj)
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

      if (!values.name) {
        errors.name = "Cannot be empty";
      }
      if (!values.dayPrice) {
        errors.dayPrice = "Cannot be empty";
      }
      if (!values.numberOfPerson) {
        errors.numberOfPerson = "Cannot be empty";
      }
      
      // Add more validation logic as needed
      return errors;
    },
  });

  return (
    <div className="p-5">
      <form onSubmit={formik.handleSubmit}>
        {/* <div className="w-full md:w-full p-1">
             
              <div style={{ margin: "11px 0px 0px 0px" }}>
                <CustomSelect
                  id="discountType"
                  name="discountType"
                  label="Discount Type"
                  options={GBPOptions}
                  formikProps={formik}
                  showvalue
                  size="small"
                />
            </div>
          </div> */}

        <CustomInput
          // type={"date"}
          id="name"
          name="name"
          label=" Name"
          variant="outlined"
          fullWidth
          formikProps={formik}
          size
        />

        <CustomInput
          placeholder="Day Price"
          // type={"date"}
          id="dayPrice"
          name="dayPrice"
          label="Day Price"
          variant="outlined"
          fullWidth
          formikProps={formik}
          size
        />
        <CustomInput
          placeholder="Number Of Person"
          // type={"date"}
          id="numberOfPerson"
          name="numberOfPerson"
          label="Number Of Person"
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

export default MyForm;
