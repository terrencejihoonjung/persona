import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const showNavBar = location.pathname !== "/account";
  return (
    <div className={`flex flex-col min-w-screen h-screen`}>
      {showNavBar && <NavBar />}
      <main className="flex flex-col h-full">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
