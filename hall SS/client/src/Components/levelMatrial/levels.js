import "../CourseStyles.css";
import TripData from "../CourseData";
// import Trip1 from "../assets/contact.png";
// import Trip2 from "../assets/8.jpg";
// import Trip3 from "../assets/6.jpg";
import { useEffect, useState } from "react";
import { getAPI } from "../../service/api";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import DownloadButton from "../core/dowloadbtn";
const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
function LevelMatrialCard() {
  const [AllDate, setAllDate] = useState([]);
  const [Loading, setLoading] = useState(true);
  const { courseName, levelID } = useParams();
  const getAllCourse = () => {
    console.log(courseName, "courename");
    getAPI(`level/${levelID}`)
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
      <h1> {AllDate.levelName && AllDate.levelName}</h1>
      <p>Wish you all the best to level up your language skills</p>
      <div className="tripcard">
        {!Loading ? (
          AllDate &&
          !isEmptyObject(AllDate) && (
            <div>
              <div>
                {AllDate.levelMaterialTexts
                  ? AllDate.levelMaterialTexts
                  : "No reading texts "}
              </div>
              {AllDate.levelMaterialImage &&
              Array.isArray(AllDate.levelMaterialImage) &&
              AllDate.levelMaterialImage.length > 0 ? (
                AllDate.levelMaterialImage.map((item, i) =>
                  typeof item === "string" ? ( // Check if item is a base64-encoded string
                    <div className="p-5 m-1" key={i}>
                      <DownloadButton
                        base64String={item}
                        number={parseInt(i) + 1}
                        fileName={`testing${parseInt(i) + 1}`}
                      />
                    </div>
                  ) : null
                )
              ) : (
                <div>no files</div>
              )}
            </div>
          )
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

export default LevelMatrialCard;
