import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRoutes() {
  return (
    <Routes>

      {/* Parent layout route */}
      <Route element={<DefaultLayout />}>

        {/* Home */}
        <Route
          index
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />

        {/* About */}
        <Route
          path="about"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <About />
            </Suspense>
          }
        />

      </Route>

      {/* Catch-all 404 outside layout */}
      <Route
        path="*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        }
      />

    </Routes>
  );
}
