import { useState, useEffect, useRef } from "react";
import SettingButton from "./SettingButton";
import ExpandButton from "./ExpandButton";
import useFullScreen from "../../../hooks/useFullScreen";
import { formatTimeLeft } from "../../../utils/formatTimeLeft";
import SettingsModal from "./SettingsModal";
import { Settings } from "../../../types/PomodoroTimerTypes";

function PomodoroTimerWidget() {
  const [settings, setSettings] = useState<Settings>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 10,
    alarmSound: "digital", // Default alarm sound
    volume: 50, // Default volume level
  });

  const audioRef = useRef(new Audio(`/sounds/${settings.alarmSound}.mp3`));
  const fullScreenRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState("Pomodoro");
  const [timeLeft, setTimeLeft] = useState(settings.pomodoro * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { enter, exit, isFullScreen } = useFullScreen();

  useEffect(() => {
    // Interval management
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    // Handle the alarm sound when the time left is zero
    if (timeLeft === 0) {
      audioRef.current.volume = settings.volume / 100;
      audioRef.current.play();
      endTimer();
    }
  }, [timeLeft, settings.volume, settings.alarmSound]);

  const toggleFullScreen = () => {
    if (isFullScreen()) {
      exit();
    } else if (fullScreenRef.current) {
      enter(fullScreenRef.current);
    }
  };

  function handleModeChange(mode: string, time: number) {
    setMode(mode);
    setTimeLeft(time);
    setIsRunning(false);
  }

  function handleSettingToggle() {
    audioRef.current.pause(); // Pauses the audio
    audioRef.current.currentTime = 0; // Resets the audio
    setShowSettings(!showSettings);
    setIsRunning(false);
  }

  function endTimer() {
    if (mode === "Pomodoro") {
      handleModeChange("Short Break", settings.shortBreak * 60);
    } else {
      handleModeChange("Pomodoro", settings.pomodoro * 60);
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
      <div
        ref={fullScreenRef}
        className="bg-white flex flex-col justify-center items-center space-y-8"
      >
        <span className="flex space-x-4">
          <button
            className={`font-semibold ${
              mode === "Pomodoro" ? "text-black" : "text-gray-400"
            }`}
            onClick={() => handleModeChange("Pomodoro", settings.pomodoro * 60)}
          >
            Pomodoro
          </button>
          <button
            className={`font-semibold ${
              mode === "Short Break" ? "text-black" : "text-gray-400"
            }`}
            onClick={() =>
              handleModeChange("Short Break", settings.shortBreak * 60)
            }
          >
            Short Break
          </button>
          <button
            className={`font-semibold ${
              mode === "Long Break" ? "text-black" : "text-gray-400"
            }`}
            onClick={() =>
              handleModeChange("Long Break", settings.longBreak * 60)
            }
          >
            Long Break
          </button>
        </span>

        <h1 className="text-9xl font-bold">{formatTimeLeft(timeLeft)}</h1>
        <span className="flex space-x-4">
          <button
            className="px-6 py-2 border rounded-full shadow"
            onClick={() => setIsRunning(!isRunning)}
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
        <ExpandButton toggleFullScreen={toggleFullScreen} />
      </span>

      {showSettings && (
        <SettingsModal
          audioPlayer={audioRef.current}
          mode={mode}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          settings={settings}
          setSettings={setSettings}
          setShowSettings={setShowSettings}
        />
      )}
    </div>
  );
}

export default PomodoroTimerWidget;
