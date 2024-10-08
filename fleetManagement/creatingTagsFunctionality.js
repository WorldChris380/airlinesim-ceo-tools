function createTagButtonAndAppend(tagName, selectedColor, tagId) {
  // Container für einen einzelnen Button
  var buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.flexWrap = "nowrap"; // Verwende nowrap, um das Umbrechen zu verhindern
  buttonContainer.style.alignItems = "center";
  buttonContainer.style.marginBottom = "10px"; // Abstand zwischen den Zeilen

  // Checkbox erstellen
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = tagId + "-checkbox";
  checkbox.style.verticalAlign = "middle";
  checkbox.style.marginTop = "0";
  checkbox.style.marginRight = "10px";

  // Hauptbutton erstellen
  var button = document.createElement("button");
  button.id = tagId;
  button.style.flexWrap = "nowrap";
  button.style.backgroundColor = selectedColor;
  button.style.color = selectedColor === "#f8f9fa" ? "#000000" : "#ffffff"; // Schwarz für weiß
  button.style.border = "none";
  button.style.padding = "0px 3px";
  button.style.margin = "5px 15px 5px 0";
  button.style.borderRadius = "5px";
  button.style.cursor = "grab";

  // Checkbox in den Button einfügen
  button.appendChild(checkbox);
  button.appendChild(document.createTextNode(tagName)); // Text für den Button hinzufügen

  // Trash Button erstellen
  var trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa fa-trash" style="color: white;"></i>';
  trashButton.style.backgroundColor = "red";
  trashButton.style.color = "#ffffff";
  trashButton.style.border = "none";
  trashButton.style.padding = "10px";
  trashButton.style.margin = "0px -10px 0 0 ";
  trashButton.style.borderTopLeftRadius = "0";
  trashButton.style.borderBottomLeftRadius = "0";
  trashButton.style.borderTopRightRadius = "5px";
  trashButton.style.borderBottomRightRadius = "5px";
  trashButton.style.cursor = "pointer";

  trashButton.style.marginLeft = "10px"; // Optional: Abstand zwischen Button und Trash-Icon

  trashButton.addEventListener("click", function () {
    buttonContainer.remove();
    removeTagFromLocalStorage(tagId); // Entferne den Tag aus dem localStorage
  });

  // Füge Button und Trash Button in den Container ein
  buttonContainer.appendChild(button);
  button.appendChild(trashButton);

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
