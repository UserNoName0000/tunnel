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
          extracurricularScore: ecAnalysis?.score ?? 0.5,
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
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Tunnel</h1>
            <span className="text-xs text-muted-foreground hidden sm:block">
              University Admission Advisor
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
          <span className={step >= 1 ? "text-foreground font-medium" : ""}>Grades</span>
          <span className={step >= 2 ? "text-foreground font-medium" : ""}>Activities</span>
          <span className={step >= 3 ? "text-foreground font-medium" : ""}>Interests</span>
          <span className={step >= 4 ? "text-foreground font-medium" : ""}>Results</span>
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

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => {
                const icons: Record<string, string> = {
                  "Computer Science": "💻",
                  Engineering: "⚙️",
                  Business: "💼",
                  Science: "🔬",
                  Health: "🏥",
                  Arts: "🎨",
                };
                const selected = selectedInterests.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleInterest(cat)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left space-y-1 ${
                      selected
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/5"
                        : "border-border hover:border-muted-foreground/30 hover:bg-muted/50"
                    }`}
                  >
                    <span className="text-2xl">{icons[cat]}</span>
                    <p className="text-sm font-medium">{cat}</p>
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
                      {Math.round((ecAnalysis?.score ?? 0.5) * 100)}%
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
