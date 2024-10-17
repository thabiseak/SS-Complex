import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import CustomSelect from "../../core/select";
import CustomInput from "../../core/input";
import FormikDatePicker from "../../core/dateInput";
import { addAPI, editAPI, getAPI } from "../../../service/api";
import toast, { Toaster } from "react-hot-toast";
import CustomImageInput from "../../core/imagesInput";
import { convertFileToBase64, isBase64 } from "../../core/fileUtils";

const MyForm = ({ edit, AllData, handleClose, onGridReady }) => {
  const [vehicleCategoryOptions, setVehicleCategoryOptions] = useState([]);
  const [Loading, setLoading] = useState(true);
  const ChangeCategoryArray = () => {
    getAPI("course")
      .then((resp) => {
        let sample = [];
        sample = resp.data;
        let transformedArray = sample.map((item) => ({
          value: item._id,
          label: item.courseName,
        }));
        setLoading(false);
        setVehicleCategoryOptions(transformedArray);
      })
      .catch((err) => {
        setVehicleCategoryOptions([]);
      });
  };
  useEffect(() => {
    ChangeCategoryArray();
  }, []);

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
    levelName: edit ? AllData && AllData.levelName : "",
    levelDescription: edit ? AllData && AllData.levelDescription : "",
    levelImage: edit ? AllData && AllData.levelImage : "",
    courseName: edit
      ? AllData && AllData.courseID && AllData.courseID.courseName
      : "",
    courseID: edit ? AllData && AllData.courseID && AllData.courseID._id : "",
    levelMaterialImage: edit ? AllData && AllData.levelMaterialImage : "",
    levelMaterialTexts: edit ? AllData && AllData.levelMaterialTexts : "",
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 string from Data URL
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const postPromoCode = async (data) => {
    let obj = {};
    obj = data;
    // single image
    var base64dlevelImage = "";
    if (data.levelImage) {
      if (isBase64(data.levelImage)) {
        base64dlevelImage = data.levelImage;
      } else {
        base64dlevelImage = await convertFileToBase64(data.levelImage);
      }
    }
    // levelMaterialImage
    let images = data.levelMaterialImage;
    const imagePromises = [];

    // Check if data.levelMaterialImage exists and is a FileList
    if (images instanceof FileList) {
      // Convert FileList to an array
      images = Array.from(images);

      // Convert each selected image to Base64 string
      const imagePromises = images.map((image) => {
        return convertFileToBase64(image).then((base64String) => {
          console.log(base64String, "testing"); // Log the resolved base64 string
          return base64String; // Return the base64 string
        });
      });
      Promise.all(imagePromises)
        .then((base64Images) => {
          // Now base64Images will contain an array of Base64 strings
          console.log(base64Images, "All images converted to Base64");
          obj.levelMaterialImage = base64Images; // Assign base64Images to obj.base64MaterialStrings
          obj.levelImage = base64dlevelImage; // Assuming levelImage is the first image in the array

          // Make the API call after all image conversions are complete
          addAPI("level", obj)
            .then((resp) => {
              toast.success("Successfully Added!");
              handleClose();
              onGridReady();
            })
            .catch((err) => toast.error("Image long size"));
        })
        .catch((error) => {
          console.error("Error converting images to Base64:", error);
        });
    }

    // Wait for all image conversions to complete
  };
  const putPromoCode = async (data) => {
    console.log(data, "dataa");
    let obj = {};
    obj = data;
    let images = data.levelMaterialImage;
    var base64dlevelImage = "";

    if (data.levelImage) {
      if (isBase64(data.levelImage)) {
        base64dlevelImage = data.levelImage;
      } else {
        alert(3);
        base64dlevelImage = await convertFileToBase64(data.levelImage);
      }
    }

    if (images instanceof FileList) {
      // Convert FileList to an array
      images = Array.from(images);

      // Convert each selected image to Base64 string
      const imagePromises = images.map((image) => {
        return convertFileToBase64(image).then((base64String) => {
          console.log(base64String, "testing"); // Log the resolved base64 string
          return base64String; // Return the base64 string
        });
      });
      Promise.all(imagePromises)
        .then((base64Images) => {
          // Now base64Images will contain an array of Base64 strings
          console.log(base64Images, "All images converted to Base64");
          obj.levelMaterialImage = base64Images; // Assign base64Images to obj.base64MaterialStrings
          obj.levelImage = base64dlevelImage; // Assuming levelImage is the first image in the array

          // Make the API call after all image conversions are complete
          editAPI("level/" + AllData._id, obj)
            .then((resp) => {
              toast.success("Successfully edited!");
              onGridReady();
              handleClose();
            })
            .catch((err) => toast.error("Image long size"));
        })
        .catch((error) => {
          console.error("Error converting images to Base64:", error);
        });
    } else {
      obj.levelImage = base64dlevelImage;
      obj.levelMaterialImage = images;
      console.log(obj);
      editAPI("level/" + AllData._id, obj)
        .then((resp) => {
          toast.success("Successfully edited!");
          onGridReady();
          handleClose();
        })
        .catch((err) => toast.error("Image long size"));
    }
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
      if (!values.courseID) {
        errors.courseID = "Cannot be empty";
      }
      if (!values.levelName) {
        errors.levelName = "Cannot be empty";
      }
      if (!values.levelDescription) {
        errors.levelDescription = "Cannot be empty";
      }
      if (!values.levelImage) {
        errors.levelImage = "Cannot be empty";
      }
      if (!values.levelMaterialImage) {
        errors.levelMaterialImage = "Cannot be empty";
      }
      if (!values.levelMaterialTexts) {
        errors.levelMaterialTexts = "Cannot be empty";
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
        {/* {JSON.stringify(formik.values.courseID)} */}
        <CustomSelect
          disabled={Loading}
          id="courseID"
          name="courseID"
          // label={Edit ? formik.values.courseName || "" : "Vehicle Category"}
          label="Course Name"
          options={vehicleCategoryOptions}
          formikProps={formik}
          showvalue
          size="small"
        />

        <CustomInput
          // type={"date"}
          id="levelName"
          name="levelName"
          label="Level Name"
          variant="outlined"
          fullWidth
          formikProps={formik}
          size
        />

        <CustomInput
          placeholder="levelDescription"
          // type={"date"}
          id="levelDescription"
          name="levelDescription"
          label="Level Description"
          variant="outlined"
          fullWidth
          formikProps={formik}
          size
        />
        <CustomInput
          placeholder="levelMaterialTexts"
          // type={"date"}
          id="levelMaterialTexts"
          name="levelMaterialTexts"
          label="Reading Material Texts"
          variant="outlined"
          fullWidth
          formikProps={formik}
          size
        />

        <div className="flex justify-center w-full md:w-full   p-1 mt-1">
          <CustomImageInput
            edit={!edit}
            onChange={(event) => {
              formik.setFieldValue("levelImage", event.currentTarget.files[0]);
            }}
            picture={formik.values.levelImage}
            label="add level cover image "
            name="levelImage"
            id="levelImage"
            formikProps={formik}
            labelstyle={{
              height: "106px",
            }}
            accept="image/*"
          />
        </div>

        <div className="flex justify-center w-full md:w-full   p-1 mt-1">
          <CustomImageInput
            edit={!edit}
            onChange={(event) => {
              formik.setFieldValue(
                "levelMaterialImage",
                event.currentTarget.files
              );
            }}
            picture={formik.values.levelMaterialImage}
            label="add level material  "
            name="levelMaterialImage"
            id="levelMaterialImage"
            formikProps={formik}
            labelstyle={{
              height: "106px",
            }}
            multiple
          />
        </div>
        {/* Add other form fields as needed */}
        <br />
        <div className="flex justify-center w-full">
          <Button
            disabled={Loading}
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
