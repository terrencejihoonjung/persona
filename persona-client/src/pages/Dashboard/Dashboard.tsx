import WeatherWidget from "./WeatherWidget/WeatherWidget";
import PomodoroTimerWidget from "./PomodoroTimerWidget/PomodoroTimerWidget";
import TaskWidget from "./TaskWidget/TaskWidget";

function Dashboard() {
  return (
    <div className="p-6 grid grid-rows-12 grid-flow-col gap-4 h-[calc(100vh-3rem)] overflow-hidden">
      <div className="row-span-12 col-span-6 border shadow rounded">
        {/* AI Chat */}
      </div>

      <div className="row-span-6 col-span-3">
        <TaskWidget />
      </div>
      <div className="row-span-6 col-span-3 border shadow rounded">
        {/* Session */}
      </div>

      <div className="row-span-3 border shadow rounded">{/* Spotify */}</div>

      <div className="row-span-5">
        <PomodoroTimerWidget />
      </div>

      <div className="row-span-4">
        <WeatherWidget />
      </div>
    </div>
  );
}

export default Dashboard;
