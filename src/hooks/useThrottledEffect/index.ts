import React from "react";

interface UseThrottledEffectProps {
  callback: () => Function | void;
  delay: number;
  deps: [any];
}

export function useThrottledEffect(
  callback = () => {},
  delay = 200,
  deps = []
): UseThrottledEffectProps {
  const [isThrottling, setIsThrottling] = React.useState(false);
  const timerRef = React.useRef(null);
  const isFirstRun = React.useRef(true);

  const runCallbackAfterDelay = React.useCallback(() => {
    setIsThrottling(true);

    if (timerRef.current) return;

    timerRef.current = setTimeout(() => {
      setIsThrottling(false);
      callback();
      timerRef.current = null;
    }, delay);
  }, deps);

  React.useEffect(() => {
    if (!isFirstRun.current) runCallbackAfterDelay();
    else isFirstRun.current = false;

    return () => timerRef.current && clearTimeout(timerRef.current);
  }, deps);

  return isThrottling;
}
