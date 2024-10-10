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
      standard: "#4D5052",
      red: "#dc3545",
      green: "#198754",
      blue: "#0d6efd",
      yellow: "#ffc107",
      black: "#212529",
      white: "#f8f9fa",
      darkGrey: "#353536",
      turquoise: "#0dcaf0",
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

      // Generate a unique ID for the new tag
      var subdomain = window.location.hostname.split('.')[0]; // Get the subdomain
      var tagId = subdomain + "-" + Date.now(); // Create the tagId using the current timestamp for uniqueness

      // Store the tag in localStorage
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
