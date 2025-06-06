import React from "react";
import InfinityText from "./InfinityText";
import ImageBanner from "./ImageBanner";
import BestSeller from "./BestSeller";
import RevealOnScroll from "../../../utils/RevealOnScroll";
import AboutUs from "./AboutUs";
import Review from "./Review";
import News from "./News";

export default function HomePage() {
  return (
    <>
      <RevealOnScroll>
        <InfinityText />
        <ImageBanner />
        <AboutUs />
        <BestSeller />
        <Review />
        <News />
      </RevealOnScroll>
    </>
  );
}
