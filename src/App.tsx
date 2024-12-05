import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PageRoutes } from "./enums/routes.enum";
import "react-toastify/dist/ReactToastify.css";
import MainApp from "./pages/app";
import Loading from "./components/loading";
const NotFound = React.lazy(() => import("./pages/notFound"));
const Dashboard = React.lazy(() => import("./pages/dashboard"));

function App() {
  const routes = [{ path: PageRoutes.DASHBOARD, element: <Dashboard /> }];

  return (
    <div className="h-screen">
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<MainApp />}>
            {routes.map((route: any, index: number) => (
              <Route path={route.path} element={route.element} key={index} />
            ))}
          </Route>
        </Routes>
      </React.Suspense>
      <ToastContainer />
    </div>
  );
}

export default App;
