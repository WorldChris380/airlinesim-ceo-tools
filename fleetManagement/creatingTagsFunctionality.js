// creatingTagsFuncitonality.js

// Funktion zur Erstellung eines Trash-Buttons
function createTrashButton(buttonContainer, tagId) {
  var trashButton = document.createElement("button");
  trashButton.type = "button";
  trashButton.innerHTML = '<i class="fa fa-trash" style="color: white;"></i>';
  trashButton.style.backgroundColor = "red";
  trashButton.style.color = "#ffffff";
  trashButton.style.border = "none";
  trashButton.style.padding = "7px";
  trashButton.style.margin = "0";
  trashButton.style.borderTopLeftRadius = "0";
  trashButton.style.borderBottomLeftRadius = "0";
  trashButton.style.borderTopRightRadius = "5px";
  trashButton.style.borderBottomRightRadius = "5px";
  trashButton.style.cursor = "pointer";
  trashButton.style.borderLeft = "2px solid white";
  trashButton.style.marginLeft = "10px";

  trashButton.addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();
      buttonContainer.remove();
      removeTagFromLocalStorage(tagId);
      filterRows(); // Optional: Filtere die Zeilen, wenn der Tag entfernt wird
  });

  return trashButton;
}

function createTagButtonAndAppend(tagName, selectedColor, tagId) {
  // Container für einen einzelnen Button
  var buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.flexWrap = "nowrap";
  buttonContainer.style.alignItems = "center";
  buttonContainer.style.marginBottom = "1px";

  // Checkbox erstellen
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = tagId; // Setze die ID der Checkbox auf die ID des Hauptbuttons
  checkbox.style.verticalAlign = "middle";
  checkbox.style.marginTop = "0";
  checkbox.style.marginRight = "10px";

  // Hauptbutton erstellen
  var button = document.createElement("button");
  button.id = tagId; // ID des Hauptbuttons bleibt unverändert
  button.draggable = true;
  button.style.flexWrap = "nowrap";
  button.style.backgroundColor = selectedColor;
  button.style.color = selectedColor === "#f8f9fa" ? "#000000" : "#ffffff"; 
  button.style.border = selectedColor === "#4D5052" ? "2px solid white" : "none"; 
  button.style.padding = "0 0 0 10px";
  button.style.margin = "5px 5px 5px 0";
  button.style.borderRadius = "5px";
  button.style.cursor = "grab";

  // Checkbox in den Button einfügen
  button.appendChild(checkbox);
  button.appendChild(document.createTextNode(tagName));

  // Füge den Trash Button in den Container ein
  button.appendChild(createTrashButton(buttonContainer, tagId));

  // Füge Button in den Container ein
  buttonContainer.appendChild(button);

  // Füge einen Event Listener zu der Checkbox hinzu
  checkbox.addEventListener("change", function() {
      console.log(`Checkbox ${checkbox.id} wurde geändert. Status: ${checkbox.checked}`); // Protokolliere den Änderungsstatus
      filterRows(); // Filtere die Zeilen, wenn die Checkbox geändert wird
  });

  // Buttons in den übergeordneten Wrapper einfügen
  var displayArea = document.querySelector(
      "body > div.container-fluid > div > div.row > div.col-md-9 > div.fleet-action > div"
  );
  displayArea.appendChild(buttonContainer);
}

// Call this function to load existing tags
function loadExistingTags() {
  var tags = loadTagsFromLocalStorage();
  tags.forEach(function (tag) {
      createTagButtonAndAppend(tag.name, tag.color, tag.id);
  });
}

// Load existing tags on page load
window.onload = function () {
  loadExistingTags();
};