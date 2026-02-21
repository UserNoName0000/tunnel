/**
 * Parse expenses.csv and generate src/lib/expenses-data.ts
 *
 * The CSV has a complex layout:
 *   Col 0: University name (only on first row per uni)
 *   Col 1: Year (e.g. "2023-2024")
 *   Cols 2-9:  Domestic  (Tuition, Ancillary, Room&Board, Room, Board, Books, Transport, Other)
 *   Cols 10-17: International (same fields)
 *
 * Strategy: For each university, find the most recent year that has
 * tuition data (domestic). If 2023-2024 is missing tuition, fall back
 * to 2022-2023. Always prefer the most recent room & board data available.
 */

import { readFileSync, writeFileSync } from "fs";

const raw = readFileSync("data/expenses.csv", "utf-8");
const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);

// Skip header rows (first 3 lines)
const dataLines = lines.slice(3);

// Map CSV university names → our app university names
const NAME_MAP = {
  "Brock University": "Brock University",
  "Carleton University": "Carleton University",
  "Lakehead University": "Lakehead University",
  "Laurentian University": "Laurentian University",
  "McMaster University": "McMaster University",
  "Nipissing University": "Nipissing University",
  "OCAD University": "OCAD University",
  "Ontario Tech University": "Ontario Tech University",
  "Ottawa - Saint-Paul, Universit?": null, // not in our data
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

// Parse CSV line respecting quoted fields
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

// Parse all rows into university records
const universities = {};
let currentUni = null;

for (const line of dataLines) {
  const cols = parseCSVLine(line);
  
  // Check if this line starts a new university (col 0 is not empty)
  const uniName = cols[0]?.trim();
  const year = cols[1]?.trim();
  
  if (uniName && uniName.length > 0) {
    currentUni = uniName;
    if (!universities[currentUni]) {
      universities[currentUni] = [];
    }
  }
  
  if (!currentUni || !year) continue;
  
  const parseNum = (v) => {
    if (!v || v.trim() === "") return null;
    return parseFloat(v.replace(/,/g, ""));
  };
  
  const record = {
    year,
    domestic: {
      tuition: parseNum(cols[2]),
      ancillary: parseNum(cols[3]),
      roomAndBoard: parseNum(cols[4]),
      roomOnly: parseNum(cols[5]),
      boardOnly: parseNum(cols[6]),
      books: parseNum(cols[7]),
      transportation: parseNum(cols[8]),
      other: parseNum(cols[9]),
    },
    international: {
      tuition: parseNum(cols[10]),
      ancillary: parseNum(cols[11]),
      roomAndBoard: parseNum(cols[12]),
      roomOnly: parseNum(cols[13]),
      boardOnly: parseNum(cols[14]),
      books: parseNum(cols[15]),
      transportation: parseNum(cols[16]),
      other: parseNum(cols[17]),
    },
  };
  
  universities[currentUni].push(record);
}

// For each university, build a consolidated expense record
// using the most recent data available for each field
const result = [];

for (const [csvName, records] of Object.entries(universities)) {
  const appName = NAME_MAP[csvName];
  if (appName === null || appName === undefined) {
    console.log(`  Skipping ${csvName} (not in admission data)`);
    continue;
  }
  
  // Sort by year descending (most recent first)
  records.sort((a, b) => b.year.localeCompare(a.year));
  
  // Find most recent values for each field
  const findFirst = (accessor) => {
    for (const r of records) {
      const val = accessor(r);
      if (val !== null && !isNaN(val)) return { value: val, year: r.year };
    }
    return null;
  };
  
  const domTuition = findFirst((r) => r.domestic.tuition);
  const domAncillary = findFirst((r) => r.domestic.ancillary);
  const domRoomBoard = findFirst((r) => r.domestic.roomAndBoard);
  const domRoomOnly = findFirst((r) => r.domestic.roomOnly);
  const domBoardOnly = findFirst((r) => r.domestic.boardOnly);
  const domBooks = findFirst((r) => r.domestic.books);
  const domTransportation = findFirst((r) => r.domestic.transportation);
  const domOther = findFirst((r) => r.domestic.other);
  
  const intlTuition = findFirst((r) => r.international.tuition);
  const intlAncillary = findFirst((r) => r.international.ancillary);
  const intlRoomBoard = findFirst((r) => r.international.roomAndBoard);
  const intlRoomOnly = findFirst((r) => r.international.roomOnly);
  const intlBooks = findFirst((r) => r.international.books);
  const intlTransportation = findFirst((r) => r.international.transportation);
  const intlOther = findFirst((r) => r.international.other);
  
  // Compute room & board: prefer roomAndBoard total, else sum room + board
  let roomBoard = domRoomBoard?.value ?? null;
  if (roomBoard === null && domRoomOnly?.value && domBoardOnly?.value) {
    roomBoard = domRoomOnly.value + domBoardOnly.value;
  } else if (roomBoard === null && domRoomOnly?.value) {
    roomBoard = domRoomOnly.value;
  }
  
  let intlRoomBoardVal = intlRoomBoard?.value ?? null;
  if (intlRoomBoardVal === null && intlRoomOnly?.value) {
    intlRoomBoardVal = intlRoomOnly.value;
  }
  
  // Build the entry
  const entry = {
    university: appName,
    dataYear: domTuition?.year ?? records[0].year,
    domestic: {
      tuition: domTuition?.value ?? null,
      ancillaryFees: domAncillary?.value ?? null,
      roomAndBoard: roomBoard,
      booksAndSupplies: domBooks?.value ?? null,
      transportation: domTransportation?.value ?? null,
      otherExpenses: domOther?.value ?? null,
    },
    international: {
      tuition: intlTuition?.value ?? null,
      ancillaryFees: intlAncillary?.value ?? null,
      roomAndBoard: intlRoomBoardVal,
      booksAndSupplies: intlBooks?.value ?? null,
      transportation: intlTransportation?.value ?? null,
      otherExpenses: intlOther?.value ?? null,
    },
  };
  
  // Calculate totals
  const sumFields = (obj) => {
    const vals = [obj.tuition, obj.ancillaryFees, obj.roomAndBoard, obj.booksAndSupplies, obj.transportation, obj.otherExpenses];
    const valid = vals.filter((v) => v !== null && !isNaN(v));
    return valid.length > 0 ? valid.reduce((a, b) => a + b, 0) : null;
  };
  
  entry.domestic.estimatedTotal = sumFields(entry.domestic);
  entry.international.estimatedTotal = sumFields(entry.international);
  
  result.push(entry);
  console.log(`  ${appName}: dom=$${entry.domestic.estimatedTotal?.toFixed(0) ?? 'N/A'} intl=$${entry.international.estimatedTotal?.toFixed(0) ?? 'N/A'} (${entry.dataYear})`);
}

// Generate TypeScript file
const fmt = (v) => (v === null ? "null" : v.toFixed(2));

let ts = `/**
 * Ontario University Annual Student Expenses
 *
 * AUTO-GENERATED from expenses.csv (Ontario University data).
 * Each entry uses the most recent available data for each field.
 * Do not edit manually.
 *
 * Generated: ${new Date().toISOString()}
 */

export interface UniversityExpenses {
  university: string;
  /** Year of the most recent tuition data used */
  dataYear: string;
  domestic: ExpenseBreakdown;
  international: ExpenseBreakdown;
}

export interface ExpenseBreakdown {
  /** Annual tuition fees */
  tuition: number | null;
  /** Mandatory ancillary / student fees */
  ancillaryFees: number | null;
  /** On-campus room and board (combined) */
  roomAndBoard: number | null;
  /** Books and supplies */
  booksAndSupplies: number | null;
  /** Transportation (off-campus) */
  transportation: number | null;
  /** Other expenses */
  otherExpenses: number | null;
  /** Sum of all non-null fields above */
  estimatedTotal: number | null;
}

export const EXPENSE_DATA: UniversityExpenses[] = [
`;

for (const e of result) {
  const domBlock = (d) => `{
      tuition: ${fmt(d.tuition)},
      ancillaryFees: ${fmt(d.ancillaryFees)},
      roomAndBoard: ${fmt(d.roomAndBoard)},
      booksAndSupplies: ${fmt(d.booksAndSupplies)},
      transportation: ${fmt(d.transportation)},
      otherExpenses: ${fmt(d.otherExpenses)},
      estimatedTotal: ${fmt(d.estimatedTotal)},
    }`;

  ts += `  {
    university: ${JSON.stringify(e.university)},
    dataYear: ${JSON.stringify(e.dataYear)},
    domestic: ${domBlock(e.domestic)},
    international: ${domBlock(e.international)},
  },
`;
}

ts += `];

/**
 * Look up expenses by university name.
 * Returns undefined if the university is not in the dataset.
 */
export function getExpensesForUniversity(universityName: string): UniversityExpenses | undefined {
  return EXPENSE_DATA.find((e) => e.university === universityName);
}
`;

writeFileSync("src/lib/expenses-data.ts", ts, "utf-8");
console.log(`\nWrote ${result.length} university expense records to src/lib/expenses-data.ts`);
