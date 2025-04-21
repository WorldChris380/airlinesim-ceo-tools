// createTagsArea.js

if (window.location.href.includes("airlinesim.aero/app/fleets")) {
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

    // Flexbox-Anpassungen
    createDiv.style.display = "flex";
    createDiv.style.flexWrap = "wrap"; // Erlaube Zeilenumbruch
    createDiv.style.justifyContent = "flex-start"; // Buttons links ausrichten
    createDiv.style.gap = "10px"; // Abstand zwischen den Buttons

    // Hier fügen wir die existierenden Checkboxen hinzu
    addCheckboxListeners(createDiv);

    // Ensure to append createDiv to createParentDiv before adding to the DOM
    createParentDiv.appendChild(createDiv);
    selectAreaForH2.parentNode.prepend(createParentDiv);
    createH3.insertAdjacentElement("afterend", createParentDiv);
  }

  function addCheckboxListeners(container) {
    // Suche nach den Checkboxen im as-panel-Bereich
    const checkboxes = container.querySelectorAll("input[type='checkbox']");

    checkboxes.forEach((checkbox) => {
      console.log("Checkbox found:", checkbox.id); // Protokolliere die gefundenen Checkboxen
      checkbox.addEventListener("change", function () {
        console.log("Checkbox changed:", this.id, "Checked:", this.checked);
        filterRows(); // Filtere die Zeilen basierend auf den Checkboxen
      });
    });
  }

  if (
    currentUrl.includes("airlinesim.aero/app/fleets") &&
    !currentUrl.includes("airlinesim.aero/app/fleets/aircraft")
  ) {
    createH3AndTagArea();
  }
}
