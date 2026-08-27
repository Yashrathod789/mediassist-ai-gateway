import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — MediAssist AI" },
      {
        name: "description",
        content:
          "Create a MediAssist AI account to access medical report summarization and patient-friendly explanations.",
      },
      { property: "og:title", content: "Create Account — MediAssist AI" },
      {
        property: "og:description",
        content: "Register for the MediAssist AI medical report summarization system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
