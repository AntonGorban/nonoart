export const throttle = <T extends ReadonlyArray<unknown>>(
  fn: (...args: T) => void,
  limit: number,
  trailing = true,
): ((...args: T) => void) & { cancel: () => void } => {
  let inThrottle = false;
  let lastArgs: T | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const throttled = (...args: T) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;

      const reset = () => {
        inThrottle = false;
        if (trailing && lastArgs) {
          throttled(...lastArgs);
          lastArgs = null;
        }
        if (timeout) clearTimeout(timeout);
        timeout = null;
      };

      timeout = setTimeout(reset, limit);
    } else if (trailing) {
      lastArgs = args;
    }
  };

  throttled.cancel = () => {
    if (timeout) clearTimeout(timeout);
    inThrottle = false;
    lastArgs = null;
  };

  return throttled;
};
