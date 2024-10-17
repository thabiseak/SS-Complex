import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import AboutImg from "../assets/course.jpg";
import Footer from "../Components/Footer";
import Course from "../Components/Course";
import LevelCard from "../Components/levels/levels";
import { useParams } from "react-router-dom";

function LevelPage() {
  

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <LevelCard />
      <Footer />
    </>
  );
}

export default LevelPage;
