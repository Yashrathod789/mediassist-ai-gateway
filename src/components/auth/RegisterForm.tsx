import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Loader2, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "./PasswordInput";
import { FieldError } from "./FieldError";
import { FormStatus, type Status } from "./FormStatus";
import { register } from "@/lib/auth-api";

type Errors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Values = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  else if (values.fullName.trim().length < 3)
    errors.fullName = "Full name must be at least 3 characters.";

  if (!values.email.trim()) errors.email = "Email address is required.";
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Enter a valid email address.";

  if (!values.password) errors.password = "Password is required.";
  else if (values.password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  else if (!/[A-Za-z]/.test(values.password) || !/[0-9]/.test(values.password))
    errors.password = "Password must include at least one letter and one number.";

  if (!values.confirmPassword) errors.confirmPassword = "Please confirm your password.";
  else if (values.confirmPassword !== values.password)
    errors.confirmPassword = "Passwords do not match.";

  if (!values.acceptedTerms) errors.terms = "You must accept the Terms & Conditions.";

  return errors;
}

export function RegisterForm() {
  const [values, setValues] = useState<Values>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function setField<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setStatus(null);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const result = await register({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      setStatus({
        type: "success",
        message: `Account created for ${result.user.name}. You can now log in.`,
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>
        <div className="relative">
          <User
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            placeholder="Dr. Aisha Kapoor"
            className="pl-9"
            value={values.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
        </div>
        <FieldError id="fullName-error" message={errors.fullName} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@hospital.org"
            className="pl-9"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </div>
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={values.password}
          onChange={(e) => setField("password", e.target.value)}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        <FieldError id="password-error" message={errors.password} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={values.confirmPassword}
          onChange={(e) => setField("confirmPassword", e.target.value)}
          aria-invalid={Boolean(errors.confirmPassword)}
          aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
        />
        <FieldError id="confirmPassword-error" message={errors.confirmPassword} />
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <Checkbox
            id="terms"
            className="mt-0.5"
            checked={values.acceptedTerms}
            onCheckedChange={(value) => setField("acceptedTerms", value === true)}
            aria-invalid={Boolean(errors.terms)}
            aria-describedby={errors.terms ? "terms-error" : undefined}
          />
          <Label htmlFor="terms" className="text-sm leading-5 font-normal text-muted-foreground">
            I accept the Terms &amp; Conditions and the Privacy Policy.
          </Label>
        </div>
        <FieldError id="terms-error" message={errors.terms} />
      </div>

      <FormStatus status={status} />

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Creating account…
          </>
        ) : (
          "Create Account"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="rounded-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
