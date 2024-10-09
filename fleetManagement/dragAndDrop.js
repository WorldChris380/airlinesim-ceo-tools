// Ermöglicht das Ziehen von Buttons
document.addEventListener("dragstart", function (event) {
    if (event.target.tagName === "BUTTON" && event.target.draggable) {
      event.dataTransfer.setData("text/plain", event.target.id);
      event.target.style.opacity = "0.5"; // Mache den Button halbtransparent
    }
  });
  
  // Setze die Opazität zurück, wenn der Drag-Vorgang endet
  document.addEventListener("dragend", function (event) {
    if (event.target.tagName === "BUTTON") {
      event.target.style.opacity = ""; // Setze die Opazität zurück
    }
  });
  
// Ermöglicht das Ablegen der Buttons in den Zellen
const tableCells = document.querySelectorAll("tbody td"); // Alle Zellen im tbody auswählen
tableCells.forEach((cell) => {
  cell.addEventListener("dragover", function (event) {
    event.preventDefault(); // Erlaubt das Ablegen
  });

  cell.addEventListener("drop", function (event) {
    event.preventDefault(); // Verhindert die Standardaktion (z.B. das Öffnen eines Links)
    const buttonId = event.dataTransfer.getData("text/plain"); // Hole die ID des gezogenen Buttons
    const draggedButton = document.getElementById(buttonId); // Finde den Button

    // Erstelle eine Kopie des Buttons, um ihn in die Zelle einzufügen
    const buttonClone = draggedButton.cloneNode(true);
    buttonClone.removeAttribute("draggable"); // Entferne die draggable-Eigenschaft von der Kopie
    buttonClone.style.opacity = ""; // Setze die Opazität zurück

    // Entferne die Checkbox aus der Kopie
    const checkbox = buttonClone.querySelector("input[type='checkbox']");
    if (checkbox) {
      buttonClone.removeChild(checkbox);
    }

    // Füge den Trash Button in den Klon ein und kopiere die Event-Listener
    const trashButton = buttonClone.querySelector("button"); // Angenommen, es ist der erste Button im Klon
    const tagId = draggedButton.id; // Holen Sie die tagId aus dem ursprünglichen Button
    trashButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Verhindert das Auslösen von Ereignissen auf den übergeordneten Elementen
      event.preventDefault(); // Verhindert das Neuladen der Seite
      buttonClone.remove(); // Entferne den Klon des Tags
      removeTagFromLocalStorage(tagId); // Entferne den Tag aus dem localStorage
    });

    // Füge den Button in die Zelle ein
    cell.appendChild(buttonClone);
  });
});
