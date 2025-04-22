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
            <thead>
              <th style="vertical-align: middle;">Ranking (PAX per week)</th>
              <th style="vertical-align: middle;">Position</th>
              <th style="vertical-align: middle; text-align: right;">Update</th>
              <th style="vertical-align: middle; text-align: right;">Last Update</th>
            </thead>
              <tr>
                <th style="vertical-align: middle;">Country</th>
                <td id="country-ranking-position" style="vertical-align: middle;">Not checked yet.</td>
                <td style="vertical-align: middle; text-align: right;">
                  <a id="update-country-ranking-link">
                    <button class="btn btn-default" id="update-country-ranking-button">Update</button>
                  </a>
                </td>
                <td id="last-country-update-date" style="vertical-align: middle; text-align: right;">Not updated yet</td>
              </tr>
              <tr>
                <th style="vertical-align: middle;">Continent</th>
                <td id="ranking-position" style="vertical-align: middle;">Not checked yet.</td>
                <td style="vertical-align: middle; text-align: right;">
                  <a id="update-contintent-ranking-link">
                    <button class="btn btn-default" id="update-contintent-ranking-button">Update</button>
                  </a>
                </td>
                <td id="last-update-date" style="vertical-align: middle; text-align: right;">Not updated yet</td>
              </tr>
              <tr>
                <th style="vertical-align: middle;">World</th>
                <td id="world-ranking-position" style="vertical-align: middle;">Not checked yet.</td>
                <td style="vertical-align: middle; text-align: right;">
                  <a id="update-ranking-link">
                    <button class="btn btn-default" id="update-world-ranking-button">Update</button>
                  </a>
                </td>
                <td id="last-world-update-date" style="vertical-align: middle; text-align: right;">Not updated yet</td>
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
  let updateRankingButton = document.getElementById(
    "update-world-ranking-button"
  );
  let worldRankingPositionTd = document.getElementById(
    "world-ranking-position"
  );
  let lastWorldUpdateDateTd = document.getElementById("last-world-update-date");

  updateRankingButton.onclick = function () {
    // Aktualisiere das World Ranking
    checkRanking(airlineName, worldRankingPositionTd);

    // Setze das Datum des letzten Updates
    let currentDate = new Date().toLocaleString();
    lastWorldUpdateDateTd.innerText = currentDate;

    // Speichere das Datum im localStorage mit Subdomain
    let subdomain = getSubdomain();
    localStorage.setItem(`lastWorldUpdateDate_${subdomain}`, currentDate);
  };

  // Setze das gespeicherte World Ranking beim Laden der Seite
  let subdomain = getSubdomain();
  let savedWorldRanking = localStorage.getItem(
    `worldRankingPosition_${subdomain}`
  );
  if (savedWorldRanking) {
    worldRankingPositionTd.innerHTML = "#" + savedWorldRanking;
  }

  // Setze das gespeicherte Datum beim Laden der Seite
  let lastWorldUpdateDate = localStorage.getItem(
    `lastWorldUpdateDate_${subdomain}`
  );
  if (lastWorldUpdateDate) {
    lastWorldUpdateDateTd.innerText = lastWorldUpdateDate;
    updateDateClass(lastWorldUpdateDateTd); // Überprüfe und setze die Klasse
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

    // Speichere das Datum im localStorage mit Subdomain
    let subdomain = getSubdomain();
    localStorage.setItem(`lastCountryUpdateDate_${subdomain}`, currentDate);
  };

  // Setze das gespeicherte Country Ranking beim Laden der Seite
  let savedCountryRanking = localStorage.getItem(
    `countryRankingPosition_${subdomain}`
  );
  if (savedCountryRanking) {
    countryRankingPositionTd.innerHTML = "#" + savedCountryRanking;
  }

  // Setze das gespeicherte Datum beim Laden der Seite
  let lastCountryUpdateDate = localStorage.getItem(
    `lastCountryUpdateDate_${subdomain}`
  );
  if (lastCountryUpdateDate) {
    lastCountryUpdateDateTd.innerText = lastCountryUpdateDate;
    updateDateClass(lastCountryUpdateDateTd); // Überprüfe und setze die Klasse
  }

  // Event-Handler für den Update-Continent-Ranking-Button
  let updateContinentRankingButton = document.getElementById(
    "update-contintent-ranking-button"
  );
  let continentRankingPositionTd = document.getElementById("ranking-position");
  let lastContinentUpdateDateTd = document.getElementById("last-update-date");

  updateContinentRankingButton.onclick = function () {
    // Hole die Continent-ID aus der Seite
    let continentIDElement = document.querySelector(
      "#enterprise-dashboard > div:nth-child(1) > div.as-panel.facts > div > table > tbody > tr:nth-child(3) > td > a"
    );

    if (!continentIDElement) {
      console.log("Continent-ID konnte nicht gefunden werden.");
      return;
    }

    // Öffne den Link und finde die Continent-ID
    let continentHref = continentIDElement.href;
    let newWindow = window.open(continentHref);

    newWindow.onload = function () {
      let continentNameElement = newWindow.document.querySelector(
        "body > div.container-fluid > div > div > div > div:nth-child(1) > div.col-md-4 > div > div > table > tbody:nth-child(1) > tr:nth-child(9) > td:nth-child(2)"
      );

      if (!continentNameElement) {
        console.log("Continent-Name konnte nicht gefunden werden.");
        newWindow.close();
        return;
      }

      let continentName = continentNameElement.innerText.trim();
      console.log("Gefundener Kontinent:", continentName);

      // Mappe den Kontinentnamen auf die ID
      let continentIDMap = {
        Afrika: 1,
        Europa: 2,
        Mittelamerika: 3,
        Nordamerika: 4,
        Südamerika: 5,
        Ostasien: 6,
        Vorderasien: 7,
        Ozeanien: 8,
      };

      let continentID = continentIDMap[continentName];
      if (!continentID) {
        console.log("Ungültiger Kontinent:", continentName);
        newWindow.close();
        return;
      }

      console.log("Gefundene Continent-ID:", continentID);

      // Rufe das Continent-Ranking ab
      checkContinentRanking(
        airlineName,
        continentRankingPositionTd,
        continentID
      );

      // Setze das Datum des letzten Updates
      let currentDate = new Date().toLocaleString();
      lastContinentUpdateDateTd.innerText = currentDate;

      // Speichere das Datum im localStorage mit Subdomain
      let subdomain = getSubdomain();
      localStorage.setItem(`lastContinentUpdateDate_${subdomain}`, currentDate);

      newWindow.close();
    };
  };

  // Setze das gespeicherte Continent Ranking beim Laden der Seite
  let savedContinentRanking = localStorage.getItem(
    `continentRankingPosition_${subdomain}`
  );
  if (savedContinentRanking) {
    continentRankingPositionTd.innerHTML = "#" + savedContinentRanking;
  }

  // Setze das gespeicherte Datum beim Laden der Seite
  let lastContinentUpdateDate = localStorage.getItem(
    `lastContinentUpdateDate_${subdomain}`
  );
  if (lastContinentUpdateDate) {
    lastContinentUpdateDateTd.innerText = lastContinentUpdateDate;
    updateDateClass(lastContinentUpdateDateTd); // Überprüfe und setze die Klasse
  }
}

// Funktion zum Abrufen des Rankings
function checkRanking(airlineName, worldRankingPositionTd) {
  let host = window.location.host;
  let parts = host.split(".");
  let subdomain = getSubdomain();

  // URLs, die vor dem Abrufen des World-Rankings aufgerufen werden müssen
  let continentZeroURL = `https://${subdomain}.airlinesim.aero/action/info/stat?type=transrecpax&continent=0`;
  let countryZeroURL = `https://${subdomain}.airlinesim.aero/action/info/stat?type=transrecpax&country=0`;

  // Öffne die erste URL (continent=0)
  let continentZeroWindow = window.open(continentZeroURL);
  continentZeroWindow.onload = function () {
    console.log("Continent=0 Statistik geladen.");
    continentZeroWindow.close();

    // Öffne die zweite URL (country=0) nach dem Schließen der ersten
    let countryZeroWindow = window.open(countryZeroURL);
    countryZeroWindow.onload = function () {
      console.log("Country=0 Statistik geladen.");
      countryZeroWindow.close();

      // Nach dem Schließen der zweiten URL, rufe das World-Ranking ab
      let statisticURL = `https://${subdomain}.airlinesim.aero/action/info/stat?type=transrecpax&limit=0`;

      let newWindow = window.open(statisticURL);
      newWindow.onload = function () {
        let foundElement = Array.from(
          newWindow.document.querySelectorAll("td")
        ).find((td) => td.innerText.trim() === airlineName);

        if (foundElement) {
          let previousSibling = foundElement.previousElementSibling;

          if (previousSibling) {
            console.log("World Ranking gefunden:", previousSibling.innerText);
            worldRankingPositionTd.innerHTML = "#" + previousSibling.innerText;

            // Speichere den Wert im localStorage mit Subdomain
            localStorage.setItem(
              `worldRankingPosition_${subdomain}`,
              previousSibling.innerText
            );
          } else {
            let noDataMessage =
              "Airline/Server just started - no Position available yet.";
            worldRankingPositionTd.innerHTML = noDataMessage;
          }
        } else {
          console.log("Airline wurde im World Ranking nicht gefunden.");
        }
        newWindow.close();
      };
    };
  };
}

// Funktion zum Abrufen des Country Rankings
function checkCountryRanking(airlineName, countryRankingPositionTd) {
  let host = window.location.host;
  let subdomain = getSubdomain();

  // URL für das Continent-0-Statistikfenster
  let continentZeroURL = `https://${subdomain}.airlinesim.aero/action/info/stat?type=transrecpax&continent=0`;

  // Öffne das Continent-0-Statistikfenster
  let continentZeroWindow = window.open(continentZeroURL);

  continentZeroWindow.onload = function () {
    console.log("Continent=0 Statistik geladen.");
    continentZeroWindow.close();

    // Nach dem Schließen des Continent-0-Fensters, hole die Country-ID
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
    let statisticURL = `https://${subdomain}.airlinesim.aero/action/info/stat?type=transrecpax&country=${countryID}&limit=0`;

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

          // Speichere das Country Ranking im localStorage mit Subdomain
          localStorage.setItem(
            `countryRankingPosition_${subdomain}`,
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
  };
}

// Funktion zum Abrufen des Continent Rankings
function checkContinentRanking(
  airlineName,
  continentRankingPositionTd,
  continentID
) {
  let host = window.location.host;
  let parts = host.split(".");
  let subdomain = parts.length > 2 ? parts.slice(0, -2).join(".") : "";

  // URL für das Continent Ranking
  let statisticURL = `https://${subdomain}.airlinesim.aero/action/info/stat?type=transrecpax&continent=${continentID}`;

  let newWindow = window.open(statisticURL);
  newWindow.onload = function () {
    let foundElement = Array.from(
      newWindow.document.querySelectorAll("td")
    ).find((td) => td.innerText.trim() === airlineName);

    if (foundElement) {
      let previousSibling = foundElement.previousElementSibling;

      if (previousSibling) {
        console.log("Continent Ranking gefunden:", previousSibling.innerText);
        continentRankingPositionTd.innerHTML = "#" + previousSibling.innerText;

        // Speichere das Continent Ranking im localStorage mit Subdomain
        localStorage.setItem(
          `continentRankingPosition_${subdomain}`,
          previousSibling.innerText
        );
      } else {
        let noDataMessage =
          "Airline/Server just started - no Continent Position available yet.";
        continentRankingPositionTd.innerHTML = noDataMessage;
      }
    } else {
      console.log("Airline wurde im Continent Ranking nicht gefunden.");
    }
    newWindow.close();
  };
}

// Funktion zum Überprüfen und Setzen der Klasse basierend auf dem Datum
function updateDateClass(dateElement) {
  const currentDate = new Date();
  const lastUpdateDate = new Date(dateElement.innerText);

  // Berechne die Differenz in Tagen
  const timeDifference = currentDate - lastUpdateDate;
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  // Setze die Klasse basierend auf der Differenz
  if (daysDifference > 7) {
    dateElement.classList.remove("good");
    dateElement.classList.add("bad");
  } else {
    dateElement.classList.remove("bad");
    dateElement.classList.add("good");
  }
}

// Funktion zum Abrufen der Subdomain
function getSubdomain() {
  let host = window.location.host;
  let parts = host.split(".");
  return parts.length > 2 ? parts.slice(0, -2).join(".") : "default";
}
