// tableAdjustments.js
if (
  window.location.href.includes("airlinesim.aero/app/fleets") &&
  !window.location.href.includes("airlinesim.aero/app/fleets/aircraft")
) {
  // Wähle die Tabelle aus
  const table = document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-9 > div.as-panel > form > div > table"
  );

  // Wähle das <thead> der Tabelle
  const tableHeader = table.firstElementChild;

  // Fügt die erste Spaltenüberschrift zur letzten Header-Zeile hinzu
  const tableFirstHeaderRow = tableHeader.lastElementChild;
  const createTh1 = document.createElement("th");
  createTh1.innerText = "Assigned tags";
  createTh1.id = "assigned-tags"; // ID für die Header-Zelle
  tableFirstHeaderRow.appendChild(createTh1);

  // Fügt die zweite Spaltenüberschrift zur ersten Header-Zeile hinzu
  const tableSecondHeaderRow = tableHeader.firstElementChild;
  const createTh2 = document.createElement("th");
  createTh2.innerHTML = `<img width="14px" src="${chrome.runtime.getURL(
    "icons/Christian-Boehme-Logo-128px.png"
  )}">`;
  tableSecondHeaderRow.appendChild(createTh2);

  // Füge eine neue Spalte in jeder Zeile des tbody hinzu
  const tableRows = table.querySelectorAll("tbody tr"); // Wähle nur die Zeilen im tbody der ausgewählten Tabelle
  tableRows.forEach((row) => {
    const createTd = document.createElement("td");
    createTd.textContent = "";
    row.appendChild(createTd); // Füge die neue Zelle am Ende der Zeile hinzu
  });
}
