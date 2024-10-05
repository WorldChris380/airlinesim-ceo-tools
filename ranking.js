if (
  window.location.href.includes("airlinesim.aero/app/enterprise/dashboard?")
) {
  let row = document.getElementsByClassName("row");

  // Überschrift
  let h3 = document.createElement("h3");
  let col_md_4 = document.getElementsByClassName("col-md-4");
  h3.innerHTML = "AirlineSim CEO Tools";
  col_md_4[1].insertBefore(h3, col_md_4[1].firstChild);

  let createAbsoluteFirstDiv = document.createElement("div");
  createAbsoluteFirstDiv.classList.add("as-panel", "facts");
  col_md_4[1].insertBefore(createAbsoluteFirstDiv, h3.nextSibling);

  // Tabelle
  let createFirstDiv = document.createElement("div");
  createFirstDiv.classList.add("as-table-well");
  createAbsoluteFirstDiv.appendChild(createFirstDiv);

  let createNewDiv = document.createElement("div");
  createFirstDiv.appendChild(createNewDiv);

  let createNewTable = document.createElement("table");
  createNewTable.classList.add("table", "table-striped", "table-hover");
  createNewDiv.appendChild(createNewTable);

  let createNewTbody = document.createElement("tbody");
  createNewTable.appendChild(createNewTbody);
  let createNewTr = document.createElement("tr");
  createNewTbody.appendChild(createNewTr);
  let createNewTh = document.createElement("th");
  createNewTh.innerHTML = "Ranking position (Pax/week)";
  createNewTr.appendChild(createNewTh);

  let createNewTd = document.createElement("td");
  createNewTd.innerHTML = "Not checked yet.";
  createNewTr.appendChild(createNewTd);

  // Nach der Tabelle
  let createNewLink = document.createElement("a");
  createNewLink.innerHTML = "Check Ranking";

  // Hole den Airline-Namen hier
  let getAirlineName = document.querySelector(
    "#enterprise-dashboard > div:nth-child(1) > div.as-panel.facts > div > table > tbody > tr:nth-child(1) > td"
  );
  let airlineName = getAirlineName.innerText;

  // Passiere den Airline-Namen an die Funktion
  createNewLink.onclick = function () {
    checkRanking(airlineName, createNewTd); // Übergebe createNewTd als Argument
  };
  createAbsoluteFirstDiv.appendChild(createNewLink);
}

// Funktion zum Abrufen des Rankings
function checkRanking(airlineName, createNewTd) {
  let host = window.location.host;
  let parts = host.split(".");
  let subdomain = parts.length > 2 ? parts.slice(0, -2).join(".") : "";
  let statisticURL = `https://${subdomain}.airlinesim.aero/action/info/stat?type=transrecpax&limit=0`;

  let newWindow = window.open(statisticURL);
  newWindow.onload = function () {
    let foundElement = Array.from(
      newWindow.document.querySelectorAll("td")
    ).find((td) => td.innerText.trim() === airlineName);

    if (foundElement) {
      let previousSibling = foundElement.previousElementSibling;

      if (previousSibling) {
        console.log(previousSibling.innerText);
        createNewTd.innerHTML = "#" + previousSibling.innerText;
      }
    } else {
      let noDataMessage =
        "Airline/Server just started - no Position available yet.";
      createNewTd.innerHTML = noDataMessage;
    }

    newWindow.close();
  };
}
