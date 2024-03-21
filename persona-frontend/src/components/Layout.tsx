import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const { pathname } = useLocation();
  const showNavBar = pathname !== "/account";
  return (
    <div className={`flex flex-col h-screen`}>
      {showNavBar && <NavBar />}
      <main className="flex flex-col h-full">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
