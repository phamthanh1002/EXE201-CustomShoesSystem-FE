import React from 'react';
import InfinityText from './InfinityText';
import ImageBanner from './ImageBanner';
import BestSeller from './BestSeller';
import RevealOnScroll from '../../../utils/RevealOnScroll';
import AboutUs from './AboutUs';
import Feedback from './Feedback';
import News from './News';

export default function HomePage() {
  return (
    <>
      <RevealOnScroll>
        <InfinityText />
        <ImageBanner />
        <AboutUs />
        <BestSeller />
        <Feedback />
        <News />
      </RevealOnScroll>
    </>
  );
}
