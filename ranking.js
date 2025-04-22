if (
  window.location.href.includes("airlinesim.aero/app/enterprise/dashboard?")
) {
  let col_md_4 = document.getElementsByClassName("col-md-4");

  // HTML-Struktur als Template Literal
  let htmlContent = `
    <h3>
      <img width="12px" src="${chrome.runtime.getURL(
        "icons/Christian-Boehme-Logo-128px.png"
      )}" alt="AS CEO Tools">
      AirlineSim CEO Tools
    </h3>
    <div class="as-panel facts">
      <div class="as-table-well">
        <div>
          <table class="table table-striped table-hover">
            <tbody>
              <tr>
                <th style="vertical-align: middle;">Ranking position (Pax/week)</th>
                <td id="ranking-position" style="vertical-align: middle;">Not checked yet.</td>
                <td style="vertical-align: middle; text-align: right;">
                  <a id="update-ranking-link">
                    <button class="btn btn-default">Update Ranking</button>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Füge die HTML-Struktur in die Seite ein
  col_md_4[1].insertAdjacentHTML("afterbegin", htmlContent);

  // Abrufen des gespeicherten Rankings aus dem localStorage
  let savedRanking = localStorage.getItem("rankingPosition");

  // Überprüfen, ob ein Wert vorhanden ist
  let rankingPositionTd = document.getElementById("ranking-position");
  if (savedRanking) {
    console.log("Gespeichertes Ranking:", savedRanking);
    rankingPositionTd.innerHTML = "#" + savedRanking;
  } else {
    console.log("Kein gespeichertes Ranking gefunden.");
  }

  // Hole den Airline-Namen
  let getAirlineName = document.querySelector(
    "#enterprise-dashboard > div:nth-child(1) > div.as-panel.facts > div > table > tbody > tr:nth-child(1) > td"
  );
  let airlineName = getAirlineName.innerText;

  // Event-Handler für den Update-Button
  let updateRankingLink = document.getElementById("update-ranking-link");
  updateRankingLink.onclick = function () {
    checkRanking(airlineName, rankingPositionTd); // Übergebe rankingPositionTd als Argument
  };
}

// Funktion zum Abrufen des Rankings
function checkRanking(airlineName, rankingPositionTd) {
  let host = window.location.host;
  let parts = host.split(".");
  let subdomain = parts.length > 2 ? parts.slice(0, -2).join(".") : "";
  let statisticURL = `https://${subdomain}.airlinesim.aero/action/info/stat?type=transrecpax&limit=0`;

  let newWindow = window.open(statisticURL);
  newWindow.onload = function () {
    let foundElement = Array.from(
      newWindow.document.querySelectorAll("td")
    ).find((td) => td.innerText.trim() === airlineName);

    if (foundElement) {
      let previousSibling = foundElement.previousElementSibling;

      if (previousSibling) {
        console.log(previousSibling.innerText);
        rankingPositionTd.innerHTML = "#" + previousSibling.innerText;

        // Speichere den Wert im localStorage
        localStorage.setItem("rankingPosition", previousSibling.innerText);
      } else {
        let noDataMessage =
          "Airline/Server just started - no Position available yet.";
        rankingPositionTd.innerHTML = noDataMessage;
      }
    }
    newWindow.close();
  };
}
