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
  weddingDate: Yup.string().required('Wedding date is required'),
  methodOfContact: Yup.string().required('Method of contact is required'),
  typeOfVehicle: Yup.string().required('Type of vehicle is required'),
  //preferredColor: Yup.string().required('Preferred color is required'),
  //totalGuest: Yup.string().required('Total guest is required'),
  //totalVehicle: Yup.string().required('Total vehicle is required'),
  additionalService: Yup.string().required('Additional service is required'),
  //serviceDuration: Yup.string().required('Service duration is required'),
  pickupLocation: Yup.string().required('Pickup location is required'),
  anyRequest: Yup.string().required('Any request is required'),
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
    // getAPI("transport")
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
    const obj = { ...values, customerId };

    try {
      if (edit) {
        editAPI("transports/"+ AllData._id, obj)
          .then((resp) => {
            toast.success("Updated Added!");
            handleClose();
            onGridReady();
          })
          .catch((err) => toast.error(err.error || "Something went wrong"));
      } else {
        addAPI("transports", obj)
          .then((resp) => {
            toast.success("Successfully Added!");
            handleClose();
            onGridReady();
          })
          .catch((err) => toast.error(err.error || "Something went wrong"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong");
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
          weddingDate: edit ? AllData && AllData.weddingDate : "",
          methodOfContact: edit ? AllData && AllData.methodOfContact : "",
          typeOfVehicle: edit ? AllData && AllData.typeOfVehicle : "",
          //preferredColor: edit ? AllData && AllData.preferredColor : "",
          //totalGuest: edit ? AllData && AllData.totalGuest : "",
          //totalVehicle: edit ? AllData && AllData.totalVehicle : "",
          additionalService: edit ? AllData && AllData.additionalService : "",
          //serviceDuration: edit ? AllData && AllData.serviceDuration : "",
          pickupLocation: edit ? AllData && AllData.pickupLocation : "",
          anyRequest: edit ? AllData && AllData.anyRequest : "",
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
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z ]/g, "");
                }}
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
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
                }}
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
                  e.target.value = e.target.value.replace(/\K/g, "").slice(0, 10);
                }}
              />
              <ErrorMessage
                name="mobile"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Wedding Date Field */}
            <div className="mb-4">
              <label htmlFor="weddingDate" className="block mb-1">
                Event Date
              </label>
              <Field
                type="date"
                id="weddingDate"
                name="weddingDate"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="weddingDate"
                component="div"
                className="text-red-500"
              />
            </div>
          {/*method of contact */}
            <div className="mb-4">
            <label htmlFor="methodOfContact" className="block mb-1">
              Method of Contact
            </label>
            <Field
              as="select"
              id="methodOfContact"
              name="methodOfContact"
              className="block w-full border rounded-md px-3 py-2"
            >
              <option value="">Select</option>
              <option value="mobile">Mobile</option>
              <option value="email">Email</option>
            </Field>
            <ErrorMessage
              name="methodOfContact"
              component="div"
              className="text-red-500"
            />
          </div>


            {/* Type of Vehicle Field */}
            <div className="mb-4">
            <label htmlFor="typeOfVehicle" className="block mb-1">
              Type of Vehicle
            </label>
            <Field
              as="select"
              id="typeOfVehicle"
              name="typeOfVehicle"
              className="block w-full border rounded-md px-3 py-2"
            >
              <option value="">Select</option>
              <option value="van">Van</option>
              <option value="car">Car</option>
              <option value="bus">Bus</option>
            </Field>
            <ErrorMessage
              name="typeOfVehicle"
              component="div"
              className="text-red-500"
            />
          </div>


            {/* Preferred Color Field
            <div className="mb-4">
            <label htmlFor="preferredColor" className="block mb-1">
              Preferred Color
            </label>
            <Field
              as="select"
              id="preferredColor"
              name="preferredColor"
              className="block w-full border rounded-md px-3 py-2"
            >
              <option value="">Select</option>
              <option value="black">Black</option>
              <option value="white">White</option>
            </Field>
            <ErrorMessage
              name="preferredColor"
              component="div"
              className="text-red-500"
            />
          </div>*/}
            

            {/* Total Guest Field 
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
            </div>*/}
            
            
            
            {/* Total Vehicle Field 
            <div className="mb-4">
              <label htmlFor="totalVehicle" className="block mb-1">
                Total Vehicle
              </label>
              <Field
                type="text"
                id="totalVehicle"
                name="totalVehicle"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="totalVehicle"
                component="div"
                className="text-red-500"
              />
            </div>
             */}
            
            

            {/* Additional Service Field */}
            <div className="mb-4">
            <label htmlFor="additionalService" className="block mb-1">
              Additional Service
            </label>
            <Field
              as="select"
              id="additionalService"
              name="additionalService"
              className="block w-full border rounded-md px-3 py-2"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Field>
            <ErrorMessage
              name="additionalService"
              component="div"
              className="text-red-500"
            />
          </div>

            {/* Service Duration Field 
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
*/}
            
            {/* Pickup Location Field */}
            <div className="mb-4">
              <label htmlFor="pickupLocation" className="block mb-1">
                Pickup Location
              </label>
              <Field
                type="text"
                id="pickupLocation"
                name="pickupLocation"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="pickupLocation"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Any Request Field */}
            <div className="mb-4">
              <label htmlFor="anyRequest" className="block mb-1">
                Any Request
              </label>
              <Field
                type="text"
                id="anyRequest"
                name="anyRequest"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="anyRequest"
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