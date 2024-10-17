import "./CourseStyles.css";
import { useNavigate } from "react-router-dom";
import DownloadButton from "./core/dowloadbtn";

function HalDetailsCard({ alldata, image, redirectPage }) {
  const { name, dayPrice, numberOfPerson } = alldata;

  return (
    <div className="t-card" onClick={() => redirectPage()}>
      <div className="t-image">
        <img src={image} alt="image" />
      </div>
      <h4>Name : {name}</h4>
      <p>Number Of Person:{numberOfPerson}</p>
      <p>Day Price:{dayPrice}</p>
      {/* {props.type === "level" && (
        <div>
          {props.materialImage &&
          Array.isArray(props.materialImage) &&
          props.materialImage.length > 0 ? (
            props.materialImage.map((item, i) =>
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
      )} */}
    </div>
  );
}

export default HalDetailsCard;
