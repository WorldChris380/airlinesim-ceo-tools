// createTagsArea.js
const selectAreaForH2 = document.querySelector(
  "body > div.container-fluid > div > div.row > div.col-md-9 > h2"
);
function createH3AndTagArea() {
  const createH3 = document.createElement("h3");
  createH3.innerText = "Created tags";

  selectAreaForH2.parentNode.insertBefore(createH3, selectAreaForH2);

  const createParentDiv = document.createElement("div");
  createParentDiv.classList.add("fleet-action");
  const createDiv = document.createElement("div");
  createDiv.classList.add("as-panel");
  createDiv.style.display = "flex";

  // Ensure to append createDiv to createParentDiv before adding to the DOM
  createParentDiv.appendChild(createDiv);
  selectAreaForH2.parentNode.prepend(createParentDiv);
  createH3.insertAdjacentElement("afterend", createParentDiv);
}

if (
  currentUrl.includes("airlinesim.aero/app/fleets") &&
  !currentUrl.includes("airlinesim.aero/app/fleets/aircraft")
) {
  createH3AndTagArea();
}
