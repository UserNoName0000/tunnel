/**
 * Generate the university-data.ts file from the parsed CSV JSON.
 * Maps CSV program names to our category system and filters
 * for programs with sufficient bin data.
 *
 * Usage: node scripts/generate-data.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = join(__dirname, "..", "src", "lib", "parsed-data.json");
const outputPath = join(__dirname, "..", "src", "lib", "university-data.ts");

const parsed = JSON.parse(readFileSync(inputPath, "utf-8"));

// ── Category mapping ───────────────────────────────────────────────
const categoryMap = {
  "Agriculture": "Science",
  "Architecture": "Engineering",
  "Architecture & Planning": "Engineering",
  "Arts": "Arts",
  "Biological & Biomedical Sciences": "Science",
  "Business & Commerce": "Business",
  "Commerce/Mgmt/Business Admin": "Business",
  "Communication & Journalism": "Arts",
  "Computer & Information Science": "Computer Science",
  "Education": "Arts",
  "Engineering": "Engineering",
  "Environmental Studies": "Science",
  "Family & Consumer/Human Sciences": "Health",
  "Fine & Applied Arts": "Arts",
  "Fine Arts": "Arts",
  "Forestry": "Science",
  "General Science": "Science",
  "Health Profess & Related Programs": "Health",
  "Household Science": "Health",
  "Journalism": "Arts",
  "Kinesiology/Recreation/Physical Education": "Health",
  "Landscape Architecture": "Engineering",
  "Languages & Linguistics": "Arts",
  "Liberal Arts & Sciences/General Studies/Humanities": "Arts",
  "Mathematics": "Science",
  "Mathematics & Statistics": "Science",
  "Music": "Arts",
  "Natural Resources & Conservation": "Science",
  "Nursing": "Health",
  "Other Administration": "Business",
  "Physical Education": "Health",
  "Physical Science": "Science",
  "Psychology": "Science",
  "Rehabilitation Medicine": "Health",
  "Science": "Science",
  "Social Sciences": "Arts",
  "Social Work": "Health",
};

// ── Skip list ──────────────────────────────────────────────────────
const SKIP_PROGRAMS = new Set([
  "Overall", "Not applicable", "Diplomas", "Other"
]);

// ── University name normalization ──────────────────────────────────
function normalizeUni(name) {
  // Merge Western affiliates under one umbrella
  if (name.startsWith("Western -")) {
    if (name.includes("Main Campus")) return "Western University";
    return name.replace("Western - ", "Western University — ");
  }
  if (name === '"Ottawa - Saint-Paul, Universit?"') return null; // skip broken
  return name;
}

// ── Filter and transform ───────────────────────────────────────────
const entries = [];

for (const row of parsed) {
  if (SKIP_PROGRAMS.has(row.program)) continue;
  
  const uni = normalizeUni(row.university);
  if (!uni) continue;
  
  const category = categoryMap[row.program];
  if (!category) continue;

  // Need at least pct95plus and one other bin
  const bins = [row.pct95plus, row.pct90_94, row.pct85_89, row.pct80_84, row.pct75_79, row.pct70_74, row.pctBelow70];
  const nonNull = bins.filter(v => v !== null && v !== undefined);
  if (nonNull.length < 3) continue; // need at least 3 bins for meaningful stats

  // Compute the known sum and fill nulls proportionally
  // pct75_79 and pct70_74 often missing — combine into pctBelow75
  const pct95plus = row.pct95plus ?? 0;
  const pct90_94 = row.pct90_94 ?? 0;
  const pct85_89 = row.pct85_89 ?? 0;
  const pct80_84 = row.pct80_84 ?? 0;
  const pct75_79 = row.pct75_79 ?? 0;
  const pct70_74 = row.pct70_74 ?? 0;
  const pctBelow70 = row.pctBelow70 ?? 0;
  const pctBelow75 = pct75_79 + pct70_74 + pctBelow70;

  // Sum of known
  const total = pct95plus + pct90_94 + pct85_89 + pct80_84 + pctBelow75;
  
  // If total is unreasonably low, skip
  if (total < 30) continue;

  // Normalize to 100
  const factor = total > 0 ? 100 / total : 1;
  const norm = (v) => Math.round(v * factor * 10) / 10;

  // Use overallAvg as estimatedCutoff if available,
  // otherwise estimate from bins
  let cutoff = row.overallAvg;
  if (!cutoff) {
    // Estimate from weighted bin midpoints
    const weightedSum = pct95plus * 96.5 + pct90_94 * 92 + pct85_89 * 87 + pct80_84 * 82 + pct75_79 * 77 + pct70_74 * 72 + pctBelow70 * 67;
    cutoff = total > 0 ? Math.round(weightedSum / total * 10) / 10 : 80;
  }

  entries.push({
    university: uni,
    program: row.program,
    category,
    pct95plus: norm(pct95plus),
    pct90_94: norm(pct90_94),
    pct85_89: norm(pct85_89),
    pct80_84: norm(pct80_84),
    pctBelow75: norm(pctBelow75),
    estimatedCutoff: cutoff,
    year: row.year,
  });
}

// Sort by university, then category, then program
entries.sort((a, b) => 
  a.university.localeCompare(b.university) || 
  a.category.localeCompare(b.category) || 
  a.program.localeCompare(b.program)
);

console.log(`Generated ${entries.length} program entries across ${[...new Set(entries.map(e => e.university))].length} universities`);

// ── Generate TypeScript ────────────────────────────────────────────
let ts = `/**
 * Ontario University Admission Data (2022–2023)
 *
 * AUTO-GENERATED from the Ontario University enrolment headcount
 * report (B3_2026-02-21_1104.csv). Do not edit manually.
 *
 * Each program entry contains the percentage of first-year students
 * who entered with a given average range. This distribution is used
 * to model admission probability via statistical inference.
 *
 * Generated: ${new Date().toISOString()}
 */

export interface ProgramAdmissionData {
  university: string;
  program: string;           // Major / Faculty
  category: string;          // e.g. "Engineering", "Business", "Arts", "Science", "Health", "Computer Science"
  /** % of admitted students with 95%+ entering average */
  pct95plus: number;
  /** % with 90-94.9% entering average */
  pct90_94: number;
  /** % with 85-89.9% entering average */
  pct85_89: number;
  /** % with 80-84.9% entering average */
  pct80_84: number;
  /** % with below 80% entering average */
  pctBelow75: number;
  /** Published or estimated admission average cutoff */
  estimatedCutoff: number;
  /** Data year */
  year: number;
}

export const UNIVERSITY_DATA: ProgramAdmissionData[] = [\n`;

for (const e of entries) {
  ts += `  {\n`;
  ts += `    university: ${JSON.stringify(e.university)},\n`;
  ts += `    program: ${JSON.stringify(e.program)},\n`;
  ts += `    category: ${JSON.stringify(e.category)},\n`;
  ts += `    pct95plus: ${e.pct95plus},\n`;
  ts += `    pct90_94: ${e.pct90_94},\n`;
  ts += `    pct85_89: ${e.pct85_89},\n`;
  ts += `    pct80_84: ${e.pct80_84},\n`;
  ts += `    pctBelow75: ${e.pctBelow75},\n`;
  ts += `    estimatedCutoff: ${e.estimatedCutoff},\n`;
  ts += `    year: ${e.year},\n`;
  ts += `  },\n`;
}

ts += `];

/** All unique categories */
export const CATEGORIES = [
  "Computer Science",
  "Engineering",
  "Business",
  "Science",
  "Health",
  "Arts",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** All unique universities */
export const UNIVERSITIES = [...new Set(UNIVERSITY_DATA.map((d) => d.university))];
`;

writeFileSync(outputPath, ts);
console.log(`Written to ${outputPath}`);

// Stats
const cats = {};
entries.forEach(e => { cats[e.category] = (cats[e.category] || 0) + 1; });
console.log("\nPrograms per category:");
Object.entries(cats).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

const unis = {};
entries.forEach(e => { unis[e.university] = (unis[e.university] || 0) + 1; });
console.log("\nPrograms per university:");
Object.entries(unis).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
