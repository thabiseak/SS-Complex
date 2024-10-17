import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addAPI, editAPI, getAPI } from "../../../service/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";
import CreateUpdatePaymentForm from "./CreateUpdatePaymentForm";
import { Button, Dialog } from "@mui/material";

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
  desiredPhotography: Yup.string().required("Desired photography is required"),
  // additionalService: Yup.string().required("Additional service is required"),
  // package: Yup.string().required("Package is required"),
  remarks: Yup.string().required("Remarks is required"),
});

const CreateUpdatePhotographyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [edit, setEdit] = useState(id === "add" ? false : true);
  const [fetchedData, setFetchedData] = useState(null);
  const [AllData, setAllData] = useState(null);
  const [Loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [Booking, setBooking] = useState({});

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    if (id === "add") {
      let obj = { ...values };
      setBooking(obj);
      handleClickOpen(obj);
    } else {
      const userDataString = JSON.parse(localStorage.getItem("userData")) || "";
      let userID = userDataString._id || "NOID";

      const customerId = userID; // Your customerId value
      const obj = { ...values, customerId };
      editAPI("photography/" + AllData._id, obj)
        .then((resp) => {
          toast.success("Updated Added!");
          navigate("/profile/photography");
        })
        .catch((err) => toast.error(err.error || "somthing went wrong"));
    }
  };

  const fetchAllData = () => {
    if (id != "add") {
      try {
        const userDataString =
          JSON.parse(localStorage.getItem("userData")) || "";
        let userID = userDataString._id || "NOID";

        const customerId = userID; // Your customerId value
        console.log(customerId);
        // getAPI("bookings/customer/"+customerId)
        getAPI("photography/" + id)
          .then((resp) => {
            let sample = [];
            sample = resp.data;
            setAllData(sample);
            setLoading(false);
          })
          .catch((err) => setAllData([]));
      } catch (error) {
        setAllData([]);
      }
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllData();
  }, []);

  // const handleSubmit = async (values, { setSubmitting }) => {
  //   const userDataString = JSON.parse(localStorage.getItem("userData")) || "";
  //   let userID = userDataString._id || "NOID";

  //   const customerId = userID; // Your customerId value
  //   console.log(customerId);
  //   const obj = { ...values, customerId };
  //   console.log(obj);
  //   try {
  //     if (edit) {
  // editAPI("photography/" + AllData._id, obj)
  //   .then((resp) => {
  //     toast.success("Updated Added!");
  //     navigate("/profile/photography");
  //   })
  //   .catch((err) => toast.error(err.error || "somthing went wrong"));
  //     } else {
  //       addAPI("photography", obj)
  //         .then((resp) => {
  //           toast.success("Successfully Added!");
  //           navigate("/profile/photography");
  //         })
  //         .catch((err) => toast.error(err.error || "somthing went wrong"));
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     toast.error("somthing went wrong");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };
  const TypeOfEventList = [
    {
      id: "Wedding ",
      value: "Wedding",
    },
    {
      id: " Puberty",
      value: "Puberty",
    },
    {
      id: "Birthday",
      value: "Birthday",
    },
  ];
  const ContactMethodList = [
    {
      id: "Phone Number",
      value: "Phone Number",
    },
    {
      id: "Email",
      value: "Email",
    },
  ];
  const DesiredList = [
    {
      id: "Wedding photography",
      value: "Wedding photography",
    },
    {
      id: "Event photography",
      value: "Event photography",
    },
    {
      id: "Commercial photography",
      value: "Commercial photography",
    },
  ];
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br /> <br />
      <br />
      <br />
      <div className="max-w-2xl mx-auto w-full border-gray-300 p-5">
        {!Loading && (
          <Formik
            initialValues={{
              amount: 10000,
              name: edit ? AllData && AllData.name : "",
              email: edit ? AllData && AllData.email : "",
              mobile: edit ? AllData && AllData.mobile : "",
              address: edit ? AllData && AllData.address : "",
              typeOfEvent: edit ? AllData && AllData.typeOfEvent : "",
              eventDate: edit ? AllData && AllData.eventDate : "",
              contactMethod: edit ? AllData && AllData.contactMethod : "",
              totalGuest: edit ? AllData && AllData.totalGuest : "",
              preferredSession: edit ? AllData && AllData.preferredSession : "",
              desiredPhotography: edit
                ? AllData && AllData.desiredPhotography
                : "",

              package: edit ? AllData && AllData.package : "",
              remarks: edit ? AllData && AllData.remarks : "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleChange }) => (
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
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(
                        /[^A-Za-z ]/g,
                        ""
                      );
                    }}
                  />
                  <label htmlFor="name" className="block mb-1">
                    Amount
                  </label>
                  <Field
                    type="text"
                    id="amount"
                    name="amount"
                    className="block w-full border rounded-md px-3 py-2"
                    disabled
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
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
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
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
                    onInput={(e) => {
                      let cleanedValue = e.target.value; // Get the input value
                      // Ensure first three characters are alphanumeric
                      let firstThree = cleanedValue
                        .substring(0, 3)
                        .replace(/[^A-Za-z0-9]/g, "");
                      // Remove non-letter characters for the rest of the address
                      let rest = cleanedValue
                        .substring(3)
                        .replace(/[^A-Za-z]/g, "");

                      // Check if the first three characters are empty
                      if (firstThree.length === 0) {
                        // If empty, make the first three characters as they are (no change)
                        firstThree = e.target.value.substring(0, 3);
                        // Ensure the rest of the address contains only letters
                        rest = e.target.value
                          .substring(3)
                          .replace(/[^A-Za-z]/g, "");
                      } else {
                        // If not empty, ensure the rest contains only letters
                        rest = rest.replace(/[^A-Za-z]/g, "");
                      }

                      // Update the input value with the cleaned first three characters followed by the cleaned rest
                      e.target.value = firstThree + rest;
                    }}
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
                    as="select"
                    id="typeOfEvent"
                    name="typeOfEvent"
                    className="w-full border rounded py-2 px-3 text-sm"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="">Select an option</option>
                    {TypeOfEventList &&
                      TypeOfEventList.length > 0 &&
                      TypeOfEventList.map((item, i) => (
                        <>
                          <option value={item.id}>{item.value}</option>
                        </>
                      ))}
                    {/* <option value="Card">Card</option>
                  <option value="Cash">Cash</option> */}
                  </Field>

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
                    as="select"
                    id="contactMethod"
                    name="contactMethod"
                    className="w-full border rounded py-2 px-3 text-sm"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="">Select an option</option>
                    {ContactMethodList &&
                      ContactMethodList.length > 0 &&
                      ContactMethodList.map((item, i) => (
                        <>
                          <option value={item.id}>{item.value}</option>
                        </>
                      ))}
                  </Field>
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
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                  />
                  <ErrorMessage
                    name="totalGuest"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Preferred Session Field */}

                {/* Desired Photography Field */}
                <div className="mb-4">
                  <label htmlFor="desiredPhotography" className="block mb-1">
                    Desired Photography
                  </label>

                  <Field
                    as="select"
                    id="desiredPhotography"
                    name="desiredPhotography"
                    className="w-full border rounded py-2 px-3 text-sm"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="">Select an option</option>
                    {DesiredList &&
                      DesiredList.length > 0 &&
                      DesiredList.map((item, i) => (
                        <>
                          <option value={item.id}>{item.value}</option>
                        </>
                      ))}
                  </Field>
                  <ErrorMessage
                    name="desiredPhotography"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* Package Field */}
                {/* <div className="mb-4">
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
                </div> */}

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
                  {edit ? " Update" : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        style={{ zIndex: "9999" }}
        maxWidth="lg"
      >
        <CreateUpdatePaymentForm handleClose={handleClose} Booking={Booking} />
      </Dialog>
    </div>
  );
};
export default CreateUpdatePhotographyForm;
