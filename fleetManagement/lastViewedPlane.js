// lastViewedPlane.js

if (window.location.href.includes("airlinesim.aero/app/fleets")) {
  function addLastViewedPlaneHeaders() {
    let lastViewedPlaneAreaHeader = document.querySelector(
      "#idda4 > tr:nth-child(1)"
    );
    let lastViewedPlaneAreaHeaderRow2 = document.querySelector(
      "#idda4 > tr:nth-child(2)"
    );
    lastViewedPlaneAreaHeader.innerHTML += `
    <th>
        <img width="14px" src="${chrome.runtime.getURL(
          "icons/Christian-Boehme-Logo-128px.png"
        )}">
    </th>`;
    lastViewedPlaneAreaHeaderRow2.innerHTML += `<th>Last viewed</th>`;
  }

  function createRowsForLastViewedPlanesColumn() {
    let fleetManagementTable = document.getElementById("idd95");
    let fleetManagementTableRows =
      fleetManagementTable.getElementsByTagName("tr");

    for (
      let rowAmount = 0;
      rowAmount < fleetManagementTableRows.length;
      rowAmount++
    ) {
      fleetManagementTableRows[rowAmount].innerHTML += `<td></td>`;
    }
  }

  addLastViewedPlaneHeaders();
  createRowsForLastViewedPlanesColumn();
}
