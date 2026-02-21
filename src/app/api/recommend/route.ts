import { NextRequest, NextResponse } from "next/server";
import { UNIVERSITY_DATA } from "@/lib/university-data";
import { generateRecommendations } from "@/lib/stats-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      grade,
      extracurricularScore,
      interestCategories,
    }: {
      grade: number;
      extracurricularScore: number;
      interestCategories: string[];
    } = body;

    // Validate inputs
    if (typeof grade !== "number" || grade < 50 || grade > 100) {
      return NextResponse.json(
        { error: "Grade must be a number between 50 and 100." },
        { status: 400 }
      );
    }

    if (
      typeof extracurricularScore !== "number" ||
      extracurricularScore < 0 ||
      extracurricularScore > 1
    ) {
      return NextResponse.json(
        { error: "Extracurricular score must be between 0 and 1." },
        { status: 400 }
      );
    }

    if (!Array.isArray(interestCategories) || interestCategories.length === 0) {
      return NextResponse.json(
        { error: "Must select at least one interest category." },
        { status: 400 }
      );
    }

    const results = generateRecommendations(
      grade,
      extracurricularScore,
      interestCategories,
      UNIVERSITY_DATA
    );

    // Sort by composite score descending
    results.sort((a, b) => b.compositeScore - a.compositeScore);

    // Group by tier
    const reach = results.filter((r) => r.tier === "reach");
    const match = results.filter((r) => r.tier === "match");
    const safety = results.filter((r) => r.tier === "safety");

    // Return top picks from each tier
    return NextResponse.json({
      reach: reach.slice(0, 5),
      match: match.slice(0, 5),
      safety: safety.slice(0, 5),
      totalProgramsAnalyzed: results.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
