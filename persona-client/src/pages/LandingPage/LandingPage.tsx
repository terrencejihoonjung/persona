import { useAuth0 } from "@auth0/auth0-react";

function LandingPage() {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <div className="py-12 px-72 flex flex-col justify-center items-center h-full space-y-8">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="flex flex-col space-y-6">
          <h1 className="text-6xl font-semibold tracking-tighter">
            Achieve your Goals by <br />
            <span className="text-green-600">Personalizing</span> your
            Productivity.
          </h1>
          <p className="text-xl font-regula tracking-widest">
            Revolutionize your workflow through Persona's centralized,
            <br />
            AI-powered productivity platform.
          </p>
        </div>
        <button
          onClick={handleSignUp}
          className="px-8 py-3 bg-gray-100 border rounded-2xl font-semibold text-md"
        >
          Get Started
        </button>
      </div>
      <div className="">
        <img
          className="object-fit border rounded-2xl shadow-md"
          src="/images/dashboard_asset.png"
        />
      </div>
    </div>
  );
}

export default LandingPage;
