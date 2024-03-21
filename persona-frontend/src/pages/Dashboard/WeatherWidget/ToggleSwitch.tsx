type ToggleSwitchProps = {
  onToggle: () => void;
  isFahrenheit: boolean;
};

function ToggleSwitch({ onToggle, isFahrenheit }: ToggleSwitchProps) {
  return (
    <div
      className="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
      onClick={onToggle}
    >
      <div
        className={`bg-white w-1/2 h-full rounded-full shadow-md transform ${
          isFahrenheit ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <span className="h-full flex items-center justify-center text-xs font-bold px-2">
          {isFahrenheit ? "°F" : "°C"}
        </span>
      </div>
    </div>
  );
}

export default ToggleSwitch;
