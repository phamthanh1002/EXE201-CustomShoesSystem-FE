import React, { useState } from "react";
import { Carousel, Image } from "antd";
import image1 from "../../../assets/ImageBanner/image1.jpg";
import image2 from "../../../assets/ImageBanner/image2.jpg";
import image3 from "../../../assets/ImageBanner/image3.jpg";
import image4 from "../../../assets/ImageBanner/image4.jpg";
import image5 from "../../../assets/ImageBanner/image5.jpg";

export default function ImageBanner() {
  const [dotPosition, setDotPosition] = useState("left");

  const contentStyle = {
    height: "80vh",
    objectFit: "cover",
  };

  return (
    <Carousel
      dotPosition={dotPosition}
      autoplay={{ dotDuration: true }}
      autoplaySpeed={5000}
      effect="fade"
    >
      {/* <div>
        <Image
          style={contentStyle}
          width="100%"
          alt="img1"
          src={image5}
          preview={false}
        />
      </div> */}
      <div>
        <Image
          style={contentStyle}
          width="100%"
          alt="img1"
          src={image1}
          preview={false}
        />
      </div>
      <div>
        <Image
          style={contentStyle}
          width="100%"
          alt="img2"
          src={image2}
          preview={false}
        />
      </div>
      <div>
        <Image
          style={contentStyle}
          width="100%"
          alt="img3"
          src={image3}
          preview={false}
        />
      </div>
      <div>
        <Image
          style={contentStyle}
          width="100%"
          alt="img4"
          src={image4}
          preview={false}
        />
      </div>
    </Carousel>
  );
}
