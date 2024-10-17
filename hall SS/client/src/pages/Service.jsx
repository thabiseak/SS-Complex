import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import AboutImg from "../assets/course.jpg";
import Footer from "../Components/Footer";
import Course from "../Components/Course";
import TripData from "../Components/CourseData";
// import ServiceForm from "../Components/service";
import Trip1 from "../assets/photo.png";
import Trip2 from "../assets/cars.png";
import Trip3 from "../assets/beauty.png";
import { useNavigate } from "react-router-dom";

function ServicePage() {
  const navigate = useNavigate();
  const redirectPage = (page) => {
    navigate(page);
  };
  return (
    <>
      <Navbar />
      <br />
      <br />
      <br /> <br />
      <br />
      <br />
      <h1 className="font-bold">Extra Service</h1>
      <div className="tripcard">
        <TripData
          redirectPage={() => redirectPage("/profile/photography")}
          image={Trip1}
          heading="Photography"
          text={
            <>
              RS 10 000 <br />
              Capture unforgettable moments with our premier photography
              service. From weddings to corporate events, our skilled
              photographers ensure every moment is beautifully preserved.
            </>
          }
        />
        <TripData
          redirectPage={() => redirectPage("/profile/transport")}
          image={Trip2}
          heading="Transport"
          text={
            <>
              RS 20 000 <br />
              Experience seamless travel with our reliable transport service.
              Whether for business or leisure, our fleet of vehicles and
              professional drivers ensure comfortable and punctual journeys,
              tailored to your needs.
            </>
          }
        />
        <TripData
          redirectPage={() => redirectPage("/profile/beautician")}
          image={Trip3}
          heading="Beautician"
          text={
            <>
              RS 20 000 <br />
              Indulge in personalized beauty treatments with our expert
              beautician service. From skincare to makeup, our professionals
              offer tailored solutions to enhance your natural beauty and leave
              you feeling confident and radiant.
            </>
          }
        />
      </div>
      <br /> <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default ServicePage;
