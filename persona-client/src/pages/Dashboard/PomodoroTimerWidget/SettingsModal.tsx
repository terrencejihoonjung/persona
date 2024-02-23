import { useState } from "react";
import { Settings } from "../../../types/PomodoroTimerTypes";

type SettingsModalProps = {
  audioPlayer: HTMLAudioElement;
  mode: string;
  settings: Settings;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
};

function SettingsModal({
  audioPlayer,
  setShowSettings,
  settings,
  setSettings,
  mode,
  timeLeft,
  setTimeLeft,
}: SettingsModalProps) {
  const [currSettings, setCurrSettings] = useState<Settings>(settings);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setCurrSettings((prevSettings) => ({
      ...prevSettings,
      [name]: name === "volume" ? parseInt(value, 10) : value,
    }));

    if (name === "volume") {
      const volumeLevel = parseInt(value, 10) / 100; // Convert volume to a 0-1 range
      audioPlayer.volume = volumeLevel;
      audioPlayer.currentTime = 0; // Reset audio to start
      audioPlayer.play();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSettings(currSettings);

    // Calculate new time left based on the current mode and new settings
    let newTimeLeft;
    switch (mode) {
      case "Pomodoro":
        newTimeLeft =
          Math.abs(
            currSettings.pomodoro - (settings.pomodoro - timeLeft / 60)
          ) * 60;
        break;
      case "Short Break":
        newTimeLeft = currSettings.shortBreak * 60;
        break;
      case "Long Break":
        newTimeLeft = currSettings.longBreak * 60;
        break;
      default:
        newTimeLeft = timeLeft; // Keep the current timeLeft if the mode doesn't match
    }

    // Update the timeLeft state with the new calculated time
    setTimeLeft(newTimeLeft);
    setShowSettings(false);
    audioPlayer.pause();
    audioPlayer.currentTime = 0; // Reset audio to start
  };

  return (
    <div className="absolute inset-0 flex flex-col rounded-2xl w-full h-full p-4 z-10 bg-white">
      <form
        className="flex flex-col justify-between w-full h-full mt-10"
        onSubmit={handleSubmit}
      >
        <div className="space-y-12">
          {/* Timer settings */}
          <div className="space-y-2">
            <span>
              <h3 className="text-lg font-semibold">TIMER</h3>
              <hr className="max-w-32" />
            </span>
            <span className="space-x-16 flex justify-start">
              <div className="flex flex-col items-start">
                <label
                  className="font-regular text-gray-600 opacity-75"
                  htmlFor="pomodoro"
                >
                  Pomodoro
                </label>
                <input
                  type="number"
                  id="pomodoro"
                  name="pomodoro"
                  value={currSettings.pomodoro}
                  onChange={handleInputChange}
                  className="border w-24 h-8 p-2 bg-gray-200"
                />
              </div>

              <div className="flex flex-col items-start">
                <label
                  className="font-regular text-gray-600 opacity-75"
                  htmlFor="shortBreak"
                >
                  Short Break
                </label>
                <input
                  type="number"
                  id="shortBreak"
                  name="shortBreak"
                  value={currSettings.shortBreak}
                  onChange={handleInputChange}
                  className="border w-24 h-8 p-2 bg-gray-200"
                />
              </div>

              <div className="flex flex-col items-start">
                <label
                  className="font-regular text-gray-600 opacity-75"
                  htmlFor="longBreak"
                >
                  Long Break
                </label>
                <input
                  type="number"
                  id="longBreak"
                  name="longBreak"
                  value={currSettings.longBreak}
                  onChange={handleInputChange}
                  className="border w-24 h-8 p-2 bg-gray-200"
                />
              </div>
            </span>
          </div>

          {/* Sound settings */}
          <div className="space-y-2">
            <span>
              <h3 className="text-lg font-semibold">SOUND</h3>
              <hr className="max-w-32" />
            </span>

            {/* Sound Dropdown */}
            <span className="flex justify-between">
              <label
                className="font-regular text-gray-600 opacity-75"
                htmlFor="alarmSound"
              >
                Alarm Sound
              </label>
              <select
                id="alarmSound"
                name="alarmSound"
                value={currSettings.alarmSound}
                onChange={handleInputChange}
                className="border w-36 p-1"
              >
                <option value="digital">Digital</option>
              </select>
            </span>

            {/* Volume slider */}
            <span className="flex justify-between">
              <label
                className="font-regular text-gray-600 opacity-75"
                htmlFor="volume"
              >
                Volume
              </label>
              <input
                type="range"
                id="volume"
                name="volume"
                value={currSettings.volume}
                onChange={handleInputChange}
                className="w-64"
              />
            </span>
          </div>
        </div>

        {/* Save button */}
        <div className="flex mt-4">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-xl shadow"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingsModal;
