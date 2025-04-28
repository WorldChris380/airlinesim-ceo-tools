// Show version in footer
let footer = document.getElementsByClassName("as-footer-line-element");
let version = chrome.runtime.getManifest().version;
footer[4].insertAdjacentHTML(
  "afterend",
  `<span id="extentions-version" class="as-footer-line-element"><img width="14px" src="${chrome.runtime.getURL(
    "icons/Christian-Boehme-Logo-128px.png"
  )}" alt="AS CEO Tools"> AirlineSim CEO Tools Version is: ${version}</span>`
);
let extentionsVersion = document.getElementById("extentions-version");
extentionsVersion.style.marginLeft = "25%";
