import { useState } from "react";
import ToggleSwitch from "../../ToggleSwitch";

function WeatherWidget() {
  const [isFahrenheit, setIsFahrenheit] = useState(true);

  const toggleTemperature = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  return (
    <div className="flex flex-col items-center border rounded-2xl w-full max-w-4xl h-1/2 py-7 px-14">
      <span className="w-full flex justify-end mr-2 mb-4">
        <ToggleSwitch
          onToggle={toggleTemperature}
          isFahrenheit={isFahrenheit}
        />
      </span>

      {/* Main Content */}
      <div className="flex flex-col justify-between w-full">
        {/* Current Weather */}
        <div className="flex justify-between mb-36">
          <div id="b1" className="flex flex-col items-start">
            <h3 className="text-lg font-black">Aliso Viejo, CA</h3>
            <h1 className="text-9xl font-regular">90°</h1>
          </div>
          <div id="b2" className="flex flex-col items-end">
            <h3 className="text-lg font-black mb-2">Mostly Clear</h3>
            <img className="w-28 h-28 border" src="" alt="Weather Icon" />
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="flex justify-between border space-x-8">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-lg font-black">1 AM</h3>
            <img className="w-20 h-20 border" src="" alt="Icon" />
            <p className="text-md font-semibold">92°</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h3 className="text-lg font-black">2 AM</h3>
            <img className="w-20 h-20 border" src="" alt="Icon" />
            <p className="text-md font-semibold">92°</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h3 className="text-lg font-black">3 AM</h3>
            <img className="w-20 h-20 border" src="" alt="Icon" />
            <p className="text-md font-semibold">92°</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h3 className="text-lg font-black">4 AM</h3>
            <img className="w-20 h-20 border" src="" alt="Icon" />
            <p className="text-md font-semibold">92°</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <h3 className="text-lg font-black">5 AM</h3>
            <img className="w-20 h-20 border" src="" alt="Icon" />
            <p className="text-md font-semibold">92°</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;
