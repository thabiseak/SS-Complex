import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import React, { useEffect, useState } from "react";
import TripData from "../../../Components/CourseData";
import Trip1 from "../../../assets/contact.png";
import { useNavigate } from "react-router-dom";
import BookingTable from "../../../Components/profile/booking/bookingTable";

export default function BookingPage() {
  const navigate = useNavigate();
  const redirectPage = () => {
    navigate(`/profile/booking`);
  };
  return (
    <>
      <Navbar />
      <div className="p-5">
      <br />
      <br />
      <br />
      <br /><br />
      <br />
      <br />
      <br />
      <BookingTable />
      <br />
      <br />
      </div>
      <Footer />
    </>
  );
}
