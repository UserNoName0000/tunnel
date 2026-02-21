/**
 * Ontario University Annual Student Expenses
 *
 * AUTO-GENERATED from expenses.csv (Ontario University data).
 * Each entry uses the most recent available data for each field.
 * Do not edit manually.
 *
 * Generated: 2026-02-21T16:48:19.700Z
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
  {
    university: "Brock University",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6089.40,
      ancillaryFees: 1340.82,
      roomAndBoard: 14118.00,
      booksAndSupplies: 900.00,
      transportation: 315.25,
      otherExpenses: 1850.82,
      estimatedTotal: 24614.29,
    },
    international: {
      tuition: 31622.25,
      ancillaryFees: 2096.82,
      roomAndBoard: 14118.00,
      booksAndSupplies: 900.00,
      transportation: 315.25,
      otherExpenses: 1850.82,
      estimatedTotal: 50903.14,
    },
  },
  {
    university: "Carleton University",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6067.00,
      ancillaryFees: 1225.07,
      roomAndBoard: 12305.00,
      booksAndSupplies: null,
      transportation: 452.06,
      otherExpenses: null,
      estimatedTotal: 20049.13,
    },
    international: {
      tuition: 28408.00,
      ancillaryFees: 1225.07,
      roomAndBoard: 12305.00,
      booksAndSupplies: null,
      transportation: 452.06,
      otherExpenses: null,
      estimatedTotal: 42390.13,
    },
  },
  {
    university: "Lakehead University",
    dataYear: "2022-2023",
    domestic: {
      tuition: 5984.51,
      ancillaryFees: 1285.89,
      roomAndBoard: 12946.00,
      booksAndSupplies: 2200.00,
      transportation: 500.00,
      otherExpenses: 1700.00,
      estimatedTotal: 24616.40,
    },
    international: {
      tuition: 27295.00,
      ancillaryFees: 1294.78,
      roomAndBoard: 12946.00,
      booksAndSupplies: 2200.00,
      transportation: 500.00,
      otherExpenses: 1700.00,
      estimatedTotal: 45935.78,
    },
  },
  {
    university: "Laurentian University",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6000.30,
      ancillaryFees: 1249.47,
      roomAndBoard: 13295.00,
      booksAndSupplies: 1500.00,
      transportation: null,
      otherExpenses: null,
      estimatedTotal: 22044.77,
    },
    international: {
      tuition: 25960.00,
      ancillaryFees: 1249.47,
      roomAndBoard: 7875.00,
      booksAndSupplies: 1500.00,
      transportation: null,
      otherExpenses: 756.00,
      estimatedTotal: 37340.47,
    },
  },
  {
    university: "McMaster University",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6042.60,
      ancillaryFees: 1492.38,
      roomAndBoard: 11370.00,
      booksAndSupplies: 1600.00,
      transportation: 241.79,
      otherExpenses: null,
      estimatedTotal: 20746.77,
    },
    international: {
      tuition: 43116.00,
      ancillaryFees: 1492.38,
      roomAndBoard: 11370.00,
      booksAndSupplies: 1600.00,
      transportation: 241.79,
      otherExpenses: null,
      estimatedTotal: 57820.17,
    },
  },
  {
    university: "Nipissing University",
    dataYear: "2022-2023",
    domestic: {
      tuition: 5780.97,
      ancillaryFees: 1598.64,
      roomAndBoard: 7181.00,
      booksAndSupplies: 1000.00,
      transportation: 223.00,
      otherExpenses: 1415.69,
      estimatedTotal: 17199.30,
    },
    international: {
      tuition: 21000.00,
      ancillaryFees: 1598.64,
      roomAndBoard: 6685.00,
      booksAndSupplies: 1000.00,
      transportation: 223.00,
      otherExpenses: 1415.69,
      estimatedTotal: 31922.33,
    },
  },
  {
    university: "OCAD University",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6052.40,
      ancillaryFees: 1175.31,
      roomAndBoard: null,
      booksAndSupplies: 2000.00,
      transportation: 979.00,
      otherExpenses: 18480.00,
      estimatedTotal: 28686.71,
    },
    international: {
      tuition: 26118.80,
      ancillaryFees: 1175.31,
      roomAndBoard: null,
      booksAndSupplies: 2000.00,
      transportation: 979.00,
      otherExpenses: 18480.00,
      estimatedTotal: 48753.11,
    },
  },
  {
    university: "Ontario Tech University",
    dataYear: "2022-2023",
    domestic: {
      tuition: 5982.80,
      ancillaryFees: 2111.02,
      roomAndBoard: 14679.00,
      booksAndSupplies: 1750.00,
      transportation: 300.01,
      otherExpenses: 2403.41,
      estimatedTotal: 27226.24,
    },
    international: {
      tuition: 29195.50,
      ancillaryFees: 2111.02,
      roomAndBoard: 14679.00,
      booksAndSupplies: 1750.00,
      transportation: 300.01,
      otherExpenses: 2403.41,
      estimatedTotal: 50438.94,
    },
  },
  {
    university: "Queen's University",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6083.10,
      ancillaryFees: 1339.71,
      roomAndBoard: 16087.00,
      booksAndSupplies: 1800.00,
      transportation: 875.00,
      otherExpenses: 2648.00,
      estimatedTotal: 28832.81,
    },
    international: {
      tuition: 53471.70,
      ancillaryFees: 1339.71,
      roomAndBoard: 16087.00,
      booksAndSupplies: 1800.00,
      transportation: 875.00,
      otherExpenses: 2648.00,
      estimatedTotal: 76221.41,
    },
  },
  {
    university: "Toronto Metropolitan University",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6110.35,
      ancillaryFees: 957.74,
      roomAndBoard: 16730.50,
      booksAndSupplies: 1100.00,
      transportation: 1024.00,
      otherExpenses: 6000.00,
      estimatedTotal: 31922.59,
    },
    international: {
      tuition: 30100.00,
      ancillaryFees: 957.74,
      roomAndBoard: 16730.50,
      booksAndSupplies: 1100.00,
      transportation: 1024.00,
      otherExpenses: 6000.00,
      estimatedTotal: 55912.24,
    },
  },
  {
    university: "Trent University",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6118.48,
      ancillaryFees: 1889.34,
      roomAndBoard: 14831.00,
      booksAndSupplies: 1500.00,
      transportation: 312.00,
      otherExpenses: null,
      estimatedTotal: 24650.82,
    },
    international: {
      tuition: 26190.52,
      ancillaryFees: 1789.88,
      roomAndBoard: 14831.00,
      booksAndSupplies: 1500.00,
      transportation: 312.00,
      otherExpenses: null,
      estimatedTotal: 44623.40,
    },
  },
  {
    university: "University of Guelph",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6090.92,
      ancillaryFees: 1525.33,
      roomAndBoard: 14016.00,
      booksAndSupplies: 1500.00,
      transportation: 314.00,
      otherExpenses: 2350.00,
      estimatedTotal: 25796.25,
    },
    international: {
      tuition: 30317.16,
      ancillaryFees: 1525.33,
      roomAndBoard: 14016.00,
      booksAndSupplies: 1500.00,
      transportation: 314.00,
      otherExpenses: 3106.00,
      estimatedTotal: 50778.49,
    },
  },
  {
    university: "University of Ottawa",
    dataYear: "2023-2024",
    domestic: {
      tuition: null,
      ancillaryFees: null,
      roomAndBoard: 13890.00,
      booksAndSupplies: null,
      transportation: 447.00,
      otherExpenses: null,
      estimatedTotal: 14337.00,
    },
    international: {
      tuition: null,
      ancillaryFees: null,
      roomAndBoard: 13890.00,
      booksAndSupplies: null,
      transportation: 447.00,
      otherExpenses: null,
      estimatedTotal: 14337.00,
    },
  },
  {
    university: "University of Toronto",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6100.00,
      ancillaryFees: 1746.89,
      roomAndBoard: 14893.50,
      booksAndSupplies: 1000.00,
      transportation: 512.60,
      otherExpenses: 3000.00,
      estimatedTotal: 27252.99,
    },
    international: {
      tuition: 59320.00,
      ancillaryFees: 1746.89,
      roomAndBoard: 14893.50,
      booksAndSupplies: 1000.00,
      transportation: 512.60,
      otherExpenses: 3684.00,
      estimatedTotal: 81156.99,
    },
  },
  {
    university: "University of Waterloo",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6128.00,
      ancillaryFees: 1496.44,
      roomAndBoard: 13454.00,
      booksAndSupplies: 2500.00,
      transportation: null,
      otherExpenses: 3080.00,
      estimatedTotal: 26658.44,
    },
    international: {
      tuition: 46772.00,
      ancillaryFees: 1496.44,
      roomAndBoard: 13454.00,
      booksAndSupplies: 2500.00,
      transportation: null,
      otherExpenses: 3080.00,
      estimatedTotal: 67302.44,
    },
  },
  {
    university: "University of Windsor",
    dataYear: "2022-2023",
    domestic: {
      tuition: 5799.80,
      ancillaryFees: 1215.68,
      roomAndBoard: 12514.00,
      booksAndSupplies: 1500.00,
      transportation: 320.00,
      otherExpenses: 2000.00,
      estimatedTotal: 23349.48,
    },
    international: {
      tuition: 30200.00,
      ancillaryFees: 1215.68,
      roomAndBoard: 12514.00,
      booksAndSupplies: 1500.00,
      transportation: 320.00,
      otherExpenses: 2000.00,
      estimatedTotal: 47749.68,
    },
  },
  {
    university: "Western University — Brescia University College",
    dataYear: "2021-2022",
    domestic: {
      tuition: 6050.00,
      ancillaryFees: 1515.72,
      roomAndBoard: 13020.00,
      booksAndSupplies: 1266.00,
      transportation: 765.00,
      otherExpenses: 750.00,
      estimatedTotal: 23366.72,
    },
    international: {
      tuition: 33526.00,
      ancillaryFees: 1515.72,
      roomAndBoard: 13020.00,
      booksAndSupplies: 1266.00,
      transportation: 765.00,
      otherExpenses: 750.00,
      estimatedTotal: 50842.72,
    },
  },
  {
    university: "Western University — Huron University College",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6050.00,
      ancillaryFees: 2245.64,
      roomAndBoard: 16833.00,
      booksAndSupplies: 850.00,
      transportation: 289.00,
      otherExpenses: 131.00,
      estimatedTotal: 26398.64,
    },
    international: {
      tuition: 39105.00,
      ancillaryFees: 3726.64,
      roomAndBoard: 16833.00,
      booksAndSupplies: 850.00,
      transportation: 289.00,
      otherExpenses: 131.00,
      estimatedTotal: 60934.64,
    },
  },
  {
    university: "Western University — King's University College",
    dataYear: "2021-2022",
    domestic: {
      tuition: 6050.00,
      ancillaryFees: 1727.60,
      roomAndBoard: 13022.00,
      booksAndSupplies: 800.00,
      transportation: 288.25,
      otherExpenses: 122.00,
      estimatedTotal: 22009.85,
    },
    international: {
      tuition: 36208.00,
      ancillaryFees: 2483.65,
      roomAndBoard: 13022.00,
      booksAndSupplies: 800.00,
      transportation: 288.25,
      otherExpenses: 122.00,
      estimatedTotal: 52923.90,
    },
  },
  {
    university: "Western University",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6050.00,
      ancillaryFees: 1556.53,
      roomAndBoard: 17086.00,
      booksAndSupplies: 1178.00,
      transportation: 288.25,
      otherExpenses: 1648.74,
      estimatedTotal: 27807.52,
    },
    international: {
      tuition: 39105.00,
      ancillaryFees: 1556.53,
      roomAndBoard: 17086.00,
      booksAndSupplies: 1178.00,
      transportation: 288.25,
      otherExpenses: 2404.74,
      estimatedTotal: 61618.52,
    },
  },
  {
    university: "Wilfrid Laurier University",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6058.92,
      ancillaryFees: 1328.71,
      roomAndBoard: 15292.00,
      booksAndSupplies: 1500.00,
      transportation: 700.00,
      otherExpenses: 3200.00,
      estimatedTotal: 28079.63,
    },
    international: {
      tuition: 30715.66,
      ancillaryFees: 1328.71,
      roomAndBoard: 15292.00,
      booksAndSupplies: 1500.00,
      transportation: 700.00,
      otherExpenses: 3200.00,
      estimatedTotal: 52736.37,
    },
  },
  {
    university: "York University",
    dataYear: "2022-2023",
    domestic: {
      tuition: 6117.90,
      ancillaryFees: 1297.76,
      roomAndBoard: 13140.00,
      booksAndSupplies: 1950.00,
      transportation: 1200.00,
      otherExpenses: 4000.00,
      estimatedTotal: 27705.66,
    },
    international: {
      tuition: 32756.10,
      ancillaryFees: 1297.76,
      roomAndBoard: 13140.00,
      booksAndSupplies: 1950.00,
      transportation: 1200.00,
      otherExpenses: 4000.00,
      estimatedTotal: 54343.86,
    },
  },
];

/**
 * Look up expenses by university name.
 * Returns undefined if the university is not in the dataset.
 */
export function getExpensesForUniversity(universityName: string): UniversityExpenses | undefined {
  return EXPENSE_DATA.find((e) => e.university === universityName);
}
