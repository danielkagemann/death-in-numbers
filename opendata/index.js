const fs = require("fs");

const filePath = "23211-0001_00.csv";

fs.readFile(filePath, { encoding: "latin1" }, (err, data) => {
  if (err) throw err;

  const lines = data.split("\n");

  const headerYear = lines[6].split(";").slice(2);
  const headerGender = lines[8].split(";").slice(2);

  const dataLines = lines.slice(9).filter((line) => line.trim() !== "");

  const descriptions = {};
  const dataByYear = {};

  dataLines.forEach((line) => {
    const parts = line.split(";");
    const code = parts[0];
    const description = parts[1];

    if (!code || !description) return;

    // Speichere Beschreibung einmalig
    if (!descriptions[code]) {
      descriptions[code] = description;
    }

    for (let i = 2; i < parts.length; i++) {
      const year = headerYear[i - 2]?.trim();
      const gender = headerGender[i - 2]?.trim().toLowerCase();
      const count = parts[i]?.trim();

      if (!year || !gender || !count) continue;

      if (!dataByYear[year]) {
        dataByYear[year] = [];
      }

      let entry = dataByYear[year].find((item) => item.code === code);
      if (!entry) {
        entry = {
          code: code,
          gender: {
            male: null,
            female: null,
          },
        };
        dataByYear[year].push(entry);
      }

      const parsedCount = isNaN(count) ? count : Number(count);

      if (gender === "männlich") {
        entry.gender.male = parsedCount;
      } else if (gender === "weiblich") {
        entry.gender.female = parsedCount;
      }
    }
  });

  // Gesamtes Objekt
  const finalJson = {
    descriptions: descriptions,
    data: dataByYear,
  };

  fs.writeFileSync("output.json", JSON.stringify(finalJson, null, 2), "utf-8");
  console.log("✅ JSON file written");
});
