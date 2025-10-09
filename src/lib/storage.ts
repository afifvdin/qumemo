export function localStorageProvider(): Map<string, any> {
  if (typeof window === "undefined") {
    return new Map();
  }

  const map = new Map<string, any>(
    JSON.parse(localStorage.getItem("qumemo") || "[]"),
  );

  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("qumemo", appCache);
  });

  return map;
}
