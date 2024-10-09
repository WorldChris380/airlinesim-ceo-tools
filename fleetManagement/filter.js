// filter.js
var activeTags = [];

// Diese Funktion wird aufgerufen, wenn eine Checkbox geändert wird
function filterRows() {
  activeTags = []; // Setze aktive Tags zurück

  // Alle Checkboxen durchlaufen und die IDs der aktiven Tags speichern
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      activeTags.push(checkbox.id); // ID der aktiven Checkbox (Tag)
    }
  });

  console.log("Aktive Tags:", activeTags); // Debugging-Ausgabe der aktiven Tags

  // Tabelle durchlaufen und entsprechend filtern
  var rows = document.querySelectorAll("table tbody tr");
  rows.forEach(function (row) {
    console.log("Processing row:", row); // Debugging-Ausgabe für die verarbeitete Zeile

    var assignedTagCell = row.querySelector("td:nth-child(9)"); // Annahme, dass die 9. Spalte die Assigned Tags enthält

    if (!assignedTagCell) {
      console.warn("Assigned tag cell not found for row:", row); // Warnung, wenn die Zelle nicht gefunden wird
      return; // Überspringe die Zeile, wenn die Zelle nicht existiert
    }

    // Überprüfe, ob die zugewiesenen Tags in der Zelle vorhanden sind
    var assignedTags = Array.from(
      assignedTagCell.querySelectorAll("button")
    ).map(function (button) {
      return button.id; // Hol die IDs der Buttons in der Zelle
    });

    // Zeige die Zeile an, wenn aktive Tags leer sind oder wenn ein aktives Tag in den zugewiesenen Tags enthalten ist
    if (
      activeTags.length === 0 ||
      assignedTags.some((tag) => activeTags.includes(tag))
    ) {
      row.style.display = ""; // Zeige die Zeile an
    } else {
      row.style.display = "none"; // Verstecke die Zeile
    }
  });
}

// Füge Event Listener für die Checkboxen hinzu
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", filterRows); // Filter-Funktion bei Änderung aufrufen
});

// Initiales Filtern, falls bereits aktivierte Checkboxen vorhanden sind
filterRows();
