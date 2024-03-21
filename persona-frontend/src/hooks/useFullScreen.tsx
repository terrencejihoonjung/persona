type RequestFullScreenFunction = (
  element: Element | null
) => Promise<void> | undefined;

function useFullScreen() {
  const enter: RequestFullScreenFunction = (element) => {
    const el = element as HTMLElement & {
      requestFullscreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => Promise<void>; // Safari
    };

    if (el.requestFullscreen) {
      return el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      // Safari
      return el.webkitRequestFullscreen();
    }
  };

  const exit: () => Promise<void> | undefined = () => {
    if (document.exitFullscreen) {
      return document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      // Safari
      return (document as any).webkitExitFullscreen();
    }
  };

  const isFullScreen: () => boolean = () => {
    return !!(
      document.fullscreenElement || (document as any).webkitFullscreenElement
    );
  };

  return { enter, exit, isFullScreen };
}

export default useFullScreen;
