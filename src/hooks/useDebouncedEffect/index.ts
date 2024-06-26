import React from "react";

interface UseDebouncedEffectProps {
  callback: () => Function | void;
  delay: number;
  deps: [any];
}

export function useDebouncedEffect(
  callback = () => {},
  delay = 200,
  deps = []
): UseDebouncedEffectProps {
  const [isDebouncing, setIsDebouncing] = React.useState(false);

  const timerRef = React.useRef(null);
  const isFirstRun = React.useRef(true);

  const runCallbackAfterDelay = React.useCallback(() => {
    setIsDebouncing(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsDebouncing(false);
      callback();
    }, delay);
  }, deps);

  React.useEffect(() => {
    if (!isFirstRun.current) runCallbackAfterDelay();
    else isFirstRun.current = false;
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, deps);

  return isDebouncing;
}
