const SAMPLE_JSON = {
  'BRO': {
    'BSN': { 'W': 10, 'L': 12 },
    'CHC': { 'W': 15, 'L': 7 },
    'CIN': { 'W': 15, 'L': 7 },
    'NYG': { 'W': 14, 'L': 8 },
    'PHI': { 'W': 14, 'L': 8 },
    'PIT': { 'W': 15, 'L': 7 },
    'STL': { 'W': 11, 'L': 11 }
  },
  'BSN': {
    'BRO': { 'W': 12, 'L': 10 },
    'CHC': { 'W': 13, 'L': 9 },
    'CIN': { 'W': 13, 'L': 9 },
    'NYG': { 'W': 13, 'L': 9 },
    'PHI': { 'W': 14, 'L': 8 },
    'PIT': { 'W': 12, 'L': 10 },
    'STL': { 'W': 9, 'L': 13 }
  },
  'CHC': {
    'BRO': { 'W': 7, 'L': 15 },
    'BSN': { 'W': 9, 'L': 13 },
    'CIN': { 'W': 12, 'L': 10 },
    'NYG': { 'W': 7, 'L': 15 },
    'PHI': { 'W': 16, 'L': 6 },
    'PIT': { 'W': 8, 'L': 14 },
    'STL': { 'W': 10, 'L': 12 }
  },
  'CIN': {
    'BRO': { 'W': 7, 'L': 15 },
    'BSN': { 'W': 9, 'L': 13 },
    'CHC': { 'W': 10, 'L': 12 },
    'NYG': { 'W': 13, 'L': 9 },
    'PHI': { 'W': 13, 'L': 9 },
    'PIT': { 'W': 13, 'L': 9 },
    'STL': { 'W': 8, 'L': 14 }
  },
  'NYG': {
    'BRO': { 'W': 8, 'L': 14 },
    'BSN': { 'W': 9, 'L': 13 },
    'CHC': { 'W': 15, 'L': 7 },
    'CIN': { 'W': 9, 'L': 13 },
    'PHI': { 'W': 12, 'L': 10 },
    'PIT': { 'W': 15, 'L': 7 },
    'STL': { 'W': 13, 'L': 9 }
  },
  'PHI': {
    'BRO': { 'W': 8, 'L': 14 },
    'BSN': { 'W': 8, 'L': 14 },
    'CHC': { 'W': 6, 'L': 16 },
    'CIN': { 'W': 9, 'L': 13 },
    'NYG': { 'W': 10, 'L': 12 },
    'PIT': { 'W': 13, 'L': 9 },
    'STL': { 'W': 8, 'L': 14 }
  },
  'PIT': {
    'BRO': { 'W': 7, 'L': 15 },
    'BSN': { 'W': 10, 'L': 12 },
    'CHC': { 'W': 14, 'L': 8 },
    'CIN': { 'W': 9, 'L': 13 },
    'NYG': { 'W': 7, 'L': 15 },
    'PHI': { 'W': 9, 'L': 13 },
    'STL': { 'W': 6, 'L': 16 }
  },
  'STL': {
    'BRO': { 'W': 11, 'L': 11 },
    'BSN': { 'W': 13, 'L': 9 },
    'CHC': { 'W': 12, 'L': 10 },
    'CIN': { 'W': 14, 'L': 8 },
    'NYG': { 'W': 9, 'L': 13 },
    'PHI': { 'W': 14, 'L': 8 },
    'PIT': { 'W': 16, 'L': 6 }
  }
}

// break teams out into array for easy access
const TEAMS = Object.keys(SAMPLE_JSON);

document.addEventListener("DOMContentLoaded", function() {
  // create table in DOM
  const table = document.createElement('table');
  document.body.appendChild(table);

  // create table head
  const tableHead = document.createElement('thead');
  table.appendChild(tableHead);

  // create header row for details
  const headerRow = document.createElement('tr');
  tableHead.appendChild(headerRow);

  // create table detail "Tm" for key on rows and cols
  const tmAxisHeader = document.createElement('th');
  tmAxisHeader.innerText = "Tm";
  headerRow.appendChild(tmAxisHeader);

  // populate table details to fill out header row
  for (let team of TEAMS) {
    const teamNameColHeader = document.createElement('th');
    teamNameColHeader.innerText = team;
    headerRow.appendChild(teamNameColHeader);
  }

  // create table body
  const tableBody = document.createElement('tbody');
  table.appendChild(tableBody);


  // traverse JSON to create rows starting with the team name, then giving
  // wins by that team against the team in the corresponding column
  for (let [team, versusResults] of Object.entries(SAMPLE_JSON)) {
    const bodyRow = document.createElement('tr');
    tableBody.appendChild(bodyRow);

    const teamNameRowHeader = document.createElement('th');
    teamNameRowHeader.innerText = team;
    bodyRow.appendChild(teamNameRowHeader);

    // JSON is presented with head to head results in same order as teams
    // appear in initial list, but the following is to handle the contingency
    // that they might not
    for (let headerTeam of TEAMS) {
      const td = document.createElement('td');
      bodyRow.appendChild(td);
      
      // detect and place space for intersection of same team in row & col
      if (headerTeam === team) td.innerText="-";
      else {
        // set win total to correct results from the nested object
        // using the name of the team in the column as the key.
        td.innerText = versusResults[headerTeam]["W"]
      }
    }
  }
})
