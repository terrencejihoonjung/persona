import { useState } from "react";

function PomodoroTimerWidget() {
  const [mode, setMode] = useState("Pomodoro"); // 'Pomodoro', 'Short Break', 'Long Break'
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds

  const startTimer = () => {
    // Implement timer logic here
  };

  const formatTimeLeft = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="flex flex-col items-center justify-around border rounded-2xl shadow-lg w-full h-full p-4">
      <div className="flex space-x-4 mb-4">
        <button
          className={`font-semibold ${
            mode === "Pomodoro" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setMode("Pomodoro")}
        >
          Pomodoro
        </button>
        <button
          className={`font-semibold ${
            mode === "Short Break" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setMode("Short Break")}
        >
          Short Break
        </button>
        <button
          className={`font-semibold ${
            mode === "Long Break" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setMode("Long Break")}
        >
          Long Break
        </button>
      </div>

      <div className="text-9xl font-bold mb-4">{formatTimeLeft(timeLeft)}</div>

      <div className="flex space-x-4">
        <button
          className="px-6 py-2 border rounded-full shadow"
          onClick={startTimer}
        >
          Start
        </button>
        <button className="px-2 py-2 border rounded-full shadow">{">>"}</button>
      </div>
    </div>
  );
}

export default PomodoroTimerWidget;
