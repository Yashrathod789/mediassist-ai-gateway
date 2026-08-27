import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — MediAssist AI" },
      {
        name: "description",
        content:
          "Sign in to MediAssist AI, an NLP and deep learning system for medical report summarization and patient-friendly explanations.",
      },
      { property: "og:title", content: "Login — MediAssist AI" },
      {
        property: "og:description",
        content: "Secure sign-in for the MediAssist AI medical report summarization system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
