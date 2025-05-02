// createTagsArea.js

if (
  window.location.href.includes("airlinesim.aero/app/fleets") &&
  !window.location.href.includes("airlinesim.aero/app/fleets/aircraft")
) {
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
    createDiv.style.gap = "0px"; // Abstand zwischen den Buttons

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

  //Making tags menu sticky
  document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-9"
  ).style.position = "sticky";
  document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-9"
  ).style.top = "102px";
  document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-9 > h3:nth-child(1)"
  ).style.position = "sticky";
  // document.querySelector(
  //   "body > div.container-fluid > div > div.row > div.col-md-9 > h3:nth-child(1)"
  // ).style.top = "102px";
  document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-9 > h3:nth-child(1)"
  ).style.zIndex = "9";
  document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-9 > div.fleet-action"
  ).style.position = "sticky";
  document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-9 > div.fleet-action"
  ).style.zIndex = "9";
  // document.querySelector(
  //   "body > div.container-fluid > div > div.row > div.col-md-9 > div.fleet-action"
  // ).style.top = "128px";

  let fleetColumn = document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-3 > div > div"
  );
  fleetColumn.style.position = "sticky";
  fleetColumn.style.overflowY = "scroll";
  fleetColumn.style.maxHeight = "70vh";

  let rightFleetManagementColumn = document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-9"
  );
  rightFleetManagementColumn.style.overflowY = "scroll";
  rightFleetManagementColumn.style.maxHeight = "77vh";

  // Scrollbar für das Element "div.as-panel" hinzufügen
  document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-9 > div.as-panel"
  ).style.overflowY = "auto"; // Aktiviert die vertikale Scrollbar
  document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-9 > div.as-panel"
  ).style.maxHeight = "40vh"; // Begrenzung der maximalen Höhe
  document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-9 > div.as-panel"
  ).style.zIndex = "0";
  document.querySelector(
    "body > div.container-fluid > div > div.row > div.col-md-9 > div.fleet-action > div"
  ).style.zIndex = "9";
  document.querySelector("body").style.overflowY = "hidden"; // Deaktiviert die vertikale Scrollbar

  // Scrollbar für unteren Aktionsbereich im Flottenmanagement
  if (document.querySelector("#id2efb")) {
    document.querySelector("#id2efb").style.overflowY = "auto";
    document.querySelector("#id2efb").style.maxHeight = "20vh";
  }
}
