export function debounce(callback: Function, ms: number) {
  let timeoutId: number;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, ms, ...args);
  };
}
