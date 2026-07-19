"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  computeAuditResult,
  type AuditAnswers,
} from "@/lib/audit/scoring";
import { saveAuditLead } from "@/app/actions/audit";
import { QUESTIONS } from "./questions";
import { AuditReport } from "./audit-report";

const STORAGE_KEY = "raha-audit-v1";

type Phase = "quiz" | "gate" | "report";

interface StoredState {
  step: number;
  answers: Partial<Record<keyof AuditAnswers, string | string[]>>;
}

function loadStored(): StoredState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredState;
    if (typeof parsed.step !== "number" || typeof parsed.answers !== "object") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function AuditWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<StoredState["answers"]>({});
  const [phase, setPhase] = useState<Phase>("quiz");
  const [hydrated, setHydrated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const stored = loadStored();
    if (stored) {
      setStep(Math.min(stored.step, QUESTIONS.length - 1));
      setAnswers(stored.answers);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ step, answers } satisfies StoredState),
      );
    } catch {
      // Storage full/blocked — persistence is a nicety, not a requirement.
    }
  }, [step, answers, hydrated]);

  const question = QUESTIONS[step];
  const currentAnswer = answers[question.id];
  const isComplete = QUESTIONS.every((q) => {
    const a = answers[q.id];
    return q.kind === "multi"
      ? Array.isArray(a) && a.length > 0
      : typeof a === "string" && a.length > 0;
  });

  const result = useMemo(() => {
    if (!isComplete) return null;
    return computeAuditResult(answers as unknown as AuditAnswers);
  }, [answers, isComplete]);

  function selectSingle(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    // Auto-advance feels premium for single-select.
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep((s) => Math.min(s + 1, QUESTIONS.length - 1)), 180);
    } else {
      setTimeout(() => setPhase("gate"), 180);
    }
  }

  function toggleMulti(value: string) {
    setAnswers((prev) => {
      const existing = Array.isArray(prev[question.id])
        ? (prev[question.id] as string[])
        : [];
      const next = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      return { ...prev, [question.id]: next };
    });
  }

  function submitGate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!result) return;
    const honeypot = new FormData(e.currentTarget).get("company");
    startTransition(async () => {
      const saved = await saveAuditLead({
        name,
        email,
        handle: handle || undefined,
        answers,
        company: typeof honeypot === "string" ? honeypot : undefined,
      });
      if (saved.status === "ok") {
        setPhase("report");
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
      } else {
        toast.error(saved.message);
      }
    });
  }

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center text-raha-ink/40">
        Loading your check…
      </div>
    );
  }

  if (phase === "report" && result) {
    return <AuditReport result={result} name={name} />;
  }

  if (phase === "gate" && result) {
    return (
      <div className="mx-auto max-w-xl px-5 py-14">
        <div
          aria-hidden
          className="pointer-events-none select-none rounded-2xl border border-raha-ink/10 bg-white p-6 blur-[6px]"
        >
          <div className="h-8 w-40 rounded bg-raha-ink/10" />
          <div className="mt-4 h-4 w-full rounded bg-raha-ink/10" />
          <div className="mt-2 h-4 w-5/6 rounded bg-raha-ink/10" />
          <div className="mt-2 h-4 w-4/6 rounded bg-raha-ink/10" />
        </div>
        <div className="-mt-16 relative z-10 rounded-2xl border border-raha-green/20 bg-white p-7 shadow-xl">
          <h2 className="font-display text-2xl text-raha-ink">
            Your report is ready.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-raha-ink/60">
            Tell us where to send the full breakdown — you&apos;ll see it right
            here, instantly.
          </p>
          <form onSubmit={submitGate} className="mt-6 space-y-4" noValidate>
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />
            <div className="space-y-2">
              <Label htmlFor="au-name">Name</Label>
              <Input
                id="au-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={120}
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="au-email">Email</Label>
              <Input
                id="au-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={320}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="au-handle">
                Channel / handle{" "}
                <span className="text-raha-ink/40">(optional)</span>
              </Label>
              <Input
                id="au-handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                maxLength={120}
                placeholder="@yourchannel"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 w-full text-base"
              disabled={pending || !name || !email}
            >
              {pending ? "Unlocking…" : "Show my report"}
            </Button>
            <p className="text-center text-xs text-raha-ink/45">
              Indicative self-assessment, not tax advice. We&apos;ll never
              spam you.
            </p>
          </form>
        </div>
      </div>
    );
  }

  const progress = (step / QUESTIONS.length) * 100;
  const selectedMulti = Array.isArray(currentAnswer)
    ? (currentAnswer as string[])
    : [];

  return (
    <div className="mx-auto max-w-xl px-5 py-14">
      <div className="flex items-center justify-between text-xs font-medium text-raha-ink/50">
        <span>
          Question {step + 1} of {QUESTIONS.length}
        </span>
        <span>~2 minutes</span>
      </div>
      <Progress
        value={progress}
        aria-label={`Question ${step + 1} of ${QUESTIONS.length}`}
        className="mt-2 h-1.5"
      />
      <h1 className="font-display mt-8 text-2xl leading-snug text-raha-ink sm:text-3xl">
        {question.title}
      </h1>
      {question.sub ? (
        <p className="mt-2 text-raha-ink/60">{question.sub}</p>
      ) : null}
      <div className="mt-7 space-y-3">
        {question.kind === "single"
          ? question.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => selectSingle(opt.value)}
                className={`w-full rounded-xl border px-5 py-4 text-left text-base transition-colors ${
                  currentAnswer === opt.value
                    ? "border-raha-green bg-raha-green-soft text-raha-green"
                    : "border-raha-ink/10 bg-white text-raha-ink hover:border-raha-green/40"
                }`}
              >
                {opt.label}
              </button>
            ))
          : question.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={selectedMulti.includes(opt.value)}
                onClick={() => toggleMulti(opt.value)}
                className={`w-full rounded-xl border px-5 py-4 text-left text-base transition-colors ${
                  selectedMulti.includes(opt.value)
                    ? "border-raha-green bg-raha-green-soft text-raha-green"
                    : "border-raha-ink/10 bg-white text-raha-ink hover:border-raha-green/40"
                }`}
              >
                <span className="mr-3" aria-hidden>
                  {selectedMulti.includes(opt.value) ? "✓" : "+"}
                </span>
                {opt.label}
              </button>
            ))}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="text-raha-ink/60"
        >
          ← Back
        </Button>
        {question.kind === "multi" ? (
          <Button
            type="button"
            onClick={() =>
              step < QUESTIONS.length - 1
                ? setStep((s) => s + 1)
                : setPhase("gate")
            }
            disabled={selectedMulti.length === 0}
            className="px-6"
          >
            Continue →
          </Button>
        ) : null}
      </div>
    </div>
  );
}
