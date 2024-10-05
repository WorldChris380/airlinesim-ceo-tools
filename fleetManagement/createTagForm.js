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
      red: "btn-danger", // Button class for red
      green: "btn-success", // Button class for green
      blue: "btn-primary", // Button class for blue
      yellow: "btn-warning", // Button class for yellow
      black: "btn-dark", // Button class for black
      white: "btn-light", // Button class for white
      gray: "btn-secondary", // Button class for gray
      cyan: "btn-info", // Button class for cyan
    };
    createDropDownList.style.marginRight = "3px";
    createDropDownList.classList.add("form-control");

    // Dynamically create options from the object
    Object.keys(coloursObject).forEach(function (color) {
      const option = document.createElement("option");
      option.value = coloursObject[color]; // Set the option value to the Bootstrap class
      option.textContent = color.charAt(0).toUpperCase() + color.slice(1); // Set the displayed text
      createDropDownList.appendChild(option); // Add the option to the dropdown
    });

    return createDropDownList;
  }

  function createTagButtonAndAppend(tagName, colorClass) {
    const createDiv = document.querySelector(
      "body > div.container-fluid > div > div.row > div.col-md-9 > div.fleet-action > div"
    );

    if (!createDiv) {
      console.error("as-panel not found!");
      return;
    }

    const tagButton = document.createElement("button");
    tagButton.classList.add("btn", colorClass); // Set the button color class
    tagButton.innerText = tagName; // Set the button text to the tag name
    tagButton.style.margin = "5px"; // Optional: Add margin for spacing
    tagButton.id = "tag-button-" + Date.now(); // Set a unique ID for the button

    createDiv.appendChild(tagButton); // Append button to the as-panel
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
      createTagButtonAndAppend(tagName, selectedColor);

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
