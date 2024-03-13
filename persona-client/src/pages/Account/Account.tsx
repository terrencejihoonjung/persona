function Account() {
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
      <div className="flex flex-col justify-center items-center w-1/2">
        <div className="w-2/3 h-3/5">
          <div>
            <h2>Log In</h2>
            <p>
              Don't have an account? <button>Create an Account</button>
            </p>
          </div>

          <form></form>
        </div>
      </div>
    </div>
  );
}

export default Account;
