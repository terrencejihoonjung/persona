import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the form submission
  };

  const handleGoogleSignIn = () => {
    // Handle Google Sign-In
  };

  return (
    <div className="w-full flex flex-col justify-between items-center">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="w-full">
          <label
            htmlFor="emailInput"
            className="block text-sm font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            id="emailInput" // id matches the htmlFor of the label
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="w-full">
          {/* Label for password input */}
          <label
            htmlFor="passwordInput"
            className="block text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            id="passwordInput" // id matches the htmlFor of the label
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Continue
          </button>
        </div>
        <div className="relative w-full flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="w-full">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full px-4 py-2 border border-gray-300 rounded-md flex items-center justify-center"
          >
            {/* <img src="path-to-google-icon" alt="Google" className="mr-3" /> */}
            Sign in with Google
          </button>
        </div>
      </form>
      <p className="text-sm mt-2">
        By signing up you agree to our{" "}
        <a href="/terms" className="text-blue-500 hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-blue-500 hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}

export default LoginForm;
