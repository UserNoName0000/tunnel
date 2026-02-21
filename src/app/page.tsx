"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/lib/university-data";
import type { AdmissionTier } from "@/lib/stats-engine";

// ── Types ──────────────────────────────────────────────────────────────

interface Recommendation {
  university: string;
  program: string;
  category: string;
  academicProbability: number;
  bayesianProbability: number;
  compositeScore: number;
  tier: AdmissionTier;
  estimatedCutoff: number;
  year: number;
  expenses: {
    domestic: {
      tuition: number | null;
      ancillaryFees: number | null;
      roomAndBoard: number | null;
      booksAndSupplies: number | null;
      transportation: number | null;
      otherExpenses: number | null;
      estimatedTotal: number | null;
    } | null;
    international: {
      tuition: number | null;
      ancillaryFees: number | null;
      roomAndBoard: number | null;
      booksAndSupplies: number | null;
      transportation: number | null;
      otherExpenses: number | null;
      estimatedTotal: number | null;
    } | null;
    dataYear: string | null;
  };
  employment: {
    rate2yr: number | null;
    rate6mo: number | null;
    dataYear: number | null;
  };
  explanation: {
    mu: number;
    sigma: number;
    zScore: number;
    gaussianCDF: number;
    betaAlpha: number;
    betaBeta: number;
    betaPosteriorMean: number;
  };
}

interface ECAnalysis {
  score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  source: string;
}

interface Results {
  reach: Recommendation[];
  match: Recommendation[];
  safety: Recommendation[];
  totalProgramsAnalyzed: number;
}

// ── Component ──────────────────────────────────────────────────────────

export default function Home() {
  // Step state
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // User inputs
  const [grade, setGrade] = useState("");
  const [ecDescription, setECDescription] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Processing states
  const [ecAnalysis, setECAnalysis] = useState<ECAnalysis | null>(null);
  const [ecLoading, setECLoading] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // ── Handlers ───────────────────────────────────────────────────────

  const handleAnalyzeEC = async () => {
    if (ecDescription.trim().length < 10) return;
    setECLoading(true);
    try {
      const res = await fetch("/api/analyze-extracurriculars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: ecDescription }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setECAnalysis(data);
        setStep(3);
      }
    } catch {
      alert("Failed to analyze extracurriculars. Please try again.");
    } finally {
      setECLoading(false);
    }
  };

  const handleGetRecommendations = async () => {
    if (selectedInterests.length === 0) return;
    setResultsLoading(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grade: parseFloat(grade),
          extracurricularScore: ecAnalysis?.score ?? 1.0,
          interestCategories: selectedInterests,
        }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setResults(data);
        setStep(4);
      }
    } catch {
      alert("Failed to get recommendations. Please try again.");
    } finally {
      setResultsLoading(false);
    }
  };

  const toggleInterest = (cat: string) => {
    setSelectedInterests((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const tierColors: Record<AdmissionTier, string> = {
    reach: "bg-red-500/20 text-red-400 border-red-500/30",
    match: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    safety: "bg-green-500/20 text-green-400 border-green-500/30",
  };

  const tierLabels: Record<AdmissionTier, string> = {
    reach: "Reach",
    match: "Match",
    safety: "Safety",
  };

  // ── Render ─────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/UniMaxx.png" alt="UniMaxxing logo" className="w-8 h-8 rounded-lg object-cover" />
            <h1 className="text-xl font-bold tracking-tight">UniMaxxing</h1>
            <span className="text-xs text-muted-foreground hidden sm:block">
        
            </span>
          </div>
          {step > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setStep(1);
                setResults(null);
                setECAnalysis(null);
              }}
            >
              Start Over
            </Button>
          )}
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1">
              <div
                className={`h-1.5 rounded-full transition-colors duration-300 ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mb-8">
          <span className={`flex-1 text-center ${step >= 1 ? "text-foreground font-medium" : ""}`}>Grades</span>
          <span className={`flex-1 text-center ${step >= 2 ? "text-foreground font-medium" : ""}`}>Activities</span>
          <span className={`flex-1 text-center ${step >= 3 ? "text-foreground font-medium" : ""}`}>Interests</span>
          <span className={`flex-1 text-center ${step >= 4 ? "text-foreground font-medium" : ""}`}>Results</span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 pb-20">
        {/* ── STEP 1: Grades ── */}
        {step === 1 && (
          <div className="max-w-lg mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                What&apos;s your average?
              </h2>
              <p className="text-muted-foreground">
                Enter your top 6 Ontario high school average (or overall average).
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade">Overall Average (%)</Label>
                    <Input
                      id="grade"
                      type="number"
                      min={50}
                      max={100}
                      step={0.1}
                      placeholder="e.g. 92.5"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="text-2xl h-14 text-center font-mono"
                    />
                  </div>

                  {grade && parseFloat(grade) >= 50 && parseFloat(grade) <= 100 && (
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Competitiveness</span>
                        <span className="font-medium">
                          {parseFloat(grade) >= 95
                            ? "Exceptional"
                            : parseFloat(grade) >= 90
                              ? "Very Strong"
                              : parseFloat(grade) >= 85
                                ? "Strong"
                                : parseFloat(grade) >= 80
                                  ? "Good"
                                  : parseFloat(grade) >= 75
                                    ? "Moderate"
                                    : "Below Average"}
                        </span>
                      </div>
                      <Progress value={parseFloat(grade)} />
                    </div>
                  )}

                  <Button
                    className="w-full mt-4"
                    size="lg"
                    disabled={!grade || parseFloat(grade) < 50 || parseFloat(grade) > 100}
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── STEP 2: Extracurriculars ── */}
        {step === 2 && (
          <div className="max-w-lg mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Tell us about your activities
              </h2>
              <p className="text-muted-foreground">
                Describe your extracurriculars, leadership, volunteer work,
                awards, and any other activities. Our AI will analyze them.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ec">Extracurricular Description</Label>
                    <Textarea
                      id="ec"
                      placeholder="e.g. I'm the president of the robotics club, volunteer at the local hospital every weekend, won a regional science fair award, play varsity basketball, and tutor younger students in math..."
                      value={ecDescription}
                      onChange={(e) => setECDescription(e.target.value)}
                      className="min-h-[160px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      {ecDescription.trim().split(/\s+/).filter(Boolean).length} words
                      &middot; The more detail you provide, the better the analysis.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      className="flex-1"
                      size="lg"
                      disabled={ecDescription.trim().length < 10 || ecLoading}
                      onClick={handleAnalyzeEC}
                    >
                      {ecLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          Analyzing...
                        </span>
                      ) : (
                        "Analyze with AI"
                      )}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full text-muted-foreground text-sm"
                    onClick={() => {
                      setECAnalysis(null);
                      setStep(3);
                    }}
                  >
                    Skip this step
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── STEP 3: Interests + EC Results ── */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* EC Analysis Card */}
            {ecAnalysis && (
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Extracurricular Analysis
                    <Badge variant="secondary" className="text-xs font-normal">
                      {ecAnalysis.source === "ai" ? "AI-Powered" : "Heuristic"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{ecAnalysis.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>EC Strength Score</span>
                      <span className="font-bold font-mono">
                        {Math.round(ecAnalysis.score * 100)}%
                      </span>
                    </div>
                    <Progress value={ecAnalysis.score * 100} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-green-400">Strengths</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {ecAnalysis.strengths.map((s, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-green-400 shrink-0">+</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-yellow-400">
                        Areas to Improve
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {ecAnalysis.improvements.map((s, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-yellow-400 shrink-0">!</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Interest Selection */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                What interests you?
              </h2>
              <p className="text-muted-foreground">
                Select one or more fields you&apos;re considering.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => {
                // Inline SVG icons — monochrome, stroke-based, fits dark theme
                const iconPaths: Record<string, React.ReactNode> = {
                  "Agriculture": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V2"/><path d="M5 9c2-1 4-3 7-3s5 2 7 3"/><path d="M5 15c2 1 4 3 7 3s5-2 7-3"/><path d="M2 12h4"/><path d="M18 12h4"/></svg>
                  ),
                  "Architecture & Planning": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="14" rx="1"/><path d="M3 8l9-6 9 6"/><path d="M10 22v-6h4v6"/><path d="M7 12h2v2H7z"/><path d="M15 12h2v2h-2z"/></svg>
                  ),
                  "Biological & Biomedical Sciences": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="M8 6c0-2 1.5-4 4-4s4 2 4 4-1.5 3-4 3-4-1-4-3z"/><path d="M7 14c-2 1-3 3-3 5 0 2 3 3 8 3s8-1 8-3c0-2-1-4-3-5"/><circle cx="12" cy="14" r="2"/></svg>
                  ),
                  "Commerce/Mgmt/Business Admin": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M12 12v4"/><path d="M2 12h20"/></svg>
                  ),
                  "Communication & Journalism": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v12H5.2L4 17.3V4z"/><path d="M8 9h8"/><path d="M8 12h4"/></svg>
                  ),
                  "Computer & Information Science": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>
                  ),
                  "Education": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>
                  ),
                  "Engineering": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  ),
                  "Family & Consumer/Human Sciences": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  ),
                  "Fine & Applied Arts": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
                  ),
                  "General Science": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3v7.4L4.2 19.5A1.5 1.5 0 0 0 5.5 22h13a1.5 1.5 0 0 0 1.3-2.5L15 10.4V3"/><path d="M7 3h10"/><path d="M10 12h4"/></svg>
                  ),
                  "Health Profess & Related Programs": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  ),
                  "Kinesiology/Recreation/Physical Education": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="4" r="2"/><path d="M22 8h-4l-2 3"/><path d="M16 11l-3 5-3-2-4 5"/><path d="M4 19h3l2-3"/></svg>
                  ),
                  "Languages & Linguistics": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>
                  ),
                  "Liberal Arts & Sciences/General Studies/Humanities": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8"/><path d="M8 11h6"/></svg>
                  ),
                  "Mathematics & Statistics": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 8h4"/><path d="M9 6v4"/><path d="M7 17l4-4"/><path d="M7 13l4 4"/><path d="M14 9h3"/><path d="M14 16h3"/><path d="M14 13h3"/></svg>
                  ),
                  "Music": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                  ),
                  "Natural Resources & Conservation": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14c.3-3-2.2-6.3-5-8-2.8 1.7-5.3 5-5 8 0 3.3 2.2 6 5 8 2.8-2 5-4.7 5-8z"/><path d="M12 22V6"/></svg>
                  ),
                  "Nursing": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><path d="M22 10 A2 2 0 0 0 20 8 A2 2 0 0 0 18 10"/><path d="M9 11h2"/><path d="M10 10v2"/></svg>
                  ),
                  "Physical Science": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>
                  ),
                  "Psychology": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 3-2 5.5-4 7l-3 4-3-4c-2-1.5-4-4-4-7a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2"/></svg>
                  ),
                  "Social Sciences": (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  ),
                };
                const shortLabels: Record<string, string> = {
                  "Commerce/Mgmt/Business Admin": "Business",
                  "Communication & Journalism": "Journalism",
                  "Computer & Information Science": "Computer Science",
                  "Biological & Biomedical Sciences": "Biology",
                  "Health Profess & Related Programs": "Health Sciences",
                  "Kinesiology/Recreation/Physical Education": "Kinesiology",
                  "Liberal Arts & Sciences/General Studies/Humanities": "Liberal Arts",
                  "Mathematics & Statistics": "Math & Stats",
                  "Natural Resources & Conservation": "Environment",
                  "Family & Consumer/Human Sciences": "Human Sciences",
                  "Fine & Applied Arts": "Fine Arts",
                };
                const selected = selectedInterests.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleInterest(cat)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                      selected
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/5"
                        : "border-border hover:border-muted-foreground/30 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-muted-foreground shrink-0">{iconPaths[cat] ?? <span className="inline-block w-5 h-5 rounded-full border border-current" />}</span>
                      <p className="text-xs font-medium leading-tight">{shortLabels[cat] ?? cat}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                className="flex-1"
                size="lg"
                disabled={selectedInterests.length === 0 || resultsLoading}
                onClick={handleGetRecommendations}
              >
                {resultsLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Computing probabilities...
                  </span>
                ) : (
                  `Get Recommendations (${selectedInterests.length} selected)`
                )}
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Results ── */}
        {step === 4 && results && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Summary Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Your Recommendations
              </h2>
              <p className="text-muted-foreground">
                Analyzed {results.totalProgramsAnalyzed} programs across Ontario
                universities
              </p>
              <div className="flex justify-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="w-3 h-3 rounded-full bg-green-500/50" />
                  <span>{results.safety.length} Safety</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <span>{results.match.length} Match</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="w-3 h-3 rounded-full bg-red-500/50" />
                  <span>{results.reach.length} Reach</span>
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            <Card className="border-border/50">
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold font-mono">{grade}%</p>
                    <p className="text-xs text-muted-foreground mt-1">Average</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-mono">
                      {Math.round((ecAnalysis?.score ?? 1.0) * 100)}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">EC Score</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-mono">
                      {selectedInterests.length}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Interests</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tier Sections */}
            {(
              [
                { tier: "safety" as const, data: results.safety, label: "Safety Schools", desc: "High likelihood of admission (>75% probability)" },
                { tier: "match" as const, data: results.match, label: "Match Schools", desc: "Moderate chance of admission (40–75% probability)" },
                { tier: "reach" as const, data: results.reach, label: "Reach Schools", desc: "Challenging but possible (<40% probability)" },
              ] as const
            ).map(({ tier, data, label, desc }) => (
              <div key={tier} className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold">{label}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>

                {data.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="py-8 text-center text-muted-foreground text-sm">
                      No programs in this category match your profile.
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-3">
                    {data.map((rec) => {
                      const key = `${rec.university}-${rec.program}`;
                      const isExpanded = expandedCard === key;
                      return (
                        <Card
                          key={key}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                            isExpanded ? "ring-1 ring-primary/30" : ""
                          }`}
                          onClick={() =>
                            setExpandedCard(isExpanded ? null : key)
                          }
                        >
                          <CardContent className="pt-5 pb-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-semibold truncate">
                                    {rec.university}
                                  </h4>
                                  <Badge
                                    className={`text-[10px] px-1.5 rounded-md ${tierColors[tier]}`}
                                  >
                                    {tierLabels[tier]}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {rec.program}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1 flex-wrap">
                                  <span>Cutoff: ~{rec.estimatedCutoff}%</span>
                                  <span>&bull;</span>
                                  <span>Data Year: {rec.year}</span>
                                  {rec.expenses.domestic?.estimatedTotal && (
                                    <>
                                      <span>&bull;</span>
                                      <span className="text-blue-400 font-medium">
                                        ~${Math.round(rec.expenses.domestic.estimatedTotal).toLocaleString()}/yr
                                      </span>
                                    </>
                                  )}
                                  {rec.employment.rate2yr !== null && (
                                    <>
                                      <span>&bull;</span>
                                      <span className="text-emerald-400 font-medium">
                                        {rec.employment.rate2yr}% employed
                                      </span>
                                    </>
                                  )}
                                  <span>&bull;</span>
                                  <Badge variant="outline" className="text-[10px]">
                                    {rec.category}
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-2xl font-bold font-mono">
                                  {Math.round(rec.compositeScore * 100)}%
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                  admission probability
                                </p>
                              </div>
                            </div>

                            {/* Expanded Details */}
                            {isExpanded && (
                              <div className="mt-4 pt-4 border-t border-border/50 space-y-4 animate-in fade-in duration-300">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                      Academic Probability
                                    </p>
                                    <div className="space-y-1">
                                      <div className="flex justify-between text-sm">
                                        <span>Gaussian CDF</span>
                                        <span className="font-mono">
                                          {(rec.explanation.gaussianCDF * 100).toFixed(1)}%
                                        </span>
                                      </div>
                                      <Progress
                                        value={rec.explanation.gaussianCDF * 100}
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <div className="flex justify-between text-sm">
                                        <span>Bayesian Posterior</span>
                                        <span className="font-mono">
                                          {(rec.explanation.betaPosteriorMean * 100).toFixed(1)}%
                                        </span>
                                      </div>
                                      <Progress
                                        value={
                                          rec.explanation.betaPosteriorMean * 100
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                      Distribution Parameters
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div className="bg-muted/50 rounded-lg p-2 text-center">
                                        <p className="font-mono font-bold">
                                          {rec.explanation.mu}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground">
                                          μ (mean)
                                        </p>
                                      </div>
                                      <div className="bg-muted/50 rounded-lg p-2 text-center">
                                        <p className="font-mono font-bold">
                                          {rec.explanation.sigma}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground">
                                          σ (std dev)
                                        </p>
                                      </div>
                                      <div className="bg-muted/50 rounded-lg p-2 text-center">
                                        <p className="font-mono font-bold">
                                          {rec.explanation.zScore}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground">
                                          z-score
                                        </p>
                                      </div>
                                      <div className="bg-muted/50 rounded-lg p-2 text-center">
                                        <p className="font-mono font-bold">
                                          {rec.explanation.betaAlpha.toFixed(0)}/
                                          {rec.explanation.betaBeta.toFixed(0)}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground">
                                          α/β (Beta)
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <Separator />

                                {/* Estimated Expenses */}
                                {rec.expenses.domestic && (
                                  <div className="space-y-2">
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                      Estimated Annual Expenses ({rec.expenses.dataYear})
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                      {/* Domestic */}
                                      <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                                        <p className="text-xs font-semibold flex items-center gap-1.5">
                                          <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                                          Domestic
                                        </p>
                                        {rec.expenses.domestic!.tuition !== null && (
                                          <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Tuition</span>
                                            <span className="font-mono">${rec.expenses.domestic!.tuition!.toLocaleString()}</span>
                                          </div>
                                        )}
                                        {rec.expenses.domestic!.ancillaryFees !== null && (
                                          <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Ancillary Fees</span>
                                            <span className="font-mono">${rec.expenses.domestic!.ancillaryFees!.toLocaleString()}</span>
                                          </div>
                                        )}
                                        {rec.expenses.domestic!.roomAndBoard !== null && (
                                          <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Room & Board</span>
                                            <span className="font-mono">${rec.expenses.domestic!.roomAndBoard!.toLocaleString()}</span>
                                          </div>
                                        )}
                                        {rec.expenses.domestic!.booksAndSupplies !== null && (
                                          <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Books & Supplies</span>
                                            <span className="font-mono">${rec.expenses.domestic!.booksAndSupplies!.toLocaleString()}</span>
                                          </div>
                                        )}
                                        {rec.expenses.domestic!.transportation !== null && (
                                          <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Transportation</span>
                                            <span className="font-mono">${rec.expenses.domestic!.transportation!.toLocaleString()}</span>
                                          </div>
                                        )}
                                        {rec.expenses.domestic!.otherExpenses !== null && (
                                          <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Other</span>
                                            <span className="font-mono">${rec.expenses.domestic!.otherExpenses!.toLocaleString()}</span>
                                          </div>
                                        )}
                                        {rec.expenses.domestic!.estimatedTotal !== null && (
                                          <div className="flex justify-between text-xs font-semibold pt-1 border-t border-border/50">
                                            <span>Total</span>
                                            <span className="font-mono text-blue-400">${rec.expenses.domestic!.estimatedTotal!.toLocaleString()}</span>
                                          </div>
                                        )}
                                      </div>
                                      {/* International */}
                                      <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                                        <p className="text-xs font-semibold flex items-center gap-1.5">
                                          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                                          International
                                        </p>
                                        {rec.expenses.international?.tuition !== null && rec.expenses.international?.tuition !== undefined && (
                                          <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Tuition</span>
                                            <span className="font-mono">${rec.expenses.international!.tuition!.toLocaleString()}</span>
                                          </div>
                                        )}
                                        {rec.expenses.international?.ancillaryFees !== null && rec.expenses.international?.ancillaryFees !== undefined && (
                                          <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Ancillary Fees</span>
                                            <span className="font-mono">${rec.expenses.international!.ancillaryFees!.toLocaleString()}</span>
                                          </div>
                                        )}
                                        {rec.expenses.international?.roomAndBoard !== null && rec.expenses.international?.roomAndBoard !== undefined && (
                                          <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Room & Board</span>
                                            <span className="font-mono">${rec.expenses.international!.roomAndBoard!.toLocaleString()}</span>
                                          </div>
                                        )}
                                        {rec.expenses.international?.booksAndSupplies !== null && rec.expenses.international?.booksAndSupplies !== undefined && (
                                          <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Books & Supplies</span>
                                            <span className="font-mono">${rec.expenses.international!.booksAndSupplies!.toLocaleString()}</span>
                                          </div>
                                        )}
                                        {rec.expenses.international?.transportation !== null && rec.expenses.international?.transportation !== undefined && (
                                          <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Transportation</span>
                                            <span className="font-mono">${rec.expenses.international!.transportation!.toLocaleString()}</span>
                                          </div>
                                        )}
                                        {rec.expenses.international?.otherExpenses !== null && rec.expenses.international?.otherExpenses !== undefined && (
                                          <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Other</span>
                                            <span className="font-mono">${rec.expenses.international!.otherExpenses!.toLocaleString()}</span>
                                          </div>
                                        )}
                                        {rec.expenses.international?.estimatedTotal !== null && rec.expenses.international?.estimatedTotal !== undefined && (
                                          <div className="flex justify-between text-xs font-semibold pt-1 border-t border-border/50">
                                            <span>Total</span>
                                            <span className="font-mono text-emerald-400">${rec.expenses.international!.estimatedTotal!.toLocaleString()}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Employment Rates */}
                                {(rec.employment.rate2yr !== null || rec.employment.rate6mo !== null) && (
                                  <>
                                    <Separator />
                                    <div className="space-y-2">
                                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                        Employment Rate ({rec.employment.dataYear})
                                      </p>
                                      <div className="grid grid-cols-2 gap-3">
                                        {rec.employment.rate2yr !== null && (
                                          <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                                            <p className="text-xs font-semibold flex items-center gap-1.5">
                                              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                                              2 Years After Graduation
                                            </p>
                                            <div className="space-y-1">
                                              <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Employed</span>
                                                <span className="font-mono font-bold text-emerald-400">
                                                  {rec.employment.rate2yr}%
                                                </span>
                                              </div>
                                              <Progress value={rec.employment.rate2yr} />
                                            </div>
                                          </div>
                                        )}
                                        {rec.employment.rate6mo !== null && (
                                          <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                                            <p className="text-xs font-semibold flex items-center gap-1.5">
                                              <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
                                              6 Months After Graduation
                                            </p>
                                            <div className="space-y-1">
                                              <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Employed</span>
                                                <span className="font-mono font-bold text-amber-400">
                                                  {rec.employment.rate6mo}%
                                                </span>
                                              </div>
                                              <Progress value={rec.employment.rate6mo} />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </>
                                )}

                                <Separator />

                                <div className="text-xs text-muted-foreground space-y-1">
                                  <p>
                                    <strong>How this was calculated:</strong> Your
                                    grade of {grade}% was compared against the
                                    admission average distribution (μ=
                                    {rec.explanation.mu}, σ={rec.explanation.sigma})
                                    using a Gaussian CDF, yielding a z-score of{" "}
                                    {rec.explanation.zScore}. This was combined with
                                    a Bayesian Beta posterior (
                                    α={rec.explanation.betaAlpha.toFixed(1)}, β=
                                    {rec.explanation.betaBeta.toFixed(1)}) and your
                                    extracurricular + interest scores via log-odds
                                    composite scoring.
                                  </p>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Math Methodology Section */}
            <Separator />
            <Card className="border-border/30">
              <CardHeader>
                <CardTitle>Statistical Methodology</CardTitle>
                <CardDescription>
                  The mathematical models used to compute your admission probabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    1. Gaussian CDF Model (Normal Distribution)
                  </h4>
                  <p>
                    The entering average distribution for each program is modeled
                    as a Normal distribution N(μ, σ²). Parameters μ (mean) and σ
                    (standard deviation) are estimated via the <em>Method of Moments</em>{" "}
                    from the binned percentage data.
                  </p>
                  <div className="bg-muted/30 rounded-lg p-3 font-mono text-xs">
                    P_academic(g) = Φ((g − μ) / σ)
                    <br />
                    where Φ(z) = (1/2)[1 + erf(z / √2)]
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    2. Bayesian Beta Posterior
                  </h4>
                  <p>
                    The true admission probability is modeled as a Beta-distributed
                    random variable – the conjugate prior for binomial data.
                    Laplace smoothing (+1) prevents zero probabilities:
                  </p>
                  <div className="bg-muted/30 rounded-lg p-3 font-mono text-xs">
                    α = (students at/above your grade) × N + 1
                    <br />
                    β = (students below your grade) × N + 1
                    <br />
                    E[θ] = α / (α + β) &nbsp;&nbsp;(posterior mean)
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    3. Log-Odds Composite Scoring
                  </h4>
                  <p>
                    Multiple signals are combined via log-odds addition –
                    the principled way to merge independent evidence
                    while keeping probabilities in (0, 1):
                  </p>
                  <div className="bg-muted/30 rounded-lg p-3 font-mono text-xs">
                    logit(P) = ln(P / (1 − P))
                    <br />
                    logit(P_final) = 0.60·logit(P_acad) + 0.20·logit(P_ec) +
                    0.20·logit(P_interest)
                    <br />
                    P_final = 1 / (1 + e^(−logit(P_final)))
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    4. Tier Classification
                  </h4>
                  <div className="bg-muted/30 rounded-lg p-3 font-mono text-xs">
                    Safety: &nbsp; P_final ≥ 0.75
                    <br />
                    Match: &nbsp;&nbsp; 0.40 ≤ P_final &lt; 0.75
                    <br />
                    Reach: &nbsp;&nbsp; P_final &lt; 0.40
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
