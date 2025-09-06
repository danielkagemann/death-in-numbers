// imports
const fs = require("fs");
const readline = require("readline");

// locals
const filePath = "database.csv";
const outputPath = "../application/public/database.json";
const fileStream = fs.createReadStream(filePath);
let lineCount = 0;
const json = {};
const countries = {};
const bufferSize = 10000; // log every n lines

// create interface for reading line by line
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity, // read until end of line
});

async function updateCountryInformation() {
  console.log("fetching country information...");
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=latlng,cca3"
  );
  const countryJson = await response.json();

  // update countries with lat/lon
  const list = Object.keys(countries);
  list.forEach((name) => {
    const info = countryJson.find((c) => c.cca3 === countries[name].code);
    if (info && info.latlng) {
      countries[name].lat = info.latlng[0];
      countries[name].lon = info.latlng[1];
    }
  });

  const countryList = Object.entries(countries).map(([name, item]) => ({
    name,
    ...item,
  }));

  // write output file
  fs.writeFileSync(
    outputPath,
    JSON.stringify({ countries: countryList, data: json }, null, 2)
  );
  console.log(`read ${lineCount} lines.`);
  console.log("done.");
}

/**
 * listener for each line
 */
rl.on("line", (line) => {
  if (lineCount > 0) {
    const [, , countryCode, country, year, sex, ageGroup, , number] =
      line.split(",");

    const group = ageGroup.replace(/Age[_]*/g, "");
    // build json structure
    if (!json[country]) json[country] = {};
    if (!json[country][year]) json[country][year] = {};
    if (!json[country][year][sex]) json[country][year][sex] = {};
    json[country][year][sex][group] = parseFloat(number) || 0;

    // add country to the list
    if (!countries[country])
      countries[country] = { code: countryCode, lat: 0, lon: 0 };
  }
  if (lineCount % bufferSize) {
    console.log(`...read line ${lineCount}`);
  }
  lineCount++;
});

/**
 * listener for end of file
 */
rl.on("close", () => {
  // try to get some country information
  updateCountryInformation();
});
