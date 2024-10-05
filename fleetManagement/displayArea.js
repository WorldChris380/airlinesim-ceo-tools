function createTagCreationForm() {
  // Display Area for textarea and button to create tags
  const createLiForDisplayArea = document.querySelector(
    "body > div.container-fluid > div > ul > li"
  );
  createLiForDisplayArea.style.display = "flex";
  createLiForDisplayArea.style.justifyContent = "flex-end";
  const createFormForTagCreation = document.createElement("form");
  createFormForTagCreation.classList.add("form-inline");

  // Insert the form as the first child of the list item
  createLiForDisplayArea.prepend(createFormForTagCreation);

  // Add form and button to displayarea
  const createTagNameArea = document.createElement("div");
  createTagNameArea.classList.add("form-group");
  const createTagCreationButton = document.createElement("button");
  createTagCreationButton.style.marginRight = "6px";
  createTagCreationButton.type = "submit";
  createTagCreationButton.innerHTML = '<i class="fa fa-tag"></i> Create Tag';
  createTagCreationButton.classList.add("btn", "btn-default");
  createFormForTagCreation.appendChild(createTagNameArea);
  createFormForTagCreation.appendChild(createTagCreationButton);

  // Add nameform for tag creation button
  const createInputForTagName = document.createElement("input");
  createInputForTagName.classList.add("form-control");
  createInputForTagName.style.marginRight = "3px";
  createInputForTagName.type = "text";
  createTagNameArea.appendChild(createInputForTagName);
}
const currentUrl = window.location.href;

if (
  currentUrl.includes("airlinesim.aero/app/fleets") &&
  !currentUrl.includes("airlinesim.aero/app/fleets/aircraft")
) {
  createTagCreationForm();
}
