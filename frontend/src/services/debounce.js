export function debounce(fn, wait = 300) {
  let timeoutId;

  return (...args) =>
    new Promise((resolve, reject) => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(async () => {
        try {
          resolve(await fn(...args));
        } catch (error) {
          reject(error);
        }
      }, wait);
    });
}
