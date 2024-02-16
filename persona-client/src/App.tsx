import Dashboard from "./pages/Dashboard/Dashboard";
import NavBar from "./ui/NavBar";

function App() {
  return (
    <div className="flex flex-col min-w-screen min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
