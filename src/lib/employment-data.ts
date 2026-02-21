/**
 * Ontario University Employment Rates
 *
 * AUTO-GENERATED from "employment rates.csv".
 * Uses the most recent available year per university.
 * Rates shown are: 2-year post-graduation and 6-month post-graduation.
 * Do not edit manually.
 *
 * Generated: 2026-02-21T21:48:06.464Z
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

export const EMPLOYMENT_DATA: UniversityEmployment[] = [
  {
    "university": "Brock University",
    "dataYear": 2021,
    "overallRate2yr": 97,
    "overallRate6mo": 92,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 87.5,
        "employmentRate6mo": 84.62
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 98.91,
        "employmentRate6mo": 95.6
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 83.33
      },
      {
        "category": "Education",
        "employmentRate2yr": 98.47,
        "employmentRate6mo": 97.66
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 93.75,
        "employmentRate6mo": 84.85
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 94.32,
        "employmentRate6mo": 85.71
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 97.52,
        "employmentRate6mo": 93.71
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 100,
        "employmentRate6mo": 84.62
      },
      {
        "category": "Nursing",
        "employmentRate2yr": 100,
        "employmentRate6mo": 94.44
      },
      {
        "category": "General Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 93.88
      },
      {
        "category": "Health Profess & Related Programs",
        "employmentRate2yr": 90.63,
        "employmentRate6mo": 79.03
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 97.51,
        "employmentRate6mo": 93.37
      }
    ]
  },
  {
    "university": "Carleton University",
    "dataYear": 2021,
    "overallRate2yr": 93.35,
    "overallRate6mo": 88.36,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 89.09,
        "employmentRate6mo": 90
      },
      {
        "category": "Architecture & Planning",
        "employmentRate2yr": 89.47,
        "employmentRate6mo": 95.45
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 96.15,
        "employmentRate6mo": 91.47
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 89.69,
        "employmentRate6mo": 87.5
      },
      {
        "category": "Engineering",
        "employmentRate2yr": 93.87,
        "employmentRate6mo": 83.73
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 96.3,
        "employmentRate6mo": 96.43
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 91.55,
        "employmentRate6mo": 85.11
      },
      {
        "category": "Communication & Journalism",
        "employmentRate2yr": 100,
        "employmentRate6mo": 80.95
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 100,
        "employmentRate6mo": 88.46
      },
      {
        "category": "General Science",
        "employmentRate2yr": 95.29,
        "employmentRate6mo": 83.54
      },
      {
        "category": "Health Profess & Related Programs",
        "employmentRate2yr": 100,
        "employmentRate6mo": 91.3
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 93.33,
        "employmentRate6mo": 91.67
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 92.96,
        "employmentRate6mo": 90.14
      }
    ]
  },
  {
    "university": "Lakehead University",
    "dataYear": 2021,
    "overallRate2yr": 96.22,
    "overallRate6mo": 93.39,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 100,
        "employmentRate6mo": 88.24
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 93.02,
        "employmentRate6mo": 92.68
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 80,
        "employmentRate6mo": 60
      },
      {
        "category": "Education",
        "employmentRate2yr": 98.43,
        "employmentRate6mo": 99.2
      },
      {
        "category": "Engineering",
        "employmentRate2yr": 96.36,
        "employmentRate6mo": 86.49
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Natural Resources & Conservation",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 80,
        "employmentRate6mo": 86.67
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 96,
        "employmentRate6mo": 90.91
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 95.44,
        "employmentRate6mo": 95.77
      },
      {
        "category": "Nursing",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "General Science",
        "employmentRate2yr": 95.24,
        "employmentRate6mo": 95.24
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      }
    ]
  },
  {
    "university": "Laurentian University",
    "dataYear": 2021,
    "overallRate2yr": 95.19,
    "overallRate6mo": 94.67,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 85.29,
        "employmentRate6mo": 91.18
      },
      {
        "category": "Architecture & Planning",
        "employmentRate2yr": 76.92,
        "employmentRate6mo": 90.91
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 95.96,
        "employmentRate6mo": 96.94
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 80
      },
      {
        "category": "Education",
        "employmentRate2yr": 97.73,
        "employmentRate6mo": 97.83
      },
      {
        "category": "Engineering",
        "employmentRate2yr": 96.15,
        "employmentRate6mo": 88.46
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 91.3,
        "employmentRate6mo": 95.45
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 97.3,
        "employmentRate6mo": 96.43
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Nursing",
        "employmentRate2yr": 98.1,
        "employmentRate6mo": 99.08
      },
      {
        "category": "General Science",
        "employmentRate2yr": 88.89,
        "employmentRate6mo": 85.71
      },
      {
        "category": "Health Profess & Related Programs",
        "employmentRate2yr": 100,
        "employmentRate6mo": 92.85
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 95.08,
        "employmentRate6mo": 92
      }
    ]
  },
  {
    "university": "McMaster University",
    "dataYear": 2021,
    "overallRate2yr": 94.45,
    "overallRate6mo": 92.24,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 94.18,
        "employmentRate6mo": 88.41
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 95.28,
        "employmentRate6mo": 95.14
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 85.71
      },
      {
        "category": "Engineering",
        "employmentRate2yr": 93.33,
        "employmentRate6mo": 86.99
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 100,
        "employmentRate6mo": 81.82
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 91,
        "employmentRate6mo": 90.36
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 96.61,
        "employmentRate6mo": 93.88
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 88.14,
        "employmentRate6mo": 88.89
      },
      {
        "category": "Health Profess & Related Programs",
        "employmentRate2yr": 98.8,
        "employmentRate6mo": 98.55
      },
      {
        "category": "Nursing",
        "employmentRate2yr": 98.91,
        "employmentRate6mo": 99.45
      },
      {
        "category": "General Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 97.37,
        "employmentRate6mo": 90.63
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 91.19,
        "employmentRate6mo": 90.3
      }
    ]
  },
  {
    "university": "Nipissing University",
    "dataYear": 2021,
    "overallRate2yr": 98.5,
    "overallRate6mo": 96.78,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 94.12,
        "employmentRate6mo": 93.33
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 98.39,
        "employmentRate6mo": 95.08
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Education",
        "employmentRate2yr": 99.12,
        "employmentRate6mo": 96.49
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 100,
        "employmentRate6mo": 95.24
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 96.15,
        "employmentRate6mo": 100
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Nursing",
        "employmentRate2yr": 98.31,
        "employmentRate6mo": 99.15
      },
      {
        "category": "General Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 98.92,
        "employmentRate6mo": 94.62
      }
    ]
  },
  {
    "university": "OCAD University",
    "dataYear": 2021,
    "overallRate2yr": 83.92,
    "overallRate6mo": 70.85,
    "programs": [
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 83.92,
        "employmentRate6mo": 70.85
      }
    ]
  },
  {
    "university": "Ontario Tech University",
    "dataYear": 2021,
    "overallRate2yr": 93.79,
    "overallRate6mo": 89.19,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 84.62,
        "employmentRate6mo": 73.91
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 92.59,
        "employmentRate6mo": 91.82
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 91.78,
        "employmentRate6mo": 87.67
      },
      {
        "category": "Education",
        "employmentRate2yr": 97.17,
        "employmentRate6mo": 92.16
      },
      {
        "category": "Engineering",
        "employmentRate2yr": 93.15,
        "employmentRate6mo": 86.71
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 77.78,
        "employmentRate6mo": 88.89
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 94.59,
        "employmentRate6mo": 83.33
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Nursing",
        "employmentRate2yr": 98.99,
        "employmentRate6mo": 97
      },
      {
        "category": "Health Profess & Related Programs",
        "employmentRate2yr": 91.07,
        "employmentRate6mo": 90.2
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 88.89
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 94.59,
        "employmentRate6mo": 85.29
      }
    ]
  },
  {
    "university": "Queen's University",
    "dataYear": 2021,
    "overallRate2yr": 96.43,
    "overallRate6mo": 95.27,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 96.3,
        "employmentRate6mo": 96.84
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 100,
        "employmentRate6mo": 97.56
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 94.59,
        "employmentRate6mo": 88.24
      },
      {
        "category": "Education",
        "employmentRate2yr": 95.74,
        "employmentRate6mo": 97.85
      },
      {
        "category": "Engineering",
        "employmentRate2yr": 96.86,
        "employmentRate6mo": 93.43
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 90.91,
        "employmentRate6mo": 92.86
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 96.7,
        "employmentRate6mo": 94.05
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 100,
        "employmentRate6mo": 92
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 95.47,
        "employmentRate6mo": 96.71
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 93.75,
        "employmentRate6mo": 100
      },
      {
        "category": "Health Profess & Related Programs",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Nursing",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "General Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 89.47,
        "employmentRate6mo": 88.24
      }
    ]
  },
  {
    "university": "Toronto Metropolitan University",
    "dataYear": 2021,
    "overallRate2yr": 92.48,
    "overallRate6mo": 88.17,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 90.38,
        "employmentRate6mo": 71.93
      },
      {
        "category": "Architecture & Planning",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 94.3,
        "employmentRate6mo": 91.6
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 83.64,
        "employmentRate6mo": 76.79
      },
      {
        "category": "Education",
        "employmentRate2yr": 89.74,
        "employmentRate6mo": 100
      },
      {
        "category": "Engineering",
        "employmentRate2yr": 90.78,
        "employmentRate6mo": 82.23
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 87.58,
        "employmentRate6mo": 86.88
      },
      {
        "category": "Family & Consumer/Human Sciences",
        "employmentRate2yr": 92.31,
        "employmentRate6mo": 84.62
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 89.66,
        "employmentRate6mo": 88.24
      },
      {
        "category": "Communication & Journalism",
        "employmentRate2yr": 91.89,
        "employmentRate6mo": 89.19
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 100,
        "employmentRate6mo": 90
      },
      {
        "category": "Nursing",
        "employmentRate2yr": 97.84,
        "employmentRate6mo": 97.22
      },
      {
        "category": "Health Profess & Related Programs",
        "employmentRate2yr": 86.21,
        "employmentRate6mo": 83.33
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 60
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 93.44,
        "employmentRate6mo": 86.7
      }
    ]
  },
  {
    "university": "Trent University",
    "dataYear": 2021,
    "overallRate2yr": 95.7,
    "overallRate6mo": 91.91,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 96.43,
        "employmentRate6mo": 93.6
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 90.91,
        "employmentRate6mo": 83.87
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 80,
        "employmentRate6mo": 84.62
      },
      {
        "category": "Education",
        "employmentRate2yr": 100,
        "employmentRate6mo": 96.23
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 96.91,
        "employmentRate6mo": 95.43
      },
      {
        "category": "Nursing",
        "employmentRate2yr": 98.11,
        "employmentRate6mo": 94.39
      },
      {
        "category": "General Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 95.45,
        "employmentRate6mo": 85.71
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 94.84,
        "employmentRate6mo": 89.33
      }
    ]
  },
  {
    "university": "University of Guelph",
    "dataYear": 2021,
    "overallRate2yr": 94.7,
    "overallRate6mo": 91.94,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 96.04,
        "employmentRate6mo": 94.27
      },
      {
        "category": "Architecture & Planning",
        "employmentRate2yr": 100,
        "employmentRate6mo": 97.06
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 93.35,
        "employmentRate6mo": 93.48
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 87.5,
        "employmentRate6mo": 80
      },
      {
        "category": "Engineering",
        "employmentRate2yr": 91.62,
        "employmentRate6mo": 90.12
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 80,
        "employmentRate6mo": 81.25
      },
      {
        "category": "Family & Consumer/Human Sciences",
        "employmentRate2yr": 96.98,
        "employmentRate6mo": 96.15
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 91.43,
        "employmentRate6mo": 86.41
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 94.59,
        "employmentRate6mo": 93.16
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 100,
        "employmentRate6mo": 75
      },
      {
        "category": "General Science",
        "employmentRate2yr": 96.97,
        "employmentRate6mo": 100
      },
      {
        "category": "Health Profess & Related Programs",
        "employmentRate2yr": 94.12,
        "employmentRate6mo": 100
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 93.75
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 96.25,
        "employmentRate6mo": 89.73
      }
    ]
  },
  {
    "university": "University of Ottawa",
    "dataYear": 2021,
    "overallRate2yr": 94.87,
    "overallRate6mo": 93.03,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 96.26,
        "employmentRate6mo": 92.52
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 96.3,
        "employmentRate6mo": 95.31
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 86.84,
        "employmentRate6mo": 88.89
      },
      {
        "category": "Education",
        "employmentRate2yr": 98.03,
        "employmentRate6mo": 96.67
      },
      {
        "category": "Engineering",
        "employmentRate2yr": 93.43,
        "employmentRate6mo": 86.57
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 100,
        "employmentRate6mo": 93.75
      },
      {
        "category": "Family & Consumer/Human Sciences",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 95.51,
        "employmentRate6mo": 93.2
      },
      {
        "category": "Communication & Journalism",
        "employmentRate2yr": 100,
        "employmentRate6mo": 83.33
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 95,
        "employmentRate6mo": 95.45
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 94.32,
        "employmentRate6mo": 94.1
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 69.23,
        "employmentRate6mo": 100
      },
      {
        "category": "Nursing",
        "employmentRate2yr": 98.1,
        "employmentRate6mo": 97.2
      },
      {
        "category": "General Science",
        "employmentRate2yr": 92.52,
        "employmentRate6mo": 89.32
      },
      {
        "category": "Health Profess & Related Programs",
        "employmentRate2yr": 93.24,
        "employmentRate6mo": 92.54
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 89.47,
        "employmentRate6mo": 85
      }
    ]
  },
  {
    "university": "University of Toronto",
    "dataYear": 2021,
    "overallRate2yr": 92.25,
    "overallRate6mo": 88.66,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 88.38,
        "employmentRate6mo": 82.53
      },
      {
        "category": "Architecture & Planning",
        "employmentRate2yr": 96.55,
        "employmentRate6mo": 76.92
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 93.24,
        "employmentRate6mo": 92.62
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 92.22,
        "employmentRate6mo": 90.17
      },
      {
        "category": "Health Profess & Related Programs",
        "employmentRate2yr": 97.5,
        "employmentRate6mo": 96.69
      },
      {
        "category": "Education",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Engineering",
        "employmentRate2yr": 93.98,
        "employmentRate6mo": 93.15
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 88.89,
        "employmentRate6mo": 86.79
      },
      {
        "category": "Family & Consumer/Human Sciences",
        "employmentRate2yr": 100,
        "employmentRate6mo": 88.89
      },
      {
        "category": "Natural Resources & Conservation",
        "employmentRate2yr": 100,
        "employmentRate6mo": null
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 89.69,
        "employmentRate6mo": 87.5
      },
      {
        "category": "Communication & Journalism",
        "employmentRate2yr": 100,
        "employmentRate6mo": 75
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 98.18,
        "employmentRate6mo": 93.75
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 94.78,
        "employmentRate6mo": 89.3
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 85.63,
        "employmentRate6mo": 83.12
      },
      {
        "category": "Nursing",
        "employmentRate2yr": 97.73,
        "employmentRate6mo": 100
      },
      {
        "category": "General Science",
        "employmentRate2yr": 90.91,
        "employmentRate6mo": 95.24
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 91.94,
        "employmentRate6mo": 84.48
      }
    ]
  },
  {
    "university": "University of Waterloo",
    "dataYear": 2021,
    "overallRate2yr": 94.95,
    "overallRate6mo": 93.6,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 94,
        "employmentRate6mo": 94.92
      },
      {
        "category": "Architecture & Planning",
        "employmentRate2yr": 66.67,
        "employmentRate6mo": 92.86
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 92.12,
        "employmentRate6mo": 94.85
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 96.86,
        "employmentRate6mo": 96.13
      },
      {
        "category": "Engineering",
        "employmentRate2yr": 96.14,
        "employmentRate6mo": 95.72
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 90.16,
        "employmentRate6mo": 92.86
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 93.33,
        "employmentRate6mo": 93.67
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 94.66,
        "employmentRate6mo": 93.2
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 97.62,
        "employmentRate6mo": 90.43
      },
      {
        "category": "Health Profess & Related Programs",
        "employmentRate2yr": 98.67,
        "employmentRate6mo": 97.67
      },
      {
        "category": "General Science",
        "employmentRate2yr": 95.5,
        "employmentRate6mo": 84.76
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 94.87,
        "employmentRate6mo": 91.18
      }
    ]
  },
  {
    "university": "University of Windsor",
    "dataYear": 2021,
    "overallRate2yr": 94.48,
    "overallRate6mo": 89.46,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 80.49,
        "employmentRate6mo": 71.05
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 95.7,
        "employmentRate6mo": 97.87
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 92.42,
        "employmentRate6mo": 82.54
      },
      {
        "category": "Education",
        "employmentRate2yr": 100,
        "employmentRate6mo": 97.53
      },
      {
        "category": "Engineering",
        "employmentRate2yr": 95.45,
        "employmentRate6mo": 84.4
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 92,
        "employmentRate6mo": 76
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 88.64,
        "employmentRate6mo": 84.09
      },
      {
        "category": "Communication & Journalism",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 96.55,
        "employmentRate6mo": 86.21
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 94.3,
        "employmentRate6mo": 91.67
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 100,
        "employmentRate6mo": 69.23
      },
      {
        "category": "Nursing",
        "employmentRate2yr": 99.12,
        "employmentRate6mo": 97.35
      },
      {
        "category": "General Science",
        "employmentRate2yr": 92,
        "employmentRate6mo": 86.96
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      }
    ]
  },
  {
    "university": "Western University — Brescia University College",
    "dataYear": 2013,
    "overallRate2yr": 90.57,
    "overallRate6mo": 86.96,
    "programs": [
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Family & Consumer/Human Sciences",
        "employmentRate2yr": 89.09,
        "employmentRate6mo": 82.22
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "General Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 87.5,
        "employmentRate6mo": 86.67
      }
    ]
  },
  {
    "university": "Western University — Huron University College",
    "dataYear": 2021,
    "overallRate2yr": null,
    "overallRate6mo": null,
    "programs": []
  },
  {
    "university": "Western University — King's University College",
    "dataYear": 2014,
    "overallRate2yr": null,
    "overallRate6mo": 86.44,
    "programs": [
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": null,
        "employmentRate6mo": 77.42
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": null,
        "employmentRate6mo": 95.35
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": null,
        "employmentRate6mo": 83.33
      }
    ]
  },
  {
    "university": "Western University",
    "dataYear": 2021,
    "overallRate2yr": 94.65,
    "overallRate6mo": 92.88,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 87.64,
        "employmentRate6mo": 89.41
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 93.95,
        "employmentRate6mo": 95.31
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 94.44,
        "employmentRate6mo": 88.89
      },
      {
        "category": "Health Profess & Related Programs",
        "employmentRate2yr": 98.43,
        "employmentRate6mo": 95.72
      },
      {
        "category": "Education",
        "employmentRate2yr": 98.95,
        "employmentRate6mo": 100
      },
      {
        "category": "Engineering",
        "employmentRate2yr": 87.16,
        "employmentRate6mo": 87
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 90,
        "employmentRate6mo": 83.33
      },
      {
        "category": "Family & Consumer/Human Sciences",
        "employmentRate2yr": 94.44,
        "employmentRate6mo": 93.62
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 95.16,
        "employmentRate6mo": 92.79
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 98.36,
        "employmentRate6mo": 92.45
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 95.89,
        "employmentRate6mo": 92.32
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 95,
        "employmentRate6mo": 100
      },
      {
        "category": "Nursing",
        "employmentRate2yr": 96.47,
        "employmentRate6mo": 98.8
      },
      {
        "category": "General Science",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 85.71,
        "employmentRate6mo": 91.67
      }
    ]
  },
  {
    "university": "Wilfrid Laurier University",
    "dataYear": 2021,
    "overallRate2yr": 94.74,
    "overallRate6mo": 90.79,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 94.59,
        "employmentRate6mo": 84.78
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 96.41,
        "employmentRate6mo": 94.06
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 82.93,
        "employmentRate6mo": 82.05
      },
      {
        "category": "Education",
        "employmentRate2yr": 100,
        "employmentRate6mo": 100
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 93.83,
        "employmentRate6mo": 86.3
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 95.65,
        "employmentRate6mo": 94.59
      },
      {
        "category": "Communication & Journalism",
        "employmentRate2yr": 100,
        "employmentRate6mo": 75
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 100,
        "employmentRate6mo": 97.01
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 100,
        "employmentRate6mo": 94.44
      },
      {
        "category": "General Science",
        "employmentRate2yr": 89.61,
        "employmentRate6mo": 85.71
      },
      {
        "category": "Health Profess & Related Programs",
        "employmentRate2yr": 96.92,
        "employmentRate6mo": 89.55
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 80,
        "employmentRate6mo": 50
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 93.6,
        "employmentRate6mo": 89.24
      }
    ]
  },
  {
    "university": "York University",
    "dataYear": 2021,
    "overallRate2yr": 91.58,
    "overallRate6mo": 85.77,
    "programs": [
      {
        "category": "Biological & Biomedical Sciences",
        "employmentRate2yr": 89.62,
        "employmentRate6mo": 79.41
      },
      {
        "category": "Commerce/Mgmt/Business Admin",
        "employmentRate2yr": 93.53,
        "employmentRate6mo": 92.2
      },
      {
        "category": "Computer & Information Science",
        "employmentRate2yr": 83.49,
        "employmentRate6mo": 76.15
      },
      {
        "category": "Education",
        "employmentRate2yr": 100,
        "employmentRate6mo": 95.12
      },
      {
        "category": "Engineering",
        "employmentRate2yr": 88.46,
        "employmentRate6mo": 86.96
      },
      {
        "category": "Fine & Applied Arts",
        "employmentRate2yr": 93.46,
        "employmentRate6mo": 88.36
      },
      {
        "category": "Liberal Arts & Sciences/General Studies/Humanities",
        "employmentRate2yr": 93.75,
        "employmentRate6mo": 85.84
      },
      {
        "category": "Kinesiology/Recreation/Physical Education",
        "employmentRate2yr": 88.15,
        "employmentRate6mo": 82.61
      },
      {
        "category": "Social Sciences",
        "employmentRate2yr": 92.68,
        "employmentRate6mo": 90.16
      },
      {
        "category": "Mathematics & Statistics",
        "employmentRate2yr": 94.12,
        "employmentRate6mo": 80
      },
      {
        "category": "Nursing",
        "employmentRate2yr": 96.39,
        "employmentRate6mo": 91.46
      },
      {
        "category": "General Science",
        "employmentRate2yr": 75,
        "employmentRate6mo": 66.67
      },
      {
        "category": "Health Profess & Related Programs",
        "employmentRate2yr": 88,
        "employmentRate6mo": 70.83
      },
      {
        "category": "Physical Science",
        "employmentRate2yr": 92.86,
        "employmentRate6mo": 61.54
      }
    ]
  }
];

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
