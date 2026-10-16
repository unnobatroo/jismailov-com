function getGiscusTheme(): "dark" | "light" {
  const theme = document.documentElement.getAttribute("data-theme");
  if (theme === "dark" || theme === "light") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function syncGiscus(): void {
  const iframe = document.querySelector<HTMLIFrameElement>(
    "iframe.giscus-frame",
  );
  if (!iframe?.contentWindow) return;
  iframe.contentWindow.postMessage(
    { giscus: { setConfig: { theme: getGiscusTheme() } } },
    "https://giscus.app",
  );
}

new MutationObserver(syncGiscus).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"],
});
