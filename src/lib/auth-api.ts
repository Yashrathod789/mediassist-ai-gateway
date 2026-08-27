/**
 * Auth API layer (frontend only for now).
 *
 * Later, the team can replace the body of `login` with a real Axios call:
 *
 *   const { data } = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
 *   return data;
 */

export const API_BASE_URL = "https://api.mediassist.example.com";

export type LoginCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginResponse = {
  token: string;
  user: { email: string; name: string };
};

/** Simulated login. No real authentication happens yet. */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (credentials.password.length < 6) {
    throw new Error("Invalid email or password. Please try again.");
  }

  return {
    token: "demo-token",
    user: { email: credentials.email, name: "Demo User" },
  };
}
