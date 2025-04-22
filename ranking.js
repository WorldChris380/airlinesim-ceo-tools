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
                <th style="vertical-align: middle;">Country ranking (Pax/week)</th>
                <td id="country-ranking-position" style="vertical-align: middle;">Not checked yet.</td>
                <td style="vertical-align: middle; text-align: right;">
                  <a id="update-country-ranking-link">
                    <button class="btn btn-default" id="update-country-ranking-button">Update Countryrank</button>
                  </a>
                </td>
                <td id="last-country-update-date" style="vertical-align: middle; text-align: right;">Not updated yet</td>
              </tr>
              <tr>
                <th style="vertical-align: middle;">World ranking (Pax/week)</th>
                <td id="ranking-position" style="vertical-align: middle;">Not checked yet.</td>
                <td style="vertical-align: middle; text-align: right;">
                  <a id="update-ranking-link">
                    <button class="btn btn-default" id="update-world-ranking-button">Update Worldrank</button>
                  </a>
                </td>
                <td id="last-update-date" style="vertical-align: middle; text-align: right;">Not updated yet</td>
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
  let rankingPositionTd = document.getElementById("ranking-position");
  let updateRankingButton = document.getElementById(
    "update-world-ranking-button"
  );
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

  // Event-Handler für den Update-World-Ranking-Button
  let lastUpdateDateTd = document.getElementById("last-update-date");
  updateRankingButton.onclick = function () {
    // Aktualisiere das World Ranking
    checkRanking(airlineName, rankingPositionTd);

    // Setze das Datum des letzten Updates
    let currentDate = new Date().toLocaleString();
    lastUpdateDateTd.innerText = currentDate;

    // Speichere das Datum im localStorage
    localStorage.setItem("lastUpdateDate", currentDate);
  };

  // Setze das gespeicherte Datum beim Laden der Seite
  let lastUpdateDate = localStorage.getItem("lastUpdateDate");
  if (lastUpdateDate) {
    lastUpdateDateTd.innerText = lastUpdateDate;
  }

  // Event-Handler für den Update-Country-Ranking-Button
  let updateCountryRankingButton = document.getElementById(
    "update-country-ranking-button"
  );
  let countryRankingPositionTd = document.getElementById(
    "country-ranking-position"
  );
  let lastCountryUpdateDateTd = document.getElementById(
    "last-country-update-date"
  );

  updateCountryRankingButton.onclick = function () {
    checkCountryRanking(airlineName, countryRankingPositionTd);

    // Setze das Datum des letzten Updates für das Country Ranking
    let currentDate = new Date().toLocaleString();
    lastCountryUpdateDateTd.innerText = currentDate;

    // Speichere das Datum im localStorage
    localStorage.setItem("lastCountryUpdateDate", currentDate);
  };

  // Setze das gespeicherte Country Ranking beim Laden der Seite
  let savedCountryRanking = localStorage.getItem("countryRankingPosition");
  if (savedCountryRanking) {
    countryRankingPositionTd.innerHTML = "#" + savedCountryRanking;
  }

  // Setze das gespeicherte Datum beim Laden der Seite
  let lastCountryUpdateDate = localStorage.getItem("lastCountryUpdateDate");
  if (lastCountryUpdateDate) {
    lastCountryUpdateDateTd.innerText = lastCountryUpdateDate;
  }
}

// Funktion zum Abrufen des Rankings
function checkRanking(airlineName, rankingPositionTd) {
  let host = window.location.host;
  let parts = host.split(".");
  let subdomain = parts.length > 2 ? parts.slice(0, -2).join(".") : "";
  let statisticURL = `https://${subdomain}.airlinesim.aero/action/info/stat?type=transrecpax&country=0`;

  let newWindow = window.open(statisticURL);
  newWindow.onload = function () {
    let foundElement = Array.from(
      newWindow.document.querySelectorAll("td")
    ).find((td) => td.innerText.trim() === airlineName);

    if (foundElement) {
      let previousSibling = foundElement.previousElementSibling;

      if (previousSibling) {
        console.log("World Ranking gefunden:", previousSibling.innerText);
        rankingPositionTd.innerHTML = "#" + previousSibling.innerText;

        // Speichere den Wert im localStorage
        localStorage.setItem("rankingPosition", previousSibling.innerText);
      } else {
        let noDataMessage =
          "Airline/Server just started - no Position available yet.";
        rankingPositionTd.innerHTML = noDataMessage;
      }
    } else {
      console.log("Airline wurde im World Ranking nicht gefunden.");
    }
    newWindow.close();
  };
}

// Funktion zum Abrufen des Country Rankings
function checkCountryRanking(airlineName, countryRankingPositionTd) {
  let host = window.location.host;
  let parts = host.split(".");
  let subdomain = parts.length > 2 ? parts.slice(0, -2).join(".") : "";

  // Hole die Country-ID aus der Seite
  let countryIDElement = document.querySelector(
    "#enterprise-dashboard > div:nth-child(1) > div.as-panel.facts > div > table > tbody > tr:nth-child(4) > td > a"
  );
  if (!countryIDElement) {
    console.log("Country ID konnte nicht gefunden werden.");
    return;
  }
  let countryID = countryIDElement.href.split("=").pop();
  console.log("Country ID:", countryID);

  // URL für das Country Ranking
  let statisticURL = `https://${subdomain}.airlinesim.aero/action/info/stat?type=transrecpaxcap&country=${countryID}&limit=0`;

  let newWindow = window.open(statisticURL);
  newWindow.onload = function () {
    let foundElement = Array.from(
      newWindow.document.querySelectorAll("td")
    ).find((td) => td.innerText.trim() === airlineName);

    if (foundElement) {
      let previousSibling = foundElement.previousElementSibling;

      if (previousSibling) {
        console.log("Country Ranking gefunden:", previousSibling.innerText);
        countryRankingPositionTd.innerHTML = "#" + previousSibling.innerText;

        // Speichere das Country Ranking im localStorage
        localStorage.setItem(
          "countryRankingPosition",
          previousSibling.innerText
        );
      } else {
        let noDataMessage =
          "Airline/Server just started - no Country Position available yet.";
        countryRankingPositionTd.innerHTML = noDataMessage;
      }
    } else {
      console.log("Airline wurde im Country Ranking nicht gefunden.");
    }
    newWindow.close();
  };
}
