import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import Layout from "./components/Layout.tsx";
import LandingPage from "./pages/LandingPage/LandingPage.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
// import Account from "./pages/Account/Account.tsx";
import "./index.css";

const Auth0ProviderLayout = () => (
  <Auth0Provider
    domain={import.meta.env.VITE_AUTHO_DOMAIN}
    clientId={import.meta.env.VITE_AUTHO_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Outlet />
  </Auth0Provider>
);

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Auth0ProviderLayout />}>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/" element={<LandingPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
