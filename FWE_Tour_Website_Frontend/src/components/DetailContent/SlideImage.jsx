import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
};

const SlideImage = ({ imagesURLs }) => {
  return (
    <div className="slide-container">
      <Slide>
        {imagesURLs.map((imagesURL, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${imagesURL})` }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default SlideImage;
