import { useState } from "react";
import { Settings } from "../../../types/PomodoroTimerTypes";

type SettingsModalProps = {
  settings: Settings;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  handleModeChange: (mode: string, time: number) => void;
};

function SettingsModal({
  setShowSettings,
  settings,
  setSettings,
  handleModeChange,
}: SettingsModalProps) {
  const [currSettings, setCurrSettings] = useState<Settings>(settings);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSettings(currSettings);
    setShowSettings(false);
    handleModeChange("Pomodoro", currSettings.pomodoro * 60);
  };

  return (
    <div className="absolute inset-0 flex flex-col rounded-2xl w-full h-full p-4 z-10 bg-white">
      <form
        className="flex flex-col justify-between w-full h-full"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8">
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
                <option value="Kitchen">Kitchen</option>
                <option value="Bell">Bell</option>
                <option value="Bird">Bird</option>
                <option value="Digital">Digital</option>
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
