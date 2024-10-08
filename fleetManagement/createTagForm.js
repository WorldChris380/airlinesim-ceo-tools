// createTagForm.js

function createTagCreationArea() {
  var createFormForTagCreation;

  function createForm() {
    var form = document.createElement("form");
    form.classList.add("form-inline");
    return form;
  }

  function createTagButton() {
    var button = document.createElement("button");
    button.style.marginRight = "20px";
    button.type = "submit";
    button.innerHTML = '<i class="fa fa-tag"></i> Create tag';
    button.classList.add("btn", "btn-default");
    return button;
  }

  function createTagInput() {
    var input = document.createElement("input");
    input.classList.add("form-control");
    input.type = "text";
    input.placeholder = "Name tag";
    return input;
  }

  function createDropdownForChoosingColour() {
    var createDropDownList = document.createElement("select");
    var coloursObject = {
      red: "#dc3545", // Bootstrap's btn-danger
      green: "#198754", // Bootstrap's btn-success
      blue: "#0d6efd", // Bootstrap's btn-primary
      yellow: "#ffc107", // Bootstrap's btn-warning
      black: "#212529", // Bootstrap's btn-dark
      white: "#f8f9fa", // Bootstrap's btn-light
      gray: "#6c757d", // Bootstrap's btn-secondary
      turquoise: "#0dcaf0", // Bootstrap's btn-info
    };

    createDropDownList.style.marginRight = "3px";
    createDropDownList.classList.add("form-control");

    // Dynamically create options from the object
    Object.keys(coloursObject).forEach(function (color) {
      var option = document.createElement("option");
      option.value = coloursObject[color];
      option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
      createDropDownList.appendChild(option);
    });

    return createDropDownList;
  }

  function createTagCreationForm() {
    var createLiForDisplayArea = document.querySelector(
      "body > div.container-fluid > div > ul > li"
    );
    createLiForDisplayArea.style.display = "flex";
    createLiForDisplayArea.style.justifyContent = "flex-end";

    createFormForTagCreation = createForm();
    createLiForDisplayArea.prepend(createFormForTagCreation);

    var createTagNameArea = document.createElement("div");
    createTagNameArea.classList.add("form-group");
    createFormForTagCreation.appendChild(createTagNameArea);

    var createInputForTagName = createTagInput();
    createTagNameArea.appendChild(createInputForTagName);

    var colorDropdown = createDropdownForChoosingColour();
    createFormForTagCreation.appendChild(colorDropdown);

    var createTagCreationButton = createTagButton();
    createFormForTagCreation.appendChild(createTagCreationButton);

    createFormForTagCreation.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default action

      var tagName = createInputForTagName.value.trim(); // Get the tag name and trim whitespace
      var selectedColor = colorDropdown.value; // Access the selected color

      console.log("Tag Name:", tagName);
      console.log("Selected Color:", selectedColor);

      if (!tagName || !selectedColor) {
        alert("Bitte geben Sie einen Tag-Namen ein und wählen Sie eine Farbe."); // Alert the user
        return;
      }

      // Generate a unique ID for each new tag
      var tagId = "tag-button-" + Date.now(); // Create a unique ID

      // Save the tag in localStorage
      saveTagToLocalStorage(tagId, tagName, selectedColor); // Call function from localStorage.js

      // Create and append the new tag button
      createTagButtonAndAppend(tagName, selectedColor, tagId); // Create the tag button

      // Clear the input field after the tag is created
      createInputForTagName.value = "";
    });
  }

  createTagCreationForm();
}

// Check the URL condition and call the function
var currentUrl = window.location.href;

if (
  currentUrl.includes("airlinesim.aero/app/fleets") &&
  !currentUrl.includes("airlinesim.aero/app/fleets/aircraft")
) {
  createTagCreationArea();
}
