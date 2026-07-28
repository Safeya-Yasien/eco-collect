import { Spinner } from "@/components/feedback";
import { LazyExoticComponent, ReactNode, Suspense } from "react";

export function withSuspense(
  Component: LazyExoticComponent<() => JSX.Element>,
  fallback: ReactNode = <Spinner />,
) {
  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
}
