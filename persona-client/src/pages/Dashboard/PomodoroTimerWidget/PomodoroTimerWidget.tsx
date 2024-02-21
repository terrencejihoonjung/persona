import { useState, useEffect } from "react";
import SettingButton from "./SettingButton";
import ExpandButton from "./ExpandButton";
import { formatTimeLeft } from "../../../utils/formatTimeLeft";

function PomodoroTimerWidget() {
  const [mode, setMode] = useState("Pomodoro");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    // Cleanup function to clear interval when component unmounts or when the timer is paused/stopped
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft]);

  function handleModeChange(mode: string, time: number) {
    setMode(mode);
    setTimeLeft(time);
    setIsRunning(false);
  }

  function handleSettingToggle() {
    setShowSettings(!showSettings);
  }

  function toggleTimer() {
    setIsRunning(!isRunning);
  }

  function endTimer() {
    if (mode === "Pomodoro") {
      handleModeChange("Short Break", 5 * 60);
    } else {
      handleModeChange("Pomodoro", 25 * 60);
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-between border rounded-2xl shadow-lg w-full h-full p-4">
      <span className="w-full flex justify-end">
        <SettingButton
          showSettings={showSettings}
          handleSettingToggle={handleSettingToggle}
        />
      </span>
      <div className="flex flex-col justify-center items-center space-y-8">
        <span className="flex space-x-4 mt-6">
          <button
            className={`font-semibold ${
              mode === "Pomodoro" ? "text-black" : "text-gray-400"
            }`}
            onClick={() => handleModeChange("Pomodoro", 25 * 60)}
          >
            Pomodoro
          </button>
          <button
            className={`font-semibold ${
              mode === "Short Break" ? "text-black" : "text-gray-400"
            }`}
            onClick={() => handleModeChange("Short Break", 5 * 60)}
          >
            Short Break
          </button>
          <button
            className={`font-semibold ${
              mode === "Long Break" ? "text-black" : "text-gray-400"
            }`}
            onClick={() => handleModeChange("Long Break", 10 * 60)}
          >
            Long Break
          </button>
        </span>

        <h1 className="text-9xl font-bold mb-4">{formatTimeLeft(timeLeft)}</h1>
        <span className="flex space-x-4">
          <button
            className="px-6 py-2 border rounded-full shadow"
            onClick={toggleTimer}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          {isRunning && (
            <button
              className="px-2 py-2 border rounded-full shadow"
              onClick={endTimer}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                />
              </svg>
            </button>
          )}
        </span>
      </div>

      <span className="w-full flex justify-end">
        <ExpandButton />
      </span>

      {showSettings && (
        <div className="p-4 absolute inset-0 w-full h-full bg-white flex justify-center items-center rounded-2xl">
          {/* Settings content goes here */}
          <h2 className="text-xl font-semibold mb-4">Settings</h2>

          {/* Add your settings form fields here */}
        </div>
      )}
    </div>
  );
}

export default PomodoroTimerWidget;
