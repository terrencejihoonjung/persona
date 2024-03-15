import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <nav className={`p-6 w-full border-b`}>
      <div
        className={`flex items-center justify-between ${
          isAuthenticated ? "px-6" : "px-72"
        }`}
      >
        {isAuthenticated ? (
          <>
            <span className="flex">
              <h3 className="text-lg font-bold">{user!.email}'s' Persona</h3>
            </span>

            <span>
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="px-7 py-2 bg-gray-100 border rounded-2xl font-semibold text-md"
              >
                Log Out
              </button>
            </span>
          </>
        ) : (
          <>
            <span className="flex items-center space-x-12">
              <h3 className="text-lg font-bold">Persona</h3>
              <Link className="text-md font-regular" to="features">
                Features
              </Link>
              <Link className="text-md font-regular" to="features">
                Pricing
              </Link>
            </span>

            <span>
              <button
                onClick={() => loginWithRedirect()}
                className="px-7 py-2 bg-gray-100 border rounded-2xl font-semibold text-md"
              >
                Log In
              </button>
            </span>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
