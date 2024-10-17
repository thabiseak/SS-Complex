import Hero from "../../Components/Hero";
import Navbar from "../../Components/Navbar";
import AboutImg from "../../assets/contact.png";
import Footer from "../../Components/Footer";
import ContactForm from "../../Components/ContactForm";
import React, { useEffect, useState } from "react";
import { getAPI, getTokenAPI } from "../../service/api";
import { toast } from "react-toastify";
import AddOrEditProfile from "../../Components/profile/addOrEditProfile";
import { isEmpty } from "../../service/utils";
import { CircularProgress } from "@mui/material";
import UpdatePassword from "../../Components/profile/updatePassword";

function ProfilePage() {
  const [Loading, setLoading] = React.useState(true);
  const [AllData, setAllData] = React.useState({});
  const [Token, setToken] = useState(
    localStorage.getItem("userData").token || ""
  );
  
  const fetchData = async () => {
    try {
      const userDataString = JSON.parse(localStorage.getItem("userData")) || "";
      console.log(userDataString.token, "000000");
      let tok = userDataString.token;
      setToken(userDataString.token);
      setLoading(true);
      getTokenAPI("auth/me", tok)
        .then((resp) => {
          setAllData(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Somrthing went wrong");
          setLoading(false);
        });
      // Fetch data using the id
    } catch (error) {
      toast.error("Invalid credentials.");
      setLoading(false);
      // Handle error if data fetching fails
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [Token]);
  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      {/* <Hero
        cName="hero-mid"
        heroImg={AboutImg}
        title="Contact"
        btnClass="hide"
      /> */}
      {!isEmpty(AllData) ? (
        <>
          <AddOrEditProfile AllData={AllData} />
          <UpdatePassword AllData={AllData} />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "80vh",
            alignItems: "center",
          }}
        >
          <br />
          <br />
          <br /> <br />
          <br />
          <br /> <br />
          <br />
          <br /> <br />
          <br />
          <br />
          <CircularProgress />
        </div>
      )}
      <Footer />
    </>
  );
}

export default ProfilePage;
