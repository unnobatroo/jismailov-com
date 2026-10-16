const theme = () =>
  document.documentElement.dataset.theme ??
  (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

new MutationObserver(() =>
  document
    .querySelector<HTMLIFrameElement>("iframe.giscus-frame")
    ?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: theme() } } },
      "https://giscus.app",
    ),
).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-theme"],
});
