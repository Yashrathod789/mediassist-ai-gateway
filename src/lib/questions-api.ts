/**
 * Demo question-answering data layer (frontend prototype only).
 *
 * Later this becomes a real call:
 *
 *   const { data } = await axios.post(`${API_BASE_URL}/reports/${id}/ask`, { question });
 *   return data;
 */

export const QUESTION_MAX_LENGTH = 300;

export type DemoAnswer = {
  answer: string;
  matched: boolean;
};

export const DEMO_REPORT_NAME = "Sample_Blood_Report.pdf";

export const SUGGESTED_QUESTIONS = [
  "What does haemoglobin mean?",
  "Can you explain the key findings in simple language?",
  "Which values are outside the reference range?",
  "What does this report contain?",
  "Can you explain this report in simple terms?",
] as const;

const KNOWLEDGE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["haemoglobin", "hemoglobin", "hb"],
    answer:
      "Haemoglobin is a protein in red blood cells that helps carry oxygen throughout the body. In this sample report it is slightly below the usual reference range, which on its own does not confirm any condition.",
  },
  {
    keywords: ["key finding", "findings", "simple language", "simple terms", "explain this report"],
    answer:
      "In this sample report, haemoglobin is a little below the usual range, while white blood cells (which help fight infection) and platelets (which help blood clot) are within their usual ranges. No critical values were flagged.",
  },
  {
    keywords: ["reference range", "outside", "abnormal", "out of range"],
    answer:
      "Only haemoglobin sits slightly below its reference range in this demo report. All other listed values fall inside their typical ranges.",
  },
  {
    keywords: ["what does this report contain", "contain", "what is in", "type of report"],
    answer:
      "This demo report is a Complete Blood Count (CBC) sample. It lists haemoglobin, white blood cell count and platelet count, each compared against a typical reference range.",
  },
  {
    keywords: ["wbc", "white blood"],
    answer:
      "WBC stands for white blood cells, which help the body fight infection. In this sample report the count is within the normal range.",
  },
  {
    keywords: ["platelet"],
    answer:
      "Platelets are small blood cells that help your blood clot. In this sample report the platelet count is within the normal range.",
  },
];

const FALLBACK =
  "This demo prototype does not have a sample answer for that question yet. Try one of the suggested questions, or ask about haemoglobin, white blood cells, platelets or the key findings of this sample report.";

/** Simulated demo answer lookup — replaced by an Axios request later. */
export function askDemoQuestion(question: string): Promise<DemoAnswer> {
  const q = question.toLowerCase();
  const hit = KNOWLEDGE.find((entry) => entry.keywords.some((k) => q.includes(k)));

  return new Promise((resolve) =>
    setTimeout(
      () => resolve(hit ? { answer: hit.answer, matched: true } : { answer: FALLBACK, matched: false }),
      700,
    ),
  );
}

/** Client-side validation for the question input. */
export function validateQuestion(question: string): string | null {
  const trimmed = question.trim();
  if (!trimmed) return "Please type a question before asking.";
  if (trimmed.length < 5) return "That question looks too short — please add a little more detail.";
  if (trimmed.length > QUESTION_MAX_LENGTH)
    return `Please keep your question under ${QUESTION_MAX_LENGTH} characters.`;
  return null;
}
