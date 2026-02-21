import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/analyze-extracurriculars
 *
 * Sends the user's extracurricular description to OpenAI GPT-4o-mini
 * and returns a structured analysis with a normalized score (0–1).
 */
export async function POST(req: NextRequest) {
  try {
    const { description } = (await req.json()) as { description: string };

    if (!description || description.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a description of at least 10 characters." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Fallback: heuristic scoring when no API key is set
      return NextResponse.json(fallbackScore(description));
    }

    const systemPrompt = `You are an expert university admissions counselor for Ontario universities. 
Given a student's description of their extracurricular activities, provide:

1. A numerical score from 0 to 1 (two decimal places) representing the overall strength of extracurriculars, where:
   - 0.0-0.2: Minimal activities
   - 0.2-0.4: Some involvement but limited impact
   - 0.4-0.6: Good variety, moderate leadership/impact
   - 0.6-0.8: Strong leadership, awards, significant community involvement
   - 0.8-1.0: Exceptional - national/international competitions, founding organizations, published research

2. A brief summary (2-3 sentences) of the student's extracurricular profile.

3. Three specific strengths identified from their description.

4. Two suggestions for improvement.

Respond ONLY in valid JSON with this exact format:
{
  "score": 0.65,
  "summary": "...",
  "strengths": ["...", "...", "..."],
  "improvements": ["...", "..."]
}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: description },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI API error:", errText);
      // Fall back to heuristic
      return NextResponse.json(fallbackScore(description));
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "";

    try {
      // Extract JSON from potential markdown code fences
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found");
      const parsed = JSON.parse(jsonMatch[0]);
      return NextResponse.json({
        score: Math.max(0, Math.min(1, parsed.score)),
        summary: parsed.summary || "",
        strengths: parsed.strengths || [],
        improvements: parsed.improvements || [],
        source: "ai",
      });
    } catch {
      // If parsing fails, use fallback
      return NextResponse.json(fallbackScore(description));
    }
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

/**
 * Heuristic fallback when OpenAI API is unavailable.
 * Uses keyword matching and length analysis.
 */
function fallbackScore(description: string) {
  const text = description.toLowerCase();
  const wordCount = text.split(/\s+/).length;

  // Keyword categories with weights
  const keywords: Record<string, string[]> = {
    leadership: ["president", "captain", "founder", "led", "organized", "director", "chair", "head"],
    awards: ["award", "winner", "champion", "medal", "first place", "scholarship", "honour", "honor"],
    community: ["volunteer", "community", "charity", "fundrais", "mentor", "tutor", "helped"],
    competition: ["competition", "olympiad", "hackathon", "tournament", "contest", "national", "international"],
    creative: ["published", "research", "patent", "startup", "business", "invented", "created"],
    sports: ["team", "varsity", "provincial", "athlete", "sport", "swim", "track", "soccer", "basketball"],
    clubs: ["club", "society", "council", "committee", "member", "executive"],
  };

  let score = 0.2; // base

  for (const [, words] of Object.entries(keywords)) {
    const matchCount = words.filter((w) => text.includes(w)).length;
    score += matchCount * 0.06;
  }

  // Length bonus (more detail = better articulated)
  if (wordCount > 50) score += 0.05;
  if (wordCount > 100) score += 0.05;
  if (wordCount > 200) score += 0.05;

  score = Math.max(0.1, Math.min(0.95, score));

  return {
    score: Math.round(score * 100) / 100,
    summary: `Based on keyword analysis, your extracurricular profile scores ${Math.round(score * 100)}%. ${
      score >= 0.6
        ? "Your activities show strong involvement and leadership."
        : score >= 0.4
          ? "You have a solid foundation of activities."
          : "Consider expanding your involvement in more activities."
    }`,
    strengths: detectStrengths(text),
    improvements: detectImprovements(text),
    source: "heuristic",
  };
}

function detectStrengths(text: string): string[] {
  const strengths: string[] = [];
  if (/president|captain|founder|director|led|chair/.test(text))
    strengths.push("Demonstrates leadership initiative");
  if (/volunteer|community|charity|mentor|tutor/.test(text))
    strengths.push("Shows community engagement and social responsibility");
  if (/competition|olympiad|hackathon|award|winner/.test(text))
    strengths.push("Competitive achievement in extracurricular domains");
  if (/team|club|society|council/.test(text))
    strengths.push("Active team participation and collaboration");
  if (/research|published|startup|created|built/.test(text))
    strengths.push("Initiative and creativity in independent projects");
  if (strengths.length === 0) strengths.push("Some extracurricular participation noted");
  return strengths.slice(0, 3);
}

function detectImprovements(text: string): string[] {
  const improvements: string[] = [];
  if (!/president|captain|founder|director|led/.test(text))
    improvements.push("Seek leadership positions in your activities");
  if (!/competition|olympiad|hackathon|award/.test(text))
    improvements.push("Participate in competitions to demonstrate excellence");
  if (!/volunteer|community|charity/.test(text))
    improvements.push("Add community service and volunteering");
  if (!/research|published|startup/.test(text))
    improvements.push("Consider independent projects or research opportunities");
  return improvements.slice(0, 2);
}
