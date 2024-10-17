import "../CourseStyles.css";
import TripData from "../CourseData";
// import Trip1 from "../assets/contact.png";
// import Trip2 from "../assets/8.jpg";
// import Trip3 from "../assets/6.jpg";
import { useEffect, useState } from "react";
import { getAPI } from "../../service/api";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

function LevelCard() {
  const [AllDate, setAllDate] = useState([]);
  const [Loading, setLoading] = useState(true);
  const { courseName, courseID } = useParams();
  const getAllCourse = () => {
    console.log(courseName, "courename");
    getAPI(`level/course/${courseID}`)
      .then((resp) => {
        let sample = [];
        sample = resp.data;
        console.log(sample, "-----------");
        setAllDate(sample);
        setLoading(false);
      })
      .catch((err) => {
        setAllDate([]);
      });
  };
  useEffect(() => {
    getAllCourse();
  }, []);

  return (
    <div className="trip">
      <h1> {courseName && courseName}</h1>
      <p>Wish you all the best to level up your language skills</p>
      <div className="tripcard">
        {!Loading ? (
          AllDate &&
          AllDate.map((level, i) => (
            <TripData
              id={level._id}
              image={`data:image/png;base64,${level.levelImage}`}
              materialImage={level.levelMaterialImage}
              // image={level.levelImage}
              heading={level.levelName}
              text={level.levelDescription}
              type="level"
              number={parseInt(i) + 1}
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <CircularProgress />
          </div>
        )}
        {/* <TripData
          image={Trip1}
          heading="English"
          text="English is a widely spoken language, used as a global means of communication. It has a rich history and influences from various cultures. Learning English opens doors to opportunities in education, business, and travel. Whether you’re a beginner or an advanced learner, mastering English enhances your ability to connect with people worldwide and explore diverse literature, music, and media."
        />
        <TripData
          image={Trip1}
          heading="Chinese"
          text="The Chinese language is a group of languages used by Chinese people in China and elsewhere. It forms part of the Sino-Tibetan family of languages. Chinese includes many regional language varieties, with the main ones being Mandarin, Wu, Yue, and Min. These varieties are not mutually intelligible, and linguists often refer to them as separate languages. Chinese is almost always written in Chinese characters, which are symbols with meaning called logograms"
        />
        <TripData
          image={Trip1}
          heading="Deutsch"
          text="Deutsch, also known as German, is a fascinating language spoken primarily in Germany, Austria, and Switzerland. It has a rich literary tradition, with influential writers like Goethe and Kafka. Learning German opens doors to cultural exploration, business opportunities, and connections with over 90 million native speakers worldwide."
        /> */}
      </div>
    </div>
  );
}

export default LevelCard;
