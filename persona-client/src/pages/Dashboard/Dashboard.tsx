import WeatherWidget from "./WeatherWidget/WeatherWidget";
import PomodoroTimerWidget from "./PomodoroTimerWidget/PomodoroTimerWidget";

function Dashboard() {
  return (
    <div className="p-6 grid grid-rows-12 grid-flow-col gap-4 h-[calc(100vh-3rem)] overflow-hidden">
      <div className="row-span-12 col-span-5 border shadow rounded">
        {/* AI Chat */}
      </div>

      <div className="row-span-7 col-span-4 border shadow rounded">
        {/* Tasks */}
      </div>
      <div className="row-span-5 col-span-4 border shadow rounded">
        {/* Session */}
      </div>

      <div className="row-span-2 border shadow rounded">{/* Spotify */}</div>

      <div className="row-span-5">
        <PomodoroTimerWidget />
      </div>

      <div className="row-span-5">
        <WeatherWidget />
      </div>
    </div>
  );
}

export default Dashboard;
