import { useRef, useState } from "react";
import { motion } from "motion/react";
import { AlertCircle, Loader2, MessageCircleQuestion, Send, Sparkles, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  askDemoQuestion,
  QUESTION_MAX_LENGTH,
  SUGGESTED_QUESTIONS,
  validateQuestion,
} from "@/lib/questions-api";

type Turn = {
  id: number;
  question: string;
  answer: string;
  matched: boolean;
  time: string;
};

/** Demo Q&A experience: input, suggestions and conversation list. */
export function QuestionPanel() {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const idRef = useRef(0);

  const disabled = loading || question.trim().length === 0;

  async function handleAsk() {
    const message = validateQuestion(question);
    if (message) {
      setError(message);
      return;
    }

    setError(null);
    setLoading(true);
    const asked = question.trim();
    const result = await askDemoQuestion(asked);
    idRef.current += 1;
    setTurns((prev) => [
      ...prev,
      {
        id: idRef.current,
        question: asked,
        answer: result.answer,
        matched: result.matched,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setQuestion("");
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
        <CardHeader>
          <CardTitle>Your Question</CardTitle>
          <CardDescription>
            Type a question about the processed report. Answers below are demo content only.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Ask a question about this report..."
            rows={4}
            maxLength={QUESTION_MAX_LENGTH + 50}
            aria-label="Ask a question about this report"
            className="min-h-28 resize-y"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-muted-foreground">
              {question.trim().length}/{QUESTION_MAX_LENGTH} characters
            </span>
            <Button onClick={handleAsk} disabled={disabled} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Preparing answer...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Ask Question
                </>
              )}
            </Button>
          </div>

          {error ? (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {error}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
        <CardHeader>
          <CardTitle>Suggested Questions</CardTitle>
          <CardDescription>Tap a question to place it in the input above.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setQuestion(s);
                setError(null);
              }}
              className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {s}
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border" style={{ boxShadow: "var(--shadow-card)" }}>
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {turns.length === 0 && !loading ? (
            <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border p-8 text-center">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground"
                aria-hidden="true"
              >
                <MessageCircleQuestion className="h-5 w-5" />
              </span>
              <p className="text-sm font-medium">Ask a question about your report</p>
              <p className="text-sm text-muted-foreground">
                Your questions will be answered based on the processed report.
              </p>
            </div>
          ) : null}

          {turns.map((turn) => (
            <motion.div
              key={turn.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-3"
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
                  aria-hidden="true"
                >
                  <User className="h-4 w-4" />
                </span>
                <div className="min-w-0 rounded-xl bg-muted p-3">
                  <p className="text-xs font-medium text-muted-foreground">You · {turn.time}</p>
                  <p className="mt-1 text-sm break-words">{turn.question}</p>
                </div>
              </div>

              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground"
                  aria-hidden="true"
                >
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="min-w-0 rounded-xl border border-border bg-background/60 p-3">
                  <Badge variant={turn.matched ? "secondary" : "outline"}>Demo AI Response</Badge>
                  <p className="mt-2 text-sm break-words">{turn.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {loading ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Preparing answer...
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
