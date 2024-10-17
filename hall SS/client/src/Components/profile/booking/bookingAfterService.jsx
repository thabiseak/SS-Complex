import Hero from "../../Hero";
// import Navbar from "../../Navbar";
import Footer from "../../Footer";
import React, { useEffect, useState } from "react";
import TripData from "../../CourseData";
import Trip1 from "../../../assets/contact.png";
import Trip2 from "../../../assets/card.png";
import Trip3 from "../../../assets/paymentHistory.png";
import { useParams } from "react-router-dom";

//
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";
import { allRoutesPath } from "../../../router/routesPath";
import Bill from "./bill";
import { PDFViewer } from "@react-pdf/renderer";
import { getAPI } from "../../../service/api";

function BookingAfterService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Alldata, setAlldata] = useState({});
  const [Loading, setLoading] = useState(true);

  const getAllHallId = async (id) => {
    try {
      getAPI("bookings/" + id)
        .then((resp) => {
          setAlldata(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          setAlldata({});
          setLoading(false);
        });
    } catch (error) {
      setAlldata({});
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllHallId(id);
  }, [id]);
  const redirectPage = () => {
    navigate(`/employee-setup/` + id);
  };

  const redirectPage2 = () => {
    navigate(allRoutesPath.EVENT_PLAN + "/" + id);
  };

  const redirectPage3 = () => {
    navigate(`/profile/transfer`);
  };
  const bookingData = {
    name: "John Doe",
    phone: "123-456-7890",
    email: "john@example.com",
    cash: "$100",
  };

  return (
    <>
      <Navbar />
      <div className="p-5">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* {JSON.stringify(Alldata)} */}
        <Bill {...Alldata} />

        <div style={{ fontSize: "1rem" }}>Services</div>
        <div className="tripcard">
          <TripData
            redirectPage={redirectPage}
            image={Trip1}
            heading="Employee Arrangement"
            text="Effortlessly reserve ideal venues for events with our hall booking service. Tailored options, efficient communication, and diverse venue selections ensure a seamless event planning experience."
          />
          <TripData
            redirectPage={redirectPage2}
            image={Trip2}
            heading="Event Planning"
            text="ATM card payment allows you to securely make transactions using your debit or ATM card. Simply enter your card details, including the card number, expiry date, CVC code, and cardholder name, to complete the payment process. Ensure the information entered is accurate and up-to-date for successful transactions"
          />
          {/* <TripData
            redirectPage={redirectPage3}
            image={Trip3}
            heading="Payment Transfer"
            text="ATM card payment allows you to securely make transactions using your debit or ATM card. Simply enter your card details, including the card number, expiry date, CVC code, and cardholder name, to complete the payment process. Ensure the information entered is accurate and up-to-date for successful transactions"
          /> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookingAfterService;
