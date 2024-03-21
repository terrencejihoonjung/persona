import WeatherWidget from "./WeatherWidget/WeatherWidget";
import PomodoroTimerWidget from "./PomodoroTimerWidget/PomodoroTimerWidget";
import TaskWidget from "./TaskWidget/TaskWidget";
import AIChatWidget from "./AIChatWidget/AIChatWidget";
import SpotifyWidget from "./SpotifyWidget/SpotifyWidget";

function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-12 grid-rows-12 gap-4 h-[calc(100vh-3rem)] overflow-hidden">
      <div className="col-span-5 row-span-12">
        <AIChatWidget />
      </div>

      <div className="col-span-3 row-span-7">
        <TaskWidget />
      </div>
      <div className="col-span-4 row-span-7">
        <PomodoroTimerWidget />
      </div>

      <div className="col-span-4 row-span-5">
        <WeatherWidget />
      </div>
      <div className="col-span-3 row-span-5">
        <SpotifyWidget />
      </div>
    </div>
  );
}

export default Dashboard;
