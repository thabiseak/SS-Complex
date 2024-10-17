import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addAPI, editAPI, getAPI } from "../../../service/api";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobile: Yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  methodOfContact: Yup.string().required('Method of contact is required'),
  typeOfService: Yup.string().required('Type of service is required'),
  preferredStyle: Yup.string().required('Preferred style is required'),
  allergies: Yup.string().required('Allergies is required'),
  dateAndTime: Yup.string().required('Date and time is required').test(
    'is-after-or-equal',
    'Date and time must be today or later',
    function (value) {
      const todaySL = new Date();
      todaySL.setHours(0, 0, 0, 0); // Set time to midnight
      const dateAndTime = new Date(value);
      return dateAndTime >= todaySL;
    }
  ),
  serviceDuration: Yup.string().required('Service duration is required'),
  additionalService: Yup.string().required('Additional service is required'),
  remarks: Yup.string().required('Remarks is required'),
});

const CreateUpdateBookingForm = ({
  edit,
  AllData,
  handleClose,
  onGridReady,
}) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [Loading, setLoading] = useState(true);
  const fetchDataFromDatabase = async () => {
    // Simulated fetch data function
    // getAPI("beautician")
    // .then((resp) => {
    //   let sample = [];
    //   sample = resp.data;
    //   console.log(sample, "-----------");
    //   setFetchedData(sample[0]);
    //   setLoading(false);
    // })
    // .catch((err) => {
    //   setFetchedData([]);
    // });
  };
  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    const userDataString = JSON.parse(localStorage.getItem("userData")) || "";
    let userID = userDataString._id || "NOID";

    const customerId = userID; // Your customerId value
    console.log(customerId);
    const obj = { ...values, customerId };
    console.log(obj);
    try {
      if (edit) {
        editAPI("beautician/"+ AllData._id,obj)
          .then((resp) => {
            toast.success("Updated Added!");
            handleClose();
            onGridReady();
          })
          .catch((err) => toast.error(err.error || "somthing went wrong"));
      } else {
        addAPI("beautician", obj)
          .then((resp) => {
            toast.success("Successfully Added!");
            handleClose();
            onGridReady();
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

  return (
    <div className="max-w-2xl mx-auto w-full border-gray-300 p-5">
     <Formik
  initialValues={{
    name: edit ? AllData && AllData.name : "",
    email: edit ? AllData && AllData.email : "",
    mobile: edit ? AllData && AllData.mobile : "",
    methodOfContact: edit ? AllData && AllData.methodOfContact : "",
    typeOfService: edit ? AllData && AllData.typeOfService : "",
    preferredStyle: edit ? AllData && AllData.preferredStyle : "",
    allergies: edit ? AllData && AllData.allergies : "",
    dateAndTime: edit ? AllData && AllData.dateAndTime : "",
    serviceDuration: edit ? AllData && AllData.serviceDuration : "",
    additionalService: edit ? AllData && AllData.additionalService : "",
    remarks: edit ? AllData && AllData.remarks : "",
  }}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ isSubmitting }) => (
    <Form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-500"
      style={{ width: "500px" }}
    >
      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">
          Name
        </label>
        <Field
          type="text"
          id="name"
          name="name"
          className="block w-full border rounded-md px-3 py-2"
        />
        <ErrorMessage
          name="name"
          component="div"
          className="text-red-500"
        />
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <Field
          type="email"
          id="email"
          name="email"
          className="block w-full border rounded-md px-3 py-2"
        />
        <ErrorMessage
          name="email"
          component="div"
          className="text-red-500"
        />
      </div>

      {/* Mobile Field */}
      <div className="mb-4">
        <label htmlFor="mobile" className="block mb-1">
          Mobile
        </label>
        <Field
          type="text"
          id="mobile"
          name="mobile"
          className="block w-full border rounded-md px-3 py-2"
        />
        <ErrorMessage
          name="mobile"
          component="div"
          className="text-red-500"
        />
      </div>

      {/* Method of Contact Field */}
      <div className="mb-4">
        <label htmlFor="methodOfContact" className="block mb-1">
          Method of Contact
        </label>
        <Field
          type="text"
          id="methodOfContact"
          name="methodOfContact"
          className="block w-full border rounded-md px-3 py-2"
        />
        <ErrorMessage
          name="methodOfContact"
          component="div"
          className="text-red-500"
        />
      </div>

      {/* Type of Service Field */}
      <div className="mb-4">
        <label htmlFor="typeOfService" className="block mb-1">
          Type of Service
        </label>
        <Field
          type="text"
          id="typeOfService"
          name="typeOfService"
          className="block w-full border rounded-md px-3 py-2"
        />
        <ErrorMessage
          name="typeOfService"
          component="div"
          className="text-red-500"
        />
      </div>

      {/* Preferred Style Field */}
      <div className="mb-4">
        <label htmlFor="preferredStyle" className="block mb-1">
          Preferred Style
        </label>
        <Field
          type="text"
          id="preferredStyle"
          name="preferredStyle"
          className="block w-full border rounded-md px-3 py-2"
        />
        <ErrorMessage
          name="preferredStyle"
          component="div"
          className="text-red-500"
        />
      </div>

      {/* Allergies Field */}
      <div className="mb-4">
        <label htmlFor="allergies" className="block mb-1">
          Allergies
        </label>
        <Field
          type="text"
          id="allergies"
          name="allergies"
          className="block w-full border rounded-md px-3 py-2"
        />
        <ErrorMessage
          name="allergies"
          component="div"
          className="text-red-500"
        />
      </div>

      {/* Date and Time Field */}
      <div className="mb-4">
        <label htmlFor="dateAndTime" className="block mb-1">
          Date and Time
        </label>
        <Field
          type="date"
          id="dateAndTime"
          name="dateAndTime"
          className="block w-full border rounded-md px-3 py-2"
        />
        <ErrorMessage
          name="dateAndTime"
          component="div"
          className="text-red-500"
        />
      </div>

      {/* Service Duration Field */}
      <div className="mb-4">
        <label htmlFor="serviceDuration" className="block mb-1">
          Service Duration
        </label>
        <Field
          type="text"
          id="serviceDuration"
          name="serviceDuration"
          className="block w-full border rounded-md px-3 py-2"
        />
        <ErrorMessage
          name="serviceDuration"
          component="div"
          className="text-red-500"
        />
      </div>

      {/* Additional Service Field */}
      <div className="mb-4">
        <label htmlFor="additionalService" className="block mb-1">
          Additional Service
        </label>
        <Field
          type="text"
          id="additionalService"
          name="additionalService"
          className="block w-full border rounded-md px-3 py-2"
        />
        <ErrorMessage
          name="additionalService"
          component="div"
          className="text-red-500"
        />
      </div>

      {/* Remarks Field */}
      <div className="mb-4">
        <label htmlFor="remarks" className="block mb-1">
          Remarks
        </label>
        <Field
          type="text"
          id="remarks"
          name="remarks"
          className="block w-full border rounded-md px-3 py-2"
        />
        <ErrorMessage
          name="remarks"
          component="div"
          className="text-red-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </Form>
  )}
</Formik>
    </div>
  );
};
export default CreateUpdateBookingForm;

