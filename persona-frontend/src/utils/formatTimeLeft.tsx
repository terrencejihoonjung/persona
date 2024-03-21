export const formatTimeLeft = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  minutes.toString().padStart(2, "0");

  return `${
    minutes >= 10 ? minutes.toString().padStart(2, "0") : minutes.toString()
  }:${seconds.toString().padStart(2, "0")}`;
};
