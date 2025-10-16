import { Suspense } from 'react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export function LazyComponent({ children }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
}