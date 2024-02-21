import WeatherWidget from "../../components/WeatherWidget/WeatherWidget";
import PomodoroTimerWidget from "../../components/PomodoroTimerWidget/PomodoroTimerWidget";

function Dashboard() {
  return (
    <div className="p-6 grid grid-rows-12 grid-cols-12 gap-4 h-[calc(100vh-3rem)] overflow-hidden">
      {/* AI Chat Widget - takes up the full height and 5 columns */}
      <div className="row-span-12 col-span-5 border shadow rounded">
        {/* AI Chat Widget content goes here */}
      </div>

      {/* Task Board - takes up the top 8 rows of the remaining columns */}
      <div className="row-span-12 col-span-3 border shadow rounded">
        {/* Task Board content goes here */}
      </div>

      {/* Spotify Widget - takes up the top 2 rows of the last 4 columns */}
      <div className="row-span-5 col-span-4 border shadow rounded">
        {/* Spotify Widget content goes here */}
      </div>

      {/* Pomodoro Timer - takes up the middle 6 rows of the last 4 columns */}
      <div className="row-span-4 col-span-4">
        <PomodoroTimerWidget />
      </div>

      {/* Weather Widget - takes up the bottom 4 rows of the last 4 columns */}
      <div className="row-span-3 col-span-4">
        <WeatherWidget />
      </div>
    </div>
  );
}

export default Dashboard;
