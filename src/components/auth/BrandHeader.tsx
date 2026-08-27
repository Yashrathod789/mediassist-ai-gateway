import { HeartPulse } from "lucide-react";

/** MediAssist AI logo, product name and tagline. */
export function BrandHeader() {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl text-primary-foreground shadow-md"
        style={{ backgroundImage: "var(--gradient-brand)" }}
        aria-hidden="true"
      >
        <HeartPulse className="h-7 w-7" />
      </div>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">MediAssist AI</h1>
      <p className="mt-1 text-sm text-muted-foreground">Intelligent Medical Report Assistance</p>
    </div>
  );
}
