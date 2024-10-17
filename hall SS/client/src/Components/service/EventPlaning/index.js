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
  const [selectedEventsId, setSelectedEventsId] = useState([]);

  const [Inventorys, setInventorys] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState([]);
  const [selectedInventoryId, setSelectedInventoryId] = useState([]);

  const [wantSecurity, setWantSecurity] = useState(false);

  const handleSecurityChange = (event) => {
    setWantSecurity(event.target.value === "yes");
  };

  const validationSchema = Yup.object().shape({
    // selectedEvents: Yup.array().min(1, "Please select at least one event"),
    wantSecurity: Yup.boolean().required(
      "Please select if you want security or not"
    ),
  });

  // useEffect(() => {
  //   getAllEventBookingid();
  // }, []);

  useEffect(() => {
    getAllEvent();
    getAllInventory();
  }, []);
  const getAllInventory = async () => {
    try {
      const resp = await getAPI("inventory");
      const sampless = resp.data;
      const formattedData = sampless.map((event) => ({
        value: event._id,
        label: `${event.itemName} - $${event.TotalCost}`,
      }));
      setInventorys(formattedData);

      // If default values are provided from backend, set them as selectedEvents
      try {
        getAPI("event-plan/bookingId/" + id)
          .then((resp) => {
            let sample = [];
            sample = resp.data;
            setAllEmployeeSetupData(sample);
            setLoading(false);
            console.log(sample, "sample");
            setWantSecurity(sample.security);
            if (sample && sample._id) {
              setSelectedInventoryId(sample.TotalInventory);
              console.log("1111");

              const eventIds = sample.TotalInventory;
              console.log(eventIds, formattedData);
              const selectedEventsData = eventIds.map((eventId) => {
                // Find the event with the matching ID
                const event = formattedData.find((e) => {
                  console.log("Value of e:", e);
                  return e.value === eventId;
                });
                console.log("Value of e:", event);

                // If event is found, return object with value and label properties
                console.log(event);
                if (event) {
                  return {
                    value: event.value,
                    label: event.label,
                  };
                }
                // If event is not found, return null
                return null;
              });
              console.log(selectedEventsData, events);

              setSelectedInventory(
                selectedEventsData.filter((event) => event !== null)
              );

              // setFieldValue(
              //   "selectedEvents",
              //   selectedEventsData.filter((event) => event !== null)
              // );

              setEdit(true);
            }
          })
          .catch((err) => {
            setAllEmployeeSetupData({});
          });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Failed to fetch events");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events");
    }
  };

  // Fetch events from API
  const getAllEvent = async () => {
    try {
      const resp = await getAPI("event");
      const sampless = resp.data;
      const formattedData = sampless.map((event) => ({
        value: event._id,
        label: `${event.eventName} - $${event.Price}`,
      }));
      setEvents(formattedData);

      // If default values are provided from backend, set them as selectedEvents
      try {
        getAPI("event-plan/bookingId/" + id)
          .then((resp) => {
            let sample = [];
            sample = resp.data;
            setAllEmployeeSetupData(sample);
            setLoading(false);
            console.log(sample, "sample");
            setWantSecurity(sample.security);
            if (sample && sample._id) {
              setSelectedEventsId(sample.TotalEvent);
              console.log("1111");

              const eventIds = sample.TotalEvent;
              console.log(eventIds, formattedData);
              const selectedEventsData = eventIds.map((eventId) => {
                // Find the event with the matching ID
                const event = formattedData.find((e) => {
                  console.log("Value of e:", e);
                  return e.value === eventId;
                });
                console.log("Value of e:", event);

                // If event is found, return object with value and label properties
                console.log(event);
                if (event) {
                  return {
                    value: event.value,
                    label: event.label,
                  };
                }
                // If event is not found, return null
                return null;
              });
              console.log(selectedEventsData, events);

              setSelectedEvents(
                selectedEventsData.filter((event) => event !== null)
              );

              // setFieldValue(
              //   "selectedEvents",
              //   selectedEventsData.filter((event) => event !== null)
              // );

              setEdit(true);
            }
          })
          .catch((err) => {
            setAllEmployeeSetupData({});
          });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("Failed to fetch events");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events");
    }
  };

  const getAllEventBookingid = async () => {
    try {
      getAPI("event-plan/bookingId/" + id)
        .then((resp) => {
          let sample = [];
          sample = resp.data;
          setAllEmployeeSetupData(sample);
          setLoading(false);

          if (sample && sample._id) {
            setSelectedEventsId(sample.TotalEvent);
            setEdit(true);
          }
        })
        .catch((err) => {
          setAllEmployeeSetupData({});
        });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events");
    }
  };
  // Handle event selection
  // Handle event selection
  const handleEventSelection = (selectedOptions) => {
    console.log(selectedOptions, "selectedOptions");
    setSelectedEvents(selectedOptions || []); // Update selectedEvents or set it to an empty array if null/undefined
  };
  const handleEventSelection2 = (selectedOptions) => {
    console.log(selectedOptions, "selectedOptions");
    setSelectedInventory(selectedOptions || []); // Update selectedEvents or set it to an empty array if null/undefined
  };

  // Form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(selectedEvents, selectedInventory);
    try {
      // Your form submission logic here
      const userDataString = JSON.parse(localStorage.getItem("userData")) || "";
      let userID = userDataString._id || "NOID";
      console.log(values, "values");
      const customerId = userID; // Your customerId value
      const transformedData = selectedEvents.map((item) => item.value) || [];
      const transformedData2 =
        selectedInventory.map((item) => item.value) || [];

      let sample = {
        TotalEvent: transformedData,
        security: wantSecurity,
        TotalInventory: transformedData2,
      };
      const obj = { ...sample, customerId, bookingId: id };
      console.log(obj, "objj");

      if (Edit) {
        editAPI("event-plan/" + AllEmployeeSetupData._id, obj)
          .then((resp) => {
            toast.success("Successfully Added   !  ");
            window.location.href = "/event-plan/" + id;
            // redirectPage();
          })
          .catch((err) => toast.error(err.error || "somthing went wrong"));
      } else {
        addAPI("event-plan", obj)
          .then((resp) => {
            toast.success("Successfully Added   !  ");
            window.location.href = "/event-plan/" + id;
            // redirectPage();
          })
          .catch((err) => toast.error(err.error || "somthing went wrong"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete form data
  const handledelete = () => {
    // Your delete logic here
    if (AllEmployeeSetupData && AllEmployeeSetupData._id) {
      deleteAPI("event-plan/" + AllEmployeeSetupData._id)
        .then((resp) => {
          toast.success("Successfully deleted!");
          window.location.href = "/event-plan/" + id;
        })
        .catch((err) => toast.error("something went wrong."));
    }
  };

  return (
    <div className="max-w-2xl mx-auto border-gray-300 p-5">
      <h1 className="font-bold">Event Planning</h1>

      <br />
      {!Loading && (
        <Formik
          initialValues={{
            selectedEvents: selectedEvents,
            wantSecurity: wantSecurity,
            selectedInventory: selectedInventory,
            currentId: AllEmployeeSetupData ? AllEmployeeSetupData._id : "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, setFieldValue }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              {/* {
                JSON.stringify(selectedEvents)
              } */}
              {/* Event Selection */}

              <div className="mb-4">
                <label className="block mb-1">Select the event</label>
                <Select
                  options={events}
                  value={selectedEvents}
                  isMulti
                  onChange={(selectedOptions) => {
                    setFieldValue(
                      "selectedEvents",
                      selectedOptions.map((option) => option.value)
                    );
                    handleEventSelection(selectedOptions);
                  }}
                  placeholder="Select events..."
                />
                <ErrorMessage
                  name="selectedEvents"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Select the Inventory</label>
                <Select
                  options={Inventorys}
                  value={selectedInventory}
                  isMulti
                  onChange={(selectedOptions) => {
                    setFieldValue(
                      "selectedInventory",
                      selectedOptions.map((option) => option.value)
                    );
                    handleEventSelection2(selectedOptions);
                  }}
                  placeholder="Select events..."
                />
                <ErrorMessage
                  name="selectedInventory"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Security Selection */}
              <div className="mb-4">
                <label htmlFor="security" className="block mb-1">
                  Do you want any security?
                </label>
                <label>
                  <input
                    type="radio"
                    value="yes"
                    checked={wantSecurity}
                    onChange={handleSecurityChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={!wantSecurity}
                    onChange={handleSecurityChange}
                  />
                  No
                </label>
                <ErrorMessage
                  name="wantSecurity"
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
                {Edit ? "Edit" : "Submit"}
              </button>

              {/* Delete Button */}
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
