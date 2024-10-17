import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addAPI, editAPI, getAPI } from "../../../service/api";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  hallID: Yup.string().required("Hall is required"),
  address: Yup.string().required("Address is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  nic: Yup.string()
    .matches(/^([0-9]{9}[vV]|[0-9]{12})$/, "Invalid NIC")

    .required("NIC is required"),

  guestCount: Yup.number()
    .required("Guest count is required")
    .positive()
    .integer(),
  foodMenu: Yup.string().required("Food menu is required"),
  alcoholService: Yup.string().required("Alcohol service is required"),
  advancePayment: Yup.number()
    .required("Advance payment is required")
    .positive(),
});
{
  /* <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      ></form> */
}

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
    // getAPI("bookings")
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
    console.log(obj);
    try {
      if (edit) {
        editAPI("bookings/"+ AllData._id,obj)
          .then((resp) => {
            toast.success("Updated Added!");
            handleClose();
            onGridReady();
          })
          .catch((err) => toast.error(err.error || "somthing went wrong"));
      } else {
        addAPI("bookings", obj)
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
  const [selectedId, setSelectedId] = useState("sds");
  const [AllCardData, setAllCardData] = useState({});
  const [AllDate, setAllDate] = useState([
    new Date("2024-05-27T00:00:00.000Z"),
  ]);
  const getAllHall = () => {
    getAPI("hall")
      .then((resp) => {
        let sample = [];
        sample = resp.data;
        console.log(sample, "-----------");
        setAllCardData(sample);
        // setLoading(false);
      })
      .catch((err) => {
        setAllCardData([]);
      });
  };
  const getAllHallId = async (id) => {
    console.log(id, "----------id");
    try {
      getAPI("hall/" + id)
        .then((resp) => {
          console.log("-------------1111");
          let sample = [];
          sample = resp.data;
          console.log(sample, "----------1sa mple");
          const datesArray = sample.bookedDate.map((entry) => entry.date);

          console.log(datesArray, "-----------");
          setAllDate(datesArray);
          setLoading(false);
        })
        .catch((err) => {
          setAllCardData([]);
          console.log(err, "------err");
        });
    } catch (error) {}
  };

  useEffect(() => {
    console.log("---------");
    getAllHallId(selectedId);
  }, [selectedId]);

  useEffect(() => {
    getAllHall();
    // console.log(Formik);
  }, []);
  return (
    <div className="max-w-2xl mx-auto w-full border-gray-300 p-5">
      <Formik
        initialValues={{
          name: edit ? AllData && AllData.name : "",
          address: edit ? AllData && AllData.address : "",
          mobile: edit ? AllData && AllData.mobile : "",
          nic: edit ? AllData && AllData.nic : "",
          eventDate: edit ? AllData && AllData.eventDate : "",
          guestCount: edit ? AllData && AllData.guestCount : "",
          foodMenu: edit ? AllData && AllData.foodMenu : "",
          alcoholService: edit ? AllData && AllData.alcoholService : "",
          advancePayment: edit ? AllData && AllData.advancePayment : "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting,errors }) => (
          <Form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-500"
            style={{ width: "500px" }}
          >{
            JSON.stringify(errors)
          }
            
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

            {/* NIC Field */}
            <div className="mb-4">
              <label htmlFor="nic" className="block mb-1">
                NIC
              </label>
              <Field
                type="text"
                id="nic"
                name="nic"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="nic"
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

            {/* Guest Count Field */}
            <div className="mb-4">
              <label htmlFor="guestCount" className="block mb-1">
                Guest Count
              </label>
              <Field
                type="text"
                id="guestCount"
                name="guestCount"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="guestCount"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Food Menu Field */}
            <div className="mb-4">
              <label htmlFor="foodMenu" className="block mb-1">
                Food Menu
              </label>
              <Field
                type="text"
                id="foodMenu"
                name="foodMenu"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="foodMenu"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Alcohol Service Field */}
            <div className="mb-4">
              <label htmlFor="alcoholService" className="block mb-1">
                Alcohol Service
              </label>
              <Field
                type="text"
                id="alcoholService"
                name="alcoholService"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="alcoholService"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Advance Payment Field */}
            <div className="mb-4">
              <label htmlFor="advancePayment" className="block mb-1">
                Advance Payment
              </label>
              <Field
                type="text"
                id="advancePayment"
                name="advancePayment"
                className="block w-full border rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="advancePayment"
                component="div"
                className="text-red-500"
              />
            </div>

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
