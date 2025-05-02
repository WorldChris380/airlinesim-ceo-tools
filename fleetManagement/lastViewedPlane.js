// lastViewedPlane.js

if (
  window.location.href.includes("airlinesim.aero/app/fleets") &&
  !window.location.href.includes("airlinesim.aero/app/fleets/aircraft")
) {
  function addLastViewedPlaneHeaders() {
    let lastViewedPlaneAreaHeader = document.querySelector(
      "body > div.container-fluid > div > div.row > div.col-md-9 > div.as-panel > form > div > table > thead > tr:nth-child(1)"
    );
    let lastViewedPlaneAreaHeaderRow2 = document.querySelector(
      "body > div.container-fluid > div > div.row > div.col-md-9 > div.as-panel > form > div > table > thead > tr:nth-child(2)"
    );
    lastViewedPlaneAreaHeader.innerHTML += `
    <th>
        <img width="14px" src="${chrome.runtime.getURL(
          "icons/Christian-Boehme-Logo-128px.png"
        )}">
    </th>`;
    lastViewedPlaneAreaHeaderRow2.innerHTML += `<th>Last viewed</th>`;
  }

  function createRowsForLastViewedPlanesColumn() {
    let fleetManagementTableRows = document.querySelectorAll(
      "body > div.container-fluid > div > div.row > div.col-md-9 > div.as-panel > form > div > table > tbody > tr"
    );

    fleetManagementTableRows.forEach((row) => {
      // Füge eine neue Zelle für das Datum hinzu
      let lastViewedCell = document.createElement("td");
      lastViewedCell.classList.add("last-viewed-cell");
      lastViewedCell.innerText = "Never"; // Standardwert
      row.appendChild(lastViewedCell);

      // Hole die Reg. aus der zweiten Spalte
      let regElement = row.querySelector("td:nth-child(2) > span");
      if (!regElement) return; // Überspringe, wenn keine Reg. gefunden wird
      let reg = regElement.innerText.trim();

      // Lade das gespeicherte Datum aus dem localStorage
      let savedDate = localStorage.getItem(`lastViewed_${reg}`);
      if (savedDate) {
        lastViewedCell.innerText = new Date(savedDate).toLocaleString(); // Zeige das Datum im lokalen Format an
        updateCellColor(lastViewedCell, savedDate); // Aktualisiere die Farbe basierend auf dem Datum
      }

      // Füge einen Event-Listener für den Button hinzu
      let button = row.querySelector(
        "td.actions > div > div:nth-child(2) > a.btn.btn-default"
      );
      if (button) {
        button.addEventListener("click", () => {
          let currentDate = new Date().toISOString(); // Speichere das Datum im ISO-Format
          lastViewedCell.innerText = new Date(currentDate).toLocaleString(); // Zeige das Datum im lokalen Format an
          localStorage.setItem(`lastViewed_${reg}`, currentDate); // Speichere im localStorage
          updateCellColor(lastViewedCell, currentDate); // Aktualisiere die Farbe
        });
      }
    });
  }

  function updateCellColor(cell, dateString) {
    let currentDate = new Date();
    let cellDate = new Date(dateString);

    // Berechne die Differenz in Tagen
    let diffInTime = currentDate - cellDate;
    let diffInDays = diffInTime / (1000 * 3600 * 24);

    // Setze die Farbe basierend auf der Differenz
    if (diffInDays > 30) {
      cell.style.color = "	#FF0000"; // Älter als 30 Tage
    } else if (diffInDays > 14) {
      cell.style.color = "yellow"; // Älter als 14 Tage
    } else {
      cell.style.color = "#5cb85c"; // Weniger als 14 Tage
    }
  }

  // Füge die Header hinzu und erstelle die Spalten
  addLastViewedPlaneHeaders();
  createRowsForLastViewedPlanesColumn();
}
