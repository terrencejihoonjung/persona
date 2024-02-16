import WeatherWidget from "../../components/WeatherWidget/WeatherWidget";

function Dashboard() {
  return (
    <div className="p-6 grid grid-rows-6 grid-cols-6 gap-4 h-[calc(100vh-3rem)]">
      {/* Daily Stats */}
      <div className="row-span-1 col-span-4 border shadow rounded">hi</div>

      {/* Weather Widget */}
      <div className="row-span-2 col-span-2">
        <WeatherWidget />
      </div>

      {/* Task Board */}
      <div className="row-span-5 col-span-4 border shadow rounded">hi</div>

      {/* Pomodoro Timer */}
      <div className="row-span-4 col-span-2 border shadow rounded">hi</div>
    </div>
  );
}

export default Dashboard;
