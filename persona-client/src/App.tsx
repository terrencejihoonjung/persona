import Dashboard from "./pages/Dashboard/Dashboard";
import NavBar from "./ui/NavBar";

function App() {
  return (
    <div className="flex flex-col min-w-screen h-screen">
      <NavBar />
      <main className="flex flex-col ">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
