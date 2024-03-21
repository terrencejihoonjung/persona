import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function Account() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="h-full flex">
      <div className="bg-emerald-100 flex flex-col justify-center items-center w-1/2">
        <div className="flex flex-col justify-around items-center w-2/3 h-2/5 mb-24 space-y-8">
          <div className="bg-emerald-200 rounded-3xl shadow-lg">
            <img src="/images/account_asset.png" />
          </div>
          <div className="flex flex-col justify-center items-center tracking-tight space-y-4">
            <h1 className="text-4xl font-semibold text-center text-black">
              Integrate Persona into Your Workflow
            </h1>
            <p className="text-2xl font-regular">
              Your Productivity is in Good Hands
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col justify-center items-center w-1/2">
        <Link
          className="absolute top-0 left-0 m-5 font-semibold hover:underline"
          to="/"
          replace
        >
          Back
        </Link>
        <div className="flex flex-col justify-between items-center w-3/5 h-fit mb-24 space-y-8">
          <div className="flex flex-col items-center space-y-2">
            <h2 className="text-3xl font-black">
              {isLogin ? "Log In" : "Sign Up"}
            </h2>

            {isLogin ? (
              <p className="text-md font-regular">
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-500 hover:underline"
                >
                  Create an Account
                </button>
              </p>
            ) : (
              <p className="text-md font-regular">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-500 hover:underline"
                >
                  Log In
                </button>
              </p>
            )}
          </div>
          {isLogin ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
}

export default Account;
