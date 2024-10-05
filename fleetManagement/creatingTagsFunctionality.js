function createTagButtonAndAppend(tagName, colorClass) {
  const createDiv = document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-9 > div.fleet-action > div"
  );

  if (!createDiv) {
    console.error("as-panel not found!");
    return;
  }

  const tagButton = document.createElement("button");
  tagButton.classList.add("btn", "btn-default", colorClass);
  tagButton.innerText = tagName; // Set the button text to the tag name
  tagButton.style.margin = "5px"; // Optional: Add margin for spacing
  tagButton.id = `tag-button-${Date.now()}`; // Set a unique ID for the button

  createDiv.appendChild(tagButton); // Append button to the as-panel
}
