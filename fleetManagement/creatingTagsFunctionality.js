// creatingTagsFunctionality.js

function createTagButtonAndAppend(tagName, selectedColor, tagId) {
  var buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.alignItems = "center";

  // Erstelle die Checkbox
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = tagId + "-checkbox"; // Eindeutige ID für die Checkbox
  checkbox.style.verticalAlign = "middle";
  checkbox.style.marginTop = "0";
  checkbox.style.marginRight = "10px";

  var button = document.createElement("button");
  button.id = tagId;
  button.style.backgroundColor = selectedColor;
  button.style.color = "#ffffff";
  button.style.border = "none";
  button.style.padding = "10px 15px";
  button.style.margin = "5px 0";
  button.style.borderTopLeftRadius = "5px";
  button.style.borderBottomLeftRadius = "5px";
  button.style.borderTopRightRadius = "0px";
  button.style.borderBottomRightRadius = "0px";
  button.style.cursor = "pointer";

  button.appendChild(checkbox); // Checkbox in den Button einfügen
  button.appendChild(document.createTextNode(tagName)); // Text für den Button hinzufügen

  var trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa fa-trash" style="color: white;"></i>';
  trashButton.style.backgroundColor = "red";
  trashButton.style.color = "#ffffff";
  trashButton.style.border = "none";
  trashButton.style.padding = "10px";
  trashButton.style.margin = "0px 5px 0px 0px";
  trashButton.style.borderTopLeftRadius = "0";
  trashButton.style.borderBottomLeftRadius = "0";
  trashButton.style.borderTopRightRadius = "5px";
  trashButton.style.borderBottomRightRadius = "5px";
  trashButton.style.borderLeft = "2px solid white"; // Weißer Rand nur links
  trashButton.style.cursor = "pointer";

  trashButton.addEventListener("click", function () {
    buttonContainer.remove();
    removeTagFromLocalStorage(tagId); // Entferne den Tag aus dem localStorage
  });

  buttonContainer.appendChild(button); // Button mit Checkbox und Text
  buttonContainer.appendChild(trashButton); // Trash Button

  var displayArea = document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-9 > div.fleet-action > div"
  );
  displayArea.appendChild(buttonContainer);
}

// Call this function to load existing tags
function loadExistingTags() {
  var tags = loadTagsFromLocalStorage(); // Tags aus localStorage holen
  tags.forEach(function (tag) {
    createTagButtonAndAppend(tag.name, tag.color, tag.id);
  });
}

// Load existing tags on page load
window.onload = function () {
  loadExistingTags();
};
