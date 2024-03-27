import Nprogress from "@/components/Nprogress";
import { lazy, Suspense } from "react";

const lazyLoad = (Comp: React.LazyExoticComponent<any>): React.ReactNode => {
  return (
    <Suspense fallback={<Nprogress />}>
      <Comp />
    </Suspense>
  );
};

export default lazyLoad;
