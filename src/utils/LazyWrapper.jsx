// src/utils/LazyWrapper.jsx
import { Suspense } from 'react';
import LoadingScreen from '../components/common/LoadingScreen';

export default function LazyWrapper(Component) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component />
    </Suspense>
  );
}
