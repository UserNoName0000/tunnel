/**
 * CSV Parser — Parses the Ontario University B3 admission data CSV
 * and outputs a JSON representation of all university programs with
 * their entering average distributions.
 *
 * Usage: node scripts/parse-csv.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = join(__dirname, "..", "data", "B3_2026-02-21_1104.csv");
const outputPath = join(__dirname, "..", "src", "lib", "parsed-data.json");

const raw = readFileSync(csvPath, "utf-8");
const lines = raw.split(/\r?\n/);

// ── Parse header rows ──────────────────────────────────────────────
// Line 0: "B. Admission"
// Line 1: Bin headers (95%+, 90-94%, etc.) repeated across columns
// Line 2: Program/Major names repeated for each bin

const binHeaderLine = lines[1];
const programHeaderLine = lines[2];

// Split by comma (keeping empty cells)
const binHeaders = binHeaderLine.split(",").map(s => s.trim());
const programHeaders = programHeaderLine.split(",").map(s => s.trim());

// Figure out which column ranges correspond to which bins
// The bins appear in this order in the CSV:
// 95%+, 90-94%, 85-89%, 80-84%, 75-79%, 70-74%, <70%, Overall average
const binNames = [
  "pct95plus",
  "pct90_94",
  "pct85_89",
  "pct80_84",
  "pct75_79",
  "pct70_74",
  "pctBelow70",
  "overallAvg"
];

// Find the starting column index for each bin section by looking at the bin header row
const binStartIndices = [];
const binLabels = [
  "Percent who received an entering average of 95%+",
  "Percent who received an entering average bwt 90% and 94%",
  "Percent who received an entering average bwt 85% and 89%",
  "Percent who received an entering average bwt 80% and 84%",
  "Percent who received an entering average bwt 75% and 79%",
  "Percent who received an entering average bwt 70% and 74%",
  "Percent who received an entering average below 70%",
  "Overall average"
];

for (const label of binLabels) {
  const idx = binHeaders.findIndex(h => h === label);
  binStartIndices.push(idx);
}

console.log("Bin start indices:", binStartIndices);

// Build a mapping of column index to {bin, program}
// Each bin section has the same set of program columns
// Find program names from the first bin section (95%+)
const firstBinStart = binStartIndices[0];
const secondBinStart = binStartIndices[1];
const programsInSection = [];

for (let i = firstBinStart; i < secondBinStart; i++) {
  const prog = programHeaders[i];
  if (prog && prog !== "") {
    programsInSection.push({ index: i - firstBinStart, name: prog });
  }
}

console.log(`Found ${programsInSection.length} programs per section:`,
  programsInSection.map(p => p.name).join(", "));

// The number of columns per bin section
const sectionWidth = secondBinStart - firstBinStart;
console.log("Section width:", sectionWidth);

// ── Parse data rows ────────────────────────────────────────────────
// Data starts at line 3+
// Format: "University Name ,Fall YYYY,val1,val2,val3,...\n" (multi-line for years)

const results = [];

for (let lineIdx = 3; lineIdx < lines.length; lineIdx++) {
  const line = lines[lineIdx];
  if (!line || line.trim() === "") continue;

  // Each university block starts with the university name
  // Then has multiple ",Fall YYYY,..." entries
  // Split by ",Fall " to get year entries
  const yearEntries = line.split(/,Fall /);
  const universityName = yearEntries[0].trim();

  if (!universityName || universityName === "") continue;

  for (let yIdx = 1; yIdx < yearEntries.length; yIdx++) {
    const yearData = yearEntries[yIdx];
    // First token is the year
    const allValues = yearData.split(",");
    const year = allValues[0].trim();

    if (!year.match(/^\d{4}$/)) continue;

    // The remaining values are the data columns
    const dataValues = allValues.slice(1);

    // For each bin, extract values for each program
    for (const prog of programsInSection) {
      const progData = {
        university: universityName,
        year: parseInt(year),
        program: prog.name,
      };

      let hasData = false;

      for (let binIdx = 0; binIdx < binNames.length; binIdx++) {
        const colOffset = binIdx * sectionWidth + prog.index;
        const rawVal = dataValues[colOffset]?.trim();

        if (rawVal === "*" || rawVal === "" || rawVal === undefined) {
          progData[binNames[binIdx]] = null;
        } else {
          const num = parseFloat(rawVal);
          if (!isNaN(num)) {
            progData[binNames[binIdx]] = num;
            hasData = true;
          } else {
            progData[binNames[binIdx]] = null;
          }
        }
      }

      if (hasData) {
        results.push(progData);
      }
    }
  }
}

console.log(`\nParsed ${results.length} total program-year entries`);

// ── Aggregate: Use most recent year per university+program ─────────
const latestMap = new Map();
for (const entry of results) {
  const key = `${entry.university}|${entry.program}`;
  const existing = latestMap.get(key);
  if (!existing || entry.year > existing.year) {
    latestMap.set(key, entry);
  }
}

const latest = [...latestMap.values()];
console.log(`${latest.length} unique university+program combos (latest year)`);

// ── Show universities ──────────────────────────────────────────────
const unis = [...new Set(latest.map(e => e.university))].sort();
console.log(`\nUniversities (${unis.length}):`);
unis.forEach(u => console.log(`  - ${u}`));

// ── Save full parsed data ──────────────────────────────────────────
writeFileSync(outputPath, JSON.stringify(latest, null, 2));
console.log(`\nSaved to ${outputPath}`);

// ── Also print a sample ────────────────────────────────────────────
console.log("\nSample entries:");
for (const entry of latest.slice(0, 5)) {
  console.log(JSON.stringify(entry));
}
