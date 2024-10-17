import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addAPI, editAPI, getAPI } from "../../../service/api";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  address: Yup.string().required("Address is required"),
  typeOfEvent: Yup.string().required("Type of event is required"),
  eventDate: Yup.string()
    .required("Event date is required")
    .test(
      "is-after-or-equal",
      "Event date must be today or later",
      function (value) {
        const todaySL = new Date();
        todaySL.setHours(0, 0, 0, 0); // Set time to midnight
        const eventDate = new Date(value);
        return eventDate >= todaySL;
      }
    ),
  contactMethod: Yup.string().required("Contact method is required"),
  totalGuest: Yup.number()
    .required("Total guest count is required")
    .positive()
    .integer(),
  preferredSession: Yup.string().required("Preferred session is required"),
  desiredPhotography: Yup.string().required("Desired photography is required"),
  additionalService: Yup.string().required("Additional service is required"),
  package: Yup.string().required("Package is required"),
  remarks: Yup.string().required("Remarks is required"),
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
    // getAPI("photography")
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
        editAPI("photography/" + AllData._id, obj)
          .then((resp) => {
            toast.success("Updated Added!");
            handleClose();
            onGridReady();
          })
          .catch((err) => toast.error(err.error || "somthing went wrong"));
      } else {
        addAPI("photography", obj)
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
          address: edit ? AllData && AllData.address : "",
          typeOfEvent: edit ? AllData && AllData.typeOfEvent : "",
          eventDate: edit ? AllData && AllData.eventDate : "",
          contactMethod: edit ? AllData && AllData.contactMethod : "",
          totalGuest: edit ? AllData && AllData.totalGuest : "",
          preferredSession: edit ? AllData && AllData.preferredSession : "",
          desiredPhotography: edit ? AllData && AllData.desiredPhotography : "",
          additionalService: edit ? AllData && AllData.additionalService : "",
          package: edit ? AllData && AllData.package : "",
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

            {/* Address Field */}
            <div className="mb-4">
              <label htmlFor="address" className="block mb-1">
                Address
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Type of Event Field */}
            <div className="mb-4">
              <label htmlFor="typeOfEvent" className="block mb-1">
                Type of Event
              </label>
              <Field
                type="text"
                id="typeOfEvent"
                name="typeOfEvent"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="typeOfEvent"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Event Date Field */}
            <div className="mb-4">
              <label htmlFor="eventDate" className="block mb-1">
                Event Date
              </label>
              <Field
                type="date"
                id="eventDate"
                name="eventDate"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="eventDate"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Contact Method Field */}
            <div className="mb-4">
              <label htmlFor="contactMethod" className="block mb-1">
                Contact Method
              </label>
              <Field
                type="text"
                id="contactMethod"
                name="contactMethod"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="contactMethod"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Total Guest Field */}
            <div className="mb-4">
              <label htmlFor="totalGuest" className="block mb-1">
                Total Guest
              </label>
              <Field
                type="text"
                id="totalGuest"
                name="totalGuest"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="totalGuest"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Preferred Session Field */}
            <div className="mb-4">
              <label htmlFor="preferredSession" className="block mb-1">
                Preferred Session
              </label>
              <Field
                type="text"
                id="preferredSession"
                name="preferredSession"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="preferredSession"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Desired Photography Field */}
            <div className="mb-4">
              <label htmlFor="desiredPhotography" className="block mb-1">
                Desired Photography
              </label>
              <Field
                type="text"
                id="desiredPhotography"
                name="desiredPhotography"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="desiredPhotography"
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

            {/* Package Field */}
            <div className="mb-4">
              <label htmlFor="package" className="block mb-1">
                Package
              </label>
              <Field
                type="text"
                id="package"
                name="package"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="package"
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
