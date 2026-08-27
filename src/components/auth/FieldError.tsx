/** Inline validation message for a form field. */
export function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}
