import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import AboutImg from "../assets/contact.png";
import Footer from "../Components/Footer";
import ContactForm from "../Components/ContactForm";
import React, { useEffect, useState } from "react";
import { getAPI, getTokenAPI } from "../service/api";
import { toast } from "react-toastify";
import AddOrEditProfile from "../Components/profile/addOrEditProfile";
import { isEmpty } from "../service/utils";

function ContactPage() {
 
 
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={AboutImg}
        title="Contact"
        btnClass="hide"
      />
      {/* {!isEmpty(AllData) && <AddOrEditProfile AllData={AllData} />} */}
      <ContactForm />
      <Footer />
    </>
  );
}

export default ContactPage;
