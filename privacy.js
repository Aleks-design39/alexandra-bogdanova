(() => {
  const storageKey = "ab-analytics-consent-v2";
  const websiteId = "c8fc7d59-a947-4c8f-ac69-d444d7c3cddf";
  const banner = document.getElementById("privacy-banner");
  const settings = document.getElementById("privacy-settings");
  const accept = document.getElementById("privacy-accept");
  const decline = document.getElementById("privacy-decline");

  const loadAnalytics = () => {
    if (document.querySelector("script[data-website-id]")) return;
    const script = document.createElement("script");
    script.src = "https://cloud.umami.is/script.js";
    script.defer = true;
    script.dataset.websiteId = websiteId;
    document.head.append(script);
  };

  let choice;
  try { choice = localStorage.getItem(storageKey); } catch (_) { /* Storage may be unavailable. */ }
  if (choice === "allow") loadAnalytics();
  else if (choice !== "deny") banner.hidden = false;

  const saveChoice = value => {
    try { localStorage.setItem(storageKey, value); } catch (_) { /* Keep the current-page choice. */ }
    choice = value;
    banner.hidden = true;
    if (value === "allow") loadAnalytics();
    else if (document.querySelector("script[data-website-id]")) location.reload();
  };

  accept.addEventListener("click", () => saveChoice("allow"));
  decline.addEventListener("click", () => saveChoice("deny"));
  settings.addEventListener("click", () => {
    banner.hidden = false;
    (choice === "allow" ? accept : decline).focus();
  });
})();
