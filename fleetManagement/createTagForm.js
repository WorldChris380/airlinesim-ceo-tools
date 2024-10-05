function createTagCreationArea() {
  let createFormForTagCreation;

  function createForm() {
    const form = document.createElement("form");
    form.classList.add("form-inline");
    return form;
  }

  function createTagButton() {
    const button = document.createElement("button");
    button.style.marginRight = "6px";
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

    // Optionen aus dem Objekt dynamisch erstellen (ohne Klassen hinzuzufügen)
    Object.keys(coloursObject).forEach((color) => {
      const option = document.createElement("option");
      option.value = color; // Setzt den Wert der Option auf den Farbnamen
      option.textContent = color.charAt(0).toUpperCase() + color.slice(1); // Text der Option (z.B. "Red")
      createDropDownList.appendChild(option); // Fügt die Option dem Dropdown hinzu
    });

    return createDropDownList;
  }

  // Funktion zur Erstellung des Tag-Erstellungsformulars
  function createTagCreationForm() {
    // Display Area für das Formular
    const createLiForDisplayArea = document.querySelector(
      "body > div.container-fluid > div > ul > li"
    );
    createLiForDisplayArea.style.display = "flex";
    createLiForDisplayArea.style.justifyContent = "flex-end";

    // Formular erstellen und einfügen
    createFormForTagCreation = createForm();
    createLiForDisplayArea.prepend(createFormForTagCreation);

    // Eingabefeld für Tag-Namen erstellen und einfügen
    const createTagNameArea = document.createElement("div");
    createTagNameArea.classList.add("form-group");
    createFormForTagCreation.appendChild(createTagNameArea);

    const createInputForTagName = createTagInput();
    createTagNameArea.appendChild(createInputForTagName);

    // Dropdown für Farbauswahl erstellen und einfügen
    const colorDropdown = createDropdownForChoosingColour();
    createFormForTagCreation.appendChild(colorDropdown);

    // Button erstellen und einfügen
    const createTagCreationButton = createTagButton();
    createFormForTagCreation.appendChild(createTagCreationButton);

    // Event-Handling für das Formular
    createFormForTagCreation.addEventListener("submit", function (event) {
      event.preventDefault(); // Verhindert die Standardaktion
      // Hier den Code für die Erstellung des Tags hinzufügen
      console.log("Tag created:", createInputForTagName.value); // Beispiel: Tag-Name ausgeben
    });
  }

  // Aufruf der Funktion zur Erstellung des Tag-Erstellungsformulars
  createTagCreationForm();
}

// Überprüfe die URL-Bedingung und rufe die Funktion auf
const currentUrl = window.location.href;

if (
  currentUrl.includes("airlinesim.aero/app/fleets") &&
  !currentUrl.includes("airlinesim.aero/app/fleets/aircraft")
) {
  createTagCreationArea();
}
