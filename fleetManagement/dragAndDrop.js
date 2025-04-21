// dragAndDrop.js
if (window.location.href.includes("airlinesim.aero/app/fleets")) {
  // Ermöglicht das Ziehen von Buttons
  document.addEventListener("dragstart", function (event) {
    if (event.target.tagName === "BUTTON" && event.target.draggable) {
      event.dataTransfer.setData("text/plain", event.target.id);
    }
  });

  // Ermöglicht das Ablegen der Buttons in der "Assigned tags"-Spalte
  const assignedTagCells = document.querySelectorAll(
    "tbody tr td:nth-child(9)"
  );

  assignedTagCells.forEach((cell) => {
    cell.addEventListener("dragover", function (event) {
      event.preventDefault();
    });

    cell.addEventListener("drop", function (event) {
      event.preventDefault();
      const buttonId = event.dataTransfer.getData("text/plain");
      const draggedButton = document.getElementById(buttonId);

      if (draggedButton) {
        const buttonClone = draggedButton.cloneNode(true);
        buttonClone.removeAttribute("draggable");

        // Entferne die Checkbox aus der Kopie
        const checkbox = buttonClone.querySelector("input[type='checkbox']");
        if (checkbox) {
          buttonClone.removeChild(checkbox);
        }

        // Füge den Trash Button in den Klon ein und kopiere die Event-Listener
        const trashButton = buttonClone.querySelector("button");
        trashButton.addEventListener("click", function (event) {
          event.stopPropagation();
          event.preventDefault();
          buttonClone.remove();
          removeAssignedTagFromLocalStorage(
            cell.parentElement.querySelector("td:nth-child(2) span")
              .textContent,
            buttonId
          );
        });

        // Füge den Button in die Zelle ein
        cell.appendChild(buttonClone);

        // Hole die Registrierungs-ID aus der zweiten Spalte der Zeile
        const registrationId = cell.parentElement.querySelector(
          "td:nth-child(2) span"
        ).textContent;

        // Speichere die Zuordnung von registrationId und buttonId im localStorage
        saveAssignedTagToLocalStorage(registrationId, buttonId);
      }
    });
  });

  // Funktion zum Speichern der Zuordnung von Tags
  function saveAssignedTagToLocalStorage(registrationId, buttonId) {
    const assignedTags = JSON.parse(localStorage.getItem("assignedTags")) || {};
    if (!assignedTags[registrationId]) {
      assignedTags[registrationId] = [];
    }
    // Prüfen, ob der Tag bereits zugeordnet wurde
    if (!assignedTags[registrationId].includes(buttonId)) {
      assignedTags[registrationId].push(buttonId);
      localStorage.setItem("assignedTags", JSON.stringify(assignedTags));
      console.log(
        "Assigned tag saved for registration ID:",
        registrationId,
        "with button ID:",
        buttonId
      ); // Debugging
    }
  }

  // Funktion zum Laden der Tags aus localStorage
  function loadAssignedTags() {
    const assignedTags = JSON.parse(localStorage.getItem("assignedTags")) || {};
    for (const registrationId in assignedTags) {
      const tags = assignedTags[registrationId];

      // Suche nach der Zeile, die der registrationId entspricht
      const row = Array.from(document.querySelectorAll("tbody tr")).find(
        (tr) => {
          const registrationSpan = tr.querySelector("td:nth-child(2) span");
          return (
            registrationSpan && registrationSpan.textContent === registrationId
          );
        }
      );

      if (row) {
        const cell = row.querySelector("td:nth-child(9)"); // Zuordnung zur "Assigned tags"-Spalte
        tags.forEach((tagId) => {
          setTimeout(function () {
            // Verzögerung, um sicherzustellen, dass der Button im DOM vorhanden ist
            const button = document.getElementById(tagId);
            if (button) {
              const buttonClone = button.cloneNode(true);
              buttonClone.removeAttribute("draggable");

              // Entferne Checkbox
              const checkbox = buttonClone.querySelector(
                "input[type='checkbox']"
              );
              if (checkbox) {
                buttonClone.removeChild(checkbox);
              }

              // Füge den Trash Button in den Klon ein und kopiere die Event-Listener
              const trashButton = buttonClone.querySelector("button");
              trashButton.addEventListener("click", function (event) {
                event.stopPropagation();
                event.preventDefault();
                buttonClone.remove();
                removeAssignedTagFromLocalStorage(registrationId, tagId);
              });

              // Füge den Button in die Zelle ein
              cell.appendChild(buttonClone);
            } else {
              console.warn("Button not found for tag ID:", tagId); // Warnung für Debugging
            }
          }, 100); // 100ms Verzögerung, kann je nach Bedarf angepasst werden
        });
      } else {
        console.warn("Row not found for registration ID:", registrationId); // Warnung für Debugging
      }
    }
  }

  // Funktion zum Entfernen eines zugewiesenen Tags aus localStorage
  function removeAssignedTagFromLocalStorage(registrationId, tagId) {
    const assignedTags = JSON.parse(localStorage.getItem("assignedTags")) || {};
    if (assignedTags[registrationId]) {
      assignedTags[registrationId] = assignedTags[registrationId].filter(
        (id) => id !== tagId
      );
      if (assignedTags[registrationId].length === 0) {
        delete assignedTags[registrationId]; // Entferne den Eintrag, wenn keine Tags mehr zugeordnet sind
      }
      localStorage.setItem("assignedTags", JSON.stringify(assignedTags));
      console.log(
        "Assigned tag removed for registration ID:",
        registrationId,
        "with button ID:",
        tagId
      ); // Debugging
    }
  }

  // Lade die Tags, wenn die Seite geladen wird
  loadAssignedTags();
}
