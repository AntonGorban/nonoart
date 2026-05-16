export const debounce = <T extends ReadonlyArray<unknown>>(
  fn: (...args: T) => void,
  delay: number,
  immediate = false,
): ((...args: T) => void) & { cancel: () => void } => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: T) => {
    if (timer) clearTimeout(timer);

    if (immediate && !timer) {
      fn(...args);
    }

    timer = setTimeout(() => {
      if (!immediate) fn(...args);
      timer = null;
    }, delay);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
};
