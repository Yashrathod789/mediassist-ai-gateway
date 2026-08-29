import { useState } from "react";
import { Loader as Loader2, Mail, Phone, Building2, Stethoscope, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/auth/FieldError";
import { FormStatus, type Status } from "@/components/auth/FormStatus";
import { updateProfile, validateProfile, type ProfileErrors, type ProfileUpdates } from "@/lib/profile-api";

type ProfileFormProps = {
  initial: ProfileUpdates;
  onSaved: (updates: ProfileUpdates) => void;
};

export function ProfileForm({ initial, onSaved }: ProfileFormProps) {
  const [values, setValues] = useState<ProfileUpdates>(initial);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [status, setStatus] = useState<Status | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function setField<K extends keyof ProfileUpdates>(key: K, value: ProfileUpdates[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateProfile(values);
    setErrors(nextErrors);
    setStatus(null);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await updateProfile(values);
      onSaved(values);
      setStatus({ type: "success", message: "Profile updated successfully." });
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
        <Label htmlFor="role">Role</Label>
        <div className="relative">
          <Stethoscope
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="role"
            name="role"
            className="pl-9"
            value={values.role}
            onChange={(e) => setField("role", e.target.value)}
            aria-invalid={Boolean(errors.role)}
            aria-describedby={errors.role ? "role-error" : undefined}
          />
        </div>
        <FieldError id="role-error" message={errors.role} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="organisation">Organisation</Label>
        <div className="relative">
          <Building2
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="organisation"
            name="organisation"
            className="pl-9"
            value={values.organisation}
            onChange={(e) => setField("organisation", e.target.value)}
            aria-invalid={Boolean(errors.organisation)}
            aria-describedby={errors.organisation ? "organisation-error" : undefined}
          />
        </div>
        <FieldError id="organisation-error" message={errors.organisation} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone number</Label>
        <div className="relative">
          <Phone
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="phone"
            name="phone"
            autoComplete="tel"
            className="pl-9"
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </div>
        <FieldError id="phone-error" message={errors.phone} />
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
            readOnly
            className="pl-9 bg-muted/40 text-muted-foreground"
            value={initial.email}
            aria-readonly
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Email cannot be changed from this prototype. Contact an administrator if it needs updating.
        </p>
      </div>

      <FormStatus status={status} />

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Saving changes…
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
}
