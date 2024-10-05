if (window.location.href.includes("airlinesim.aero/app/com/numbers/")) {
// Funktion, um das heutige Datum im Format TT.MM.JJJJ zu ermitteln
function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Nur das Datum, keine Uhrzeit

  // Tag, Monat und Jahr extrahieren
  const day = String(today.getDate()).padStart(2, "0"); // Tag im Format 2-stellig
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Monat im Format 2-stellig
  const year = today.getFullYear(); // Jahr

  const formattedDate = `${day}.${month}.${year}`; // Formatierung
  console.log("Heutiges Datum ermittelt:", formattedDate);
  return formattedDate; // Rückgabe im Format TT.MM.JJJJ
}
getToday();

// Funktion, um das Datum aus einer Tabellenspalte zu extrahieren (Format: TT.MM.JJJJ)
function getDateFromCell(cell) {
  // Überprüfen, ob die Zelle existiert
  if (!cell) {
    console.error("Zelle nicht gefunden");
    return null;
  }

  // Extrahiere den Textinhalt der Zelle
  const cellContent = cell.textContent.trim();
  console.log("Inhalt der Zelle:", cellContent);

  if (cellContent === "") {
    console.error("Zelle ist leer");
    return null;
  }

  // Teile den Inhalt der Zelle in Tag, Monat und Jahr
  const parts = cellContent.split(".");

  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JavaScript-Monate sind 0-indexiert
    const year = parseInt(parts[2], 10);

    // Validierung des Datums
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      const date = new Date(year, month, day);
      if (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
      ) {
        console.log("Datum aus Zelle extrahiert:", date);
        return date;
      } else {
        console.error("Fehler beim Erstellen des Datums: Ungültiges Datum");
        return null;
      }
    } else {
      console.error("Fehler beim Parsen des Datums: Ungültige Werte", {
        day,
        month,
        year,
      });
      return null;
    }
  } else {
    console.error("Fehler: Falsches Datumsformat", cellContent);
    return null;
  }
}

// Beispielaufruf (beispielsweise beim Durchlaufen der Zeilen)
const rows = document.querySelectorAll("tr"); // Alle Zeilen abrufen
rows.forEach((row) => {
  const dateCell = row.cells[2]; // 3. Spalte direkt auswählen
  if (!dateCell) {
    console.error("Datum-Zelle nicht gefunden in dieser Reihe");
    return;
  }
  const date = getDateFromCell(dateCell); // Datum extrahieren
  if (!date) {
    console.error("Datum aus der Zelle konnte nicht extrahiert werden");
    return;
  }

  const statusCell = row.cells[5]; // 6. Spalte für Status
  if (!statusCell) {
    console.error("Status-Zelle nicht gefunden in dieser Reihe");
    return;
  }

  const auslastungCell = row.cells[7]; // 8. Spalte für Auslastung
  if (!auslastungCell) {
    console.error("Auslastung-Zelle nicht gefunden in dieser Reihe");
    return;
  }

  // Hier kannst du weitere Logik hinzufügen, um die Auslastung oder den Preis anzupassen
});

// Hauptfunktion zur Berechnung des Durchschnitts der Auslastung
function berechneDurchschnittlicheAuslastung() {
  const table = document.querySelector(".as-table-well"); // Tabelle mit der Klasse as-table-well auswählen
  if (!table) {
    console.error("Tabelle mit der Klasse 'as-table-well' nicht gefunden");
    return;
  }
  
  const rows = table.querySelectorAll("tbody tr"); // Zeilen innerhalb des tbody abrufen
  const today = getToday();

  let summeAuslastung = 0;
  let anzahlFluege = 0;

  console.log("Durchsuche alle Tabellenreihen...");

  rows.forEach((row) => {
    const dateCell = row.cells[2]; // 3. Spalte
    const statusCell = row.cells[5]; // 6. Spalte
    const auslastungCell = row.cells[7]; // 8. Spalte

    const flightDate = getDateFromCell(dateCell);

    // Bedingungen: Datum vor heute und 5. Spalte == 'Y'
    if (flightDate < today && statusCell.textContent.trim() === "Y") {
      const auslastung = parseFloat(auslastungCell.textContent);
      console.log("Auslastung ermittelt:", auslastung);
      if (!isNaN(auslastung)) {
        summeAuslastung += auslastung;
        anzahlFluege++;
        console.log("Summe der Auslastung aktualisiert:", summeAuslastung);
        console.log("Anzahl der berücksichtigten Flüge:", anzahlFluege);
      }
    } else {
      console.log("Reihe ignoriert, da sie nicht die Bedingungen erfüllt.");
    }
  });

  const durchschnittlicheAuslastung =
    anzahlFluege > 0 ? summeAuslastung / anzahlFluege : 0;
  console.log(
    `Durchschnittliche Auslastung: ${durchschnittlicheAuslastung.toFixed(2)}%`
  );
}

// Funktion aufrufen
berechneDurchschnittlicheAuslastung();

}