import { lazy, Suspense } from 'react';

const InfinityText = lazy(() => import('./InfinityText'));
const ImageBanner = lazy(() => import('./ImageBanner'));
const AboutUs = lazy(() => import('./AboutUs'));
const BestSeller = lazy(() => import('./BestSeller'));
const Feedback = lazy(() => import('./Feedback'));
const News = lazy(() => import('./News'));

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InfinityText />
      <ImageBanner />
      <AboutUs />
      <BestSeller />
      <Feedback />
      <News />
    </Suspense>
  );
}
