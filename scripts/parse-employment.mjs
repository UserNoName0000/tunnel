/**
 * Parse "employment rates.csv" and generate src/lib/employment-data.ts
 *
 * CSV layout (columns):
 *   Col 0  : University name (only on first row per uni)
 *   Col 1  : Year
 *   Cols 2-28  : Employment Rate (2 Yrs) per program field + Overall Average
 *   Cols 29-55 : Employment Rate (6 Mths) per program field + Overall Average
 *
 * For each university we keep the most recent year's data.
 */

import { readFileSync, writeFileSync } from "fs";

const raw = readFileSync("data/employment rates.csv", "utf-8");
const lines = raw.split("\n").map((l) => l.trimEnd()).filter(Boolean);

// The program fields in CSV column order (cols 2..28 for 2yr, cols 29..55 for 6mo)
const FIELDS = [
  "Agriculture & Biological Science",
  "Architecture",
  "Business & Commerce",
  "Computer Science",
  "Dentistry",
  "Education",
  "Engineering",
  "Fine & Applied Arts",
  "Food Science & Nutrition",
  "Forestry",
  "Humanities",
  "Journalism",
  "Kinesiology, Recreation & Phys. Educ.",
  "Law",
  "Mathematics",
  "Medicine & Related Programs",
  "Nursing",
  "Optometry",
  "Other Arts & Science",
  "Other Health Professions",
  "Pharmacy",
  "Physical Science",
  "Social Science",
  "Theology",
  "Therapy & Rehabilitation",
  "Veterinary Medicine",
  "Overall Average",
];

// Map CSV field names → app category names
const FIELD_TO_CATEGORY = {
  "Agriculture & Biological Science": "Biological & Biomedical Sciences",
  "Architecture": "Architecture & Planning",
  "Business & Commerce": "Commerce/Mgmt/Business Admin",
  "Computer Science": "Computer & Information Science",
  "Dentistry": "Health Profess & Related Programs",
  "Education": "Education",
  "Engineering": "Engineering",
  "Fine & Applied Arts": "Fine & Applied Arts",
  "Food Science & Nutrition": "Family & Consumer/Human Sciences",
  "Forestry": "Natural Resources & Conservation",
  "Humanities": "Liberal Arts & Sciences/General Studies/Humanities",
  "Journalism": "Communication & Journalism",
  "Kinesiology, Recreation & Phys. Educ.": "Kinesiology/Recreation/Physical Education",
  "Law": "Social Sciences",
  "Mathematics": "Mathematics & Statistics",
  "Medicine & Related Programs": "Health Profess & Related Programs",
  "Nursing": "Nursing",
  "Optometry": "Health Profess & Related Programs",
  "Other Arts & Science": "General Science",
  "Other Health Professions": "Health Profess & Related Programs",
  "Pharmacy": "Health Profess & Related Programs",
  "Physical Science": "Physical Science",
  "Social Science": "Social Sciences",
  "Theology": null,
  "Therapy & Rehabilitation": "Health Profess & Related Programs",
  "Veterinary Medicine": "Biological & Biomedical Sciences",
  "Overall Average": null,
};

// Map CSV university names → app university names
const NAME_MAP = {
  "Algoma University": null, // not in admission data
  "Brock University": "Brock University",
  "Carleton University": "Carleton University",
  "Lakehead University": "Lakehead University",
  "Laurentian University": "Laurentian University",
  "McMaster University": "McMaster University",
  "Nipissing University": "Nipissing University",
  "OCAD University": "OCAD University",
  "Ontario Tech University": "Ontario Tech University",
  "Ottawa - Saint-Paul, Universit?": null,
  "Queen's University": "Queen's University",
  "Toronto Metropolitan University": "Toronto Metropolitan University",
  "Trent University": "Trent University",
  "University of Guelph": "University of Guelph",
  "University of Ottawa": "University of Ottawa",
  "University of Toronto": "University of Toronto",
  "University of Waterloo": "University of Waterloo",
  "University of Windsor": "University of Windsor",
  "Western - Brescia University College": "Western University — Brescia University College",
  "Western - Huron University College": "Western University — Huron University College",
  "Western - King's University College": "Western University — King's University College",
  "Western - Main Campus": "Western University",
  "Wilfrid Laurier University": "Wilfrid Laurier University",
  "York University": "York University",
};

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function parseRate(v) {
  if (!v || v.trim() === "" || v.trim() === "*") return null;
  const num = parseFloat(v);
  return isNaN(num) ? null : num;
}

// Skip first 3 header lines
const dataLines = lines.slice(3);
const universities = {};
let currentUni = null;

for (const line of dataLines) {
  const cols = parseCSVLine(line);
  const uniName = cols[0]?.trim();
  const year = cols[1]?.trim();

  if (uniName && uniName.length > 0) {
    currentUni = uniName;
    if (!universities[currentUni]) {
      universities[currentUni] = [];
    }
  }

  if (!currentUni || !year) continue;

  const yearNum = parseInt(year, 10);
  if (isNaN(yearNum)) continue;

  const rates2yr = {};
  const rates6mo = {};

  for (let i = 0; i < FIELDS.length; i++) {
    const field = FIELDS[i];
    const val2yr = parseRate(cols[2 + i]);
    const val6mo = parseRate(cols[29 + i]);
    if (val2yr !== null) rates2yr[field] = val2yr;
    if (val6mo !== null) rates6mo[field] = val6mo;
  }

  universities[currentUni].push({ year: yearNum, rates2yr, rates6mo });
}

// For each university, pick the most recent year's data
const result = [];

for (const [csvName, yearData] of Object.entries(universities)) {
  const appName = NAME_MAP[csvName];
  if (!appName) continue;

  // Sort by year descending
  yearData.sort((a, b) => b.year - a.year);
  const latest = yearData[0];
  if (!latest) continue;

  // Build per-category employment rates
  const categoryRates = {};

  for (const [field, rate2yr] of Object.entries(latest.rates2yr)) {
    const cat = FIELD_TO_CATEGORY[field];
    if (!cat) continue;

    if (!categoryRates[cat]) {
      categoryRates[cat] = { twoYear: [], sixMonth: [] };
    }
    categoryRates[cat].twoYear.push(rate2yr);
  }

  for (const [field, rate6mo] of Object.entries(latest.rates6mo)) {
    const cat = FIELD_TO_CATEGORY[field];
    if (!cat) continue;

    if (!categoryRates[cat]) {
      categoryRates[cat] = { twoYear: [], sixMonth: [] };
    }
    categoryRates[cat].sixMonth.push(rate6mo);
  }

  // Average rates when multiple CSV fields map to same category
  const programs = [];
  for (const [cat, data] of Object.entries(categoryRates)) {
    const avg = (arr) => arr.length === 0 ? null : Math.round((arr.reduce((s, v) => s + v, 0) / arr.length) * 100) / 100;
    programs.push({
      category: cat,
      employmentRate2yr: avg(data.twoYear),
      employmentRate6mo: avg(data.sixMonth),
    });
  }

  // Overall average
  const overall2yr = parseRate(String(latest.rates2yr["Overall Average"] ?? ""));
  const overall6mo = parseRate(String(latest.rates6mo["Overall Average"] ?? ""));

  result.push({
    university: appName,
    dataYear: latest.year,
    overallRate2yr: overall2yr,
    overallRate6mo: overall6mo,
    programs,
  });
}

// Generate TypeScript file
let tsCode = `/**
 * Ontario University Employment Rates
 *
 * AUTO-GENERATED from "employment rates.csv".
 * Uses the most recent available year per university.
 * Rates shown are: 2-year post-graduation and 6-month post-graduation.
 * Do not edit manually.
 *
 * Generated: ${new Date().toISOString()}
 */

export interface ProgramEmploymentRate {
  category: string;
  /** Employment rate 2 years after graduation (%) */
  employmentRate2yr: number | null;
  /** Employment rate 6 months after graduation (%) */
  employmentRate6mo: number | null;
}

export interface UniversityEmployment {
  university: string;
  dataYear: number;
  /** Overall employment rate 2 years after graduation (%) */
  overallRate2yr: number | null;
  /** Overall employment rate 6 months after graduation (%) */
  overallRate6mo: number | null;
  programs: ProgramEmploymentRate[];
}

export const EMPLOYMENT_DATA: UniversityEmployment[] = ${JSON.stringify(result, null, 2)};

/**
 * Look up employment rate for a university + category.
 * Returns the best available data or null.
 */
export function getEmploymentRate(
  university: string,
  category: string
): { rate2yr: number | null; rate6mo: number | null; dataYear: number } | null {
  const uni = EMPLOYMENT_DATA.find(
    (u) => u.university.toLowerCase() === university.toLowerCase()
  );
  if (!uni) return null;

  const prog = uni.programs.find(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
  if (prog) {
    return {
      rate2yr: prog.employmentRate2yr,
      rate6mo: prog.employmentRate6mo,
      dataYear: uni.dataYear,
    };
  }

  // Fall back to overall rate
  return {
    rate2yr: uni.overallRate2yr,
    rate6mo: uni.overallRate6mo,
    dataYear: uni.dataYear,
  };
}
`;

writeFileSync("src/lib/employment-data.ts", tsCode, "utf-8");
console.log(`✓ Generated src/lib/employment-data.ts with ${result.length} universities`);
