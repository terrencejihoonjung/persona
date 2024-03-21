import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:3000/api/users/logout", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
        navigate("/account");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <nav className={`p-6 w-full border-b`}>
      <div
        className={`flex items-center justify-between ${
          user ? "px-6" : "px-72"
        }`}
      >
        {user ? (
          <>
            <span className="flex">
              <h3 className="text-lg font-bold">Persona</h3>
            </span>

            <span>
              <button
                onClick={handleLogout}
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
              <Link
                to="/account"
                className="px-7 py-2 bg-gray-100 border rounded-2xl font-semibold text-md"
              >
                Log In
              </Link>
            </span>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
