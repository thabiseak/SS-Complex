import Hero from "../../Components/Hero";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import React, { useEffect, useState } from "react";
import TripData from "../../Components/CourseData";
import Trip1 from "../../assets/contact.png";
import Trip2 from "../../assets/card.png";
import Trip3 from "../../assets/paymentHistory.png";
//
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const redirectPage = () => {
    navigate(`/profile/booking`);
  };

  const redirectPage2 = () => {
    navigate(`/profile/card`);
  };

  const redirectPage3 = () => {
    navigate(`/profile/transfer`);
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
        <div style={{ fontSize: "1rem" }}>Booking</div>
        <div className="tripcard">
          <TripData
            redirectPage={redirectPage}
            image={Trip1}
            heading="Booking"
            text="Effortlessly reserve ideal venues for events with our hall booking service. Tailored options, efficient communication, and diverse venue selections ensure a seamless event planning experience."
          />
        </div>
        <br />
        <br />
        <br />
        <div style={{ fontSize: "1rem" }}>Finance Management</div>
        <div className="tripcard">
          <TripData
            redirectPage={redirectPage2}
            image={Trip2}
            heading="Card"
            text="ATM card payment allows you to securely make transactions using your debit or ATM card. Simply enter your card details, including the card number, expiry date, CVC code, and cardholder name, to complete the payment process. Ensure the information entered is accurate and up-to-date for successful transactions"
          />
          <TripData
            redirectPage={redirectPage3}
            image={Trip3}
            heading="Payment Transfer"
            text="ATM card payment allows you to securely make transactions using your debit or ATM card. Simply enter your card details, including the card number, expiry date, CVC code, and cardholder name, to complete the payment process. Ensure the information entered is accurate and up-to-date for successful transactions"
          />
        </div>
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;
