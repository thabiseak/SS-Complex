import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addAPI, deleteAPI, editAPI, getAPI } from "../../../service/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Select from "react-select";

const NewForm = () => {
  const { id } = useParams();
  const [Edit, setEdit] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [AllEmployeeSetupData, setAllEmployeeSetupData] = useState({});
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const validationSchema = Yup.object().shape({
    employeeSex: Yup.string().required("Employee sex is required"),
    employeeDressCode: Yup.string().required("employee dresscode is required"),
    theme: Yup.string().required("theme is required"),
    themeExtraInfo: Yup.string().required("Theme Extra Info is required"),
  });

  useEffect(() => {
    getAllEvent();
  }, []);

  const getAllEvent = async () => {
    try {
      getAPI("event")
        .then(async (resp) => {
          let sample = await resp.data;
          const formattedData = sample.map(event => ({
            value: event.id,
            label: `${event.eventName} - $${event.price}`
          }));
          setEvents(formattedData);

          // setEvents(sample);

          // If default values are provided from backend, set them as selectedEvents
          const defaultSelectedEvents = sample.filter(
            (event) => event.isSelected
          );
          setSelectedEvents(
            defaultSelectedEvents.map((event) => ({
              value: event.id,
              label: `${event.eventName} - $${event.Price}`,
            }))
          );

          setLoading(false);
        })
        .catch((err) => {
          setAllEmployeeSetupData({});
        });
    } catch (error) {}
  };

  const getAllHallId = async () => {
    try {
      getAPI("event" + id)
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
  const handleEventSelection = (selectedOptions) => {
    setSelectedEvents(selectedOptions);
  };

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
      <h1 className="font-bold">event planming</h1>
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
            selectedEvents: selectedEvents,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, setFieldValue }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {/* Employee Sex Field */}
              {events && events.length > 0 && (
                <Select
                  options={
                    events &&
                    events.map((event) => ({
                      value: event.id,
                      label: `${event.eventName} - $${event.Price}`,
                    }))
                  }
                  value={selectedEvents}
                  isMulti
                  onChange={handleEventSelection}
                  placeholder="Select events..."
                />
              )}
              {JSON.stringify(events)}

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
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Delete
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
