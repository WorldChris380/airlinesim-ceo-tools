// createTagForm.js
function createTagCreationArea() {
  let createFormForTagCreation;

  function createForm() {
    const form = document.createElement("form");
    form.classList.add("form-inline");
    return form;
  }

  function createTagButton() {
    const button = document.createElement("button");
    button.style.marginRight = "20px";
    button.type = "submit";
    button.innerHTML = '<i class="fa fa-tag"></i> Create tag';
    button.classList.add("btn", "btn-default");
    return button;
  }

  function createTagInput() {
    const input = document.createElement("input");
    input.classList.add("form-control");
    input.type = "text";
    input.placeholder = "Name tag";
    return input;
  }

  function createDropdownForChoosingColour() {
    const createDropDownList = document.createElement("select");
    const coloursObject = {
      red: "text-danger",
      green: "text-success",
      blue: "text-primary",
      yellow: "text-warning",
      black: "text-dark",
      white: "text-light",
      gray: "text-secondary",
      cyan: "text-info",
      purple: "text-purple",
    };
    createDropDownList.style.marginRight = "3px";
    createDropDownList.classList.add("form-control");

    // Dynamically create options from the object
    Object.keys(coloursObject).forEach((color) => {
      const option = document.createElement("option");
      option.value = color; // Set the option value
      option.textContent = color.charAt(0).toUpperCase() + color.slice(1); // Set the displayed text
      createDropDownList.appendChild(option); // Add the option to the dropdown
    });

    return createDropDownList;
  }

  function createTagCreationForm() {
    const createLiForDisplayArea = document.querySelector(
      "body > div.container-fluid > div > ul > li"
    );
    createLiForDisplayArea.style.display = "flex";
    createLiForDisplayArea.style.justifyContent = "flex-end";

    createFormForTagCreation = createForm();
    createLiForDisplayArea.prepend(createFormForTagCreation);

    const createTagNameArea = document.createElement("div");
    createTagNameArea.classList.add("form-group");
    createFormForTagCreation.appendChild(createTagNameArea);

    const createInputForTagName = createTagInput();
    createTagNameArea.appendChild(createInputForTagName);

    const colorDropdown = createDropdownForChoosingColour();
    createFormForTagCreation.appendChild(colorDropdown);

    const createTagCreationButton = createTagButton();
    createFormForTagCreation.appendChild(createTagCreationButton);

    // Event handling for the form submission
    createFormForTagCreation.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default action

      const tagName = createInputForTagName.value; // Get the tag name
      const selectedColor = colorDropdown.value; // Get the selected color

      // Call the function to create a button in the as-panel area
      createTagButton(tagName, selectedColor);

      // Debug: Log the tag creation
      console.log("Tag created:", tagName);

      // Clear the input field
      createInputForTagName.value = "";
    });
  }

  createTagCreationForm();
}

// Check the URL condition and call the function
const currentUrl = window.location.href;

if (
  currentUrl.includes("airlinesim.aero/app/fleets") &&
  !currentUrl.includes("airlinesim.aero/app/fleets/aircraft")
) {
  createTagCreationArea();
}
