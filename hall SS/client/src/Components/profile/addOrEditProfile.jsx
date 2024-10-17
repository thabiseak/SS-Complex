import React, { useState } from "react";
import { useFormik } from "formik";
import { editAPI } from "../../service/api";
import { toast } from "react-toastify";
import { convertFileToBase64, isBase64 } from "../core/files/fileUtils";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
});

function App({ AllData }) {
  const [Loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    var mainImage = formik.values.image;
    var base64ProfileImage = "";
    if (mainImage) {
      if (isBase64(mainImage)) {
        base64ProfileImage = mainImage;
      } else {
        base64ProfileImage = await convertFileToBase64(mainImage);
      }
    }

    let obj = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      description: values.description,
      dob: values.dob,
      image: base64ProfileImage,
    };

    // Handle form submission here
    editAPI("auth/" + AllData._id, obj)
      .then((resp) => {
        toast.success("Successfully Updated!");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.error || "somthing went wrong");
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      firstName: AllData.firstName,
      lastName: AllData.lastName,
      email: AllData.email,
      description: AllData.description,
      dob: AllData.dob,
      image: AllData.image,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <div className="flex flex-col items-center justify-center">
          <label
            htmlFor="image"
            className="w-64 h-64 border-2 border-dashed border-gray-300 flex items-center justify-center relative transition-colors duration-300 cursor-pointer"
          >
            <input
              id="image"
              name="image"
              type="file"
              className="absolute inset-0 opacity-0 z-10 cursor-pointer"
              onChange={handleImageChange}
            />
            {!formik.values.image && (
              <div className="text-4xl text-gray-500">
                <i className="fas fa-cloud-upload-alt"></i>
              </div>
            )}

            {formik.values.image && typeof formik.values.image === "object" && (
              <img
                src={URL.createObjectURL(formik.values.image)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )}
            {formik.values.image && typeof formik.values.image === "string" && (
              <img
                alt="Preview"
                className="w-full h-full object-cover"
                src={`data:image/png;base64,${formik.values.image}`}
              />
            )}
          </label>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="font-blod text-md ">First Name</div>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            className="p-2 border text-sm border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          <div className="font-blod text-sm text-red-400 ps-2 ">
            {formik.errors.firstName}
          </div>
          <div className="font-blod text-md ">Last Name</div>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          <div className="font-blod text-sm text-red-400 ps-2 ">
            {formik.errors.lastName}
          </div>
          <div className="font-blod text-md ">Email</div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <div className="font-blod text-sm text-red-400 ps-2 ">
            {formik.errors.email}
          </div>

          <div className="font-blod text-md ">Date of Birth</div>
          <input
            id="dob"
            name="dob"
            type="date"
            placeholder="DOB"
            className="text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
            value={formik.values.dob}
          />
          <div className="font-blod text-md ">About</div>
          <textarea
            id="description"
            name="description"
            type="textarea"
            placeholder="Last Name"
            className="text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white rounded "
          style={{ background: "#01959a" }}
        >
          {Loading ? "Loading" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default App;
