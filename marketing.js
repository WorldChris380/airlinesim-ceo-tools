let AirlineSimLogo = document.querySelector(
  "body > nav.navbar.navbar-default.as-navbar-meta > div > div.navbar-header > a"
);
AirlineSimLogo.insertAdjacentHTML(
  "afterend",
  `<a class="navbar-brand" id="christianBoehmeLogo" href="https://christian-boehme.com/airlinesim_extention.html" target="_blank"
    style="background: url('${chrome.runtime.getURL(
      "icons/Christian-Boehme-Logo-128px.png"
    )}') no-repeat center center; width: 96px; padding: 10px 0; background-size: contain;">AirlineSim CEO Tools</a>`
);

let footer = document.getElementsByClassName("as-footer-line-element");
let version = chrome.runtime.getManifest().version;
footer[4].insertAdjacentHTML(
  "afterend",
  `<span id="extentions-version" class="as-footer-line-element">AirlineSim CEO Tools Version is: ${version}</span>`
);
let extentionsVersion = document.getElementById("extentions-version");
extentionsVersion.style.marginLeft = "25%";
