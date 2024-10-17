import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addAPI, deleteAPI, editAPI, getAPI } from "../../../service/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";

{
  /* <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      ></form> */
}
// const AllDate = [
//   new Date("2024-05-27T00:00:00.000Z"),
//   new Date("2024-06-27T00:00:00.000Z"),
//   new Date("2024-07-27T00:00:00.000Z"),
//   new Date("2024-08-27T00:00:00.000Z"),
//   new Date("2024-11-27T00:00:00.000Z"),
//   new Date("2024-12-27T00:00:00.000Z"),
// ];
const NewForm = () => {
  const generatePDF = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      html2pdf(element);
    } else {
      console.error(`Element with id ${elementId} not found.`);
    }
  };
  const { id } = useParams();
  const [Edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [AllEmployeeSetupData, setAllEmployeeSetupData] = useState({});

  useEffect(() => {}, []);

  const validationSchema = Yup.object().shape({
    employeeSex: Yup.string().required("Employee sex is required"),
    employeeDressCode: Yup.string().required("employee dresscode is required"),
    theme: Yup.string().required("theme is required"),
    themeExtraInfo: Yup.string().required("Theme Extra Info is required"),
  });

  const getAllHallId = async () => {
    try {
      getAPI("employee-setup/bookingId/" + id)
        .then((resp) => {
          let sample = [];
          sample = resp.data;
          setAllEmployeeSetupData(sample);
          setLoading(false);
          if (sample && sample._id) {
            setEdit(true);
          }
        })
        .catch((err) => {
          setAllEmployeeSetupData({});
        });
    } catch (error) {}
  };

  useEffect(() => {
    getAllHallId();
    // console.log(Formik);
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userDataString = JSON.parse(localStorage.getItem("userData")) || "";
      let userID = userDataString._id || "NOID";

      const customerId = userID; // Your customerId value
      const obj = { ...values, customerId, bookingId: id };
      console.log(obj);
      if (Edit) {
        editAPI("employee-setup/" + obj.currentId, obj)
          .then((resp) => {
            toast.success("Successfully Added   !  ");

            redirectPage();
          })
          .catch((err) => toast.error(err.error || "somthing went wrong"));
      } else {
        addAPI("employee-setup", obj)
          .then((resp) => {
            toast.success("Successfully Added   !  ");

            redirectPage();
          })
          .catch((err) => toast.error(err.error || "somthing went wrong"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("somthing went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  const navigate = useNavigate();

  const redirectPage = () => {
    navigate(`/profile/booking`);
  };
  const handledelete = () => {
    if (AllEmployeeSetupData && AllEmployeeSetupData._id) {
      deleteAPI("employee-setup/" + AllEmployeeSetupData._id)
        .then((resp) => {
          toast.success("Successfully deleted!");
        })
        .catch((err) => toast.error("something went wrong."));
    }
  };
  return (
    <div className="max-w-2xl mx-auto  border-gray-300 p-5">
      <h1 className="font-bold">Employee Setup</h1>
      <br />
      {!Loading && (
        <Formik
          initialValues={{
            employeeSex: AllEmployeeSetupData
              ? AllEmployeeSetupData.employeeSex
              : "", // Add employeeSex field
            employeeDressCode: AllEmployeeSetupData
              ? AllEmployeeSetupData.employeeDressCode
              : "", // Add employeeDressCode field
            theme: AllEmployeeSetupData ? AllEmployeeSetupData.theme : "", // Add theme field
            themeExtraInfo: AllEmployeeSetupData
              ? AllEmployeeSetupData.themeExtraInfo
              : "", // Add themeExtraInfo field
            currentId: AllEmployeeSetupData ? AllEmployeeSetupData._id : "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {/* Employee Sex Field */}
              <div id={`feedback-2`}>
                <div className="mb-4">
                  <label htmlFor="employeeSex" className="block mb-1">
                    Employee Gender
                  </label>
                  <Field
                    as="select"
                    id="employeeSex"
                    name="employeeSex"
                    className="block w-full border rounded-md px-3 py-2"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage
                    name="employeeSex"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Employee Dress Code Field */}
                <div className="mb-4">
                  <label htmlFor="employeeDressCode" className="block mb-1">
                    Employee Dress Code
                  </label>
                  <Field
                    type="text"
                    id="employeeDressCode"
                    name="employeeDressCode"
                    className="block w-full border rounded-md px-3 py-2"
                  />
                  <ErrorMessage
                    name="employeeDressCode"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Theme Field */}
                <div className="mb-4">
                  <label htmlFor="theme" className="block mb-1">
                    Theme
                  </label>
                  <Field
                    type="text"
                    id="theme"
                    name="theme"
                    className="block w-full border rounded-md px-3 py-2"
                  />
                  <ErrorMessage
                    name="theme"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Theme Extra Info Field */}
                <div className="mb-4">
                  <label htmlFor="themeExtraInfo" className="block mb-1">
                    Theme Extra Info
                  </label>
                  <Field
                    type="text"
                    id="themeExtraInfo"
                    name="themeExtraInfo"
                    className="block w-full border rounded-md px-3 py-2"
                  />
                  <ErrorMessage
                    name="themeExtraInfo"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {Edit ? "Edit" : " Submit"}
              </button>
              {AllEmployeeSetupData && AllEmployeeSetupData._id && (
                <button
                  type="button"
                  onClick={() => handledelete()}
                  className="bg-red-500 text-white px-4 m-2 py-2 rounded-md hover:bg-gray-600"
                >
                  Delete
                </button>
              )}
              {AllEmployeeSetupData && AllEmployeeSetupData._id && (
                <button
                  type="button"
                  onClick={() => generatePDF(`feedback-2`)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  DownLoad pdf
                </button>
              )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default NewForm;
