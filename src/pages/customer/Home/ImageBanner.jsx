import React from 'react';
import { Carousel } from 'antd';
import image1 from '../../../assets/ImageBanner/image1.jpg';
import image2 from '../../../assets/ImageBanner/image2.jpg';
import image3 from '../../../assets/ImageBanner/image3.jpg';
import image4 from '../../../assets/ImageBanner/image4.jpg';

export default function ImageBanner() {
  const contentStyle = {
    width: '100%',
    height: 'clamp(300px, 80vh, 800px)',
    objectFit: 'cover',
  };

  return (
    <Carousel
      autoplay={{ dotDuration: true }}
      autoplaySpeed={5000}
      effect="fade"
      dotPosition="left"
    >
      {[image1, image2, image3, image4].map((img, idx) => (
        <div key={idx}>
          <img src={img} alt={`banner-${idx + 1}`} style={contentStyle} />
        </div>
      ))}
    </Carousel>
  );
}
