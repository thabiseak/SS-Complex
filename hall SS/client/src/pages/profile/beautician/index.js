import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";
import React, { useEffect, useState } from "react";
import TripData from "../../../Components/CourseData";
import Trip1 from "../../../assets/contact.png";
import { useNavigate } from "react-router-dom";
import BeauticianTable from "../../../Components/profile/Beautician/BeauticianTable";

export default function BeauticianPage() {
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <BeauticianTable />
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
}
