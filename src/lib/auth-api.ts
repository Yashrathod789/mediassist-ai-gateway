/**
 * Auth API layer (frontend only for now).
 *
 * Later, the team can replace the body of these functions with real Axios calls:
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

export type RegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type AuthUser = { email: string; name: string };

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export type LoginResponse = AuthResponse;

/** Simulated login. No real authentication happens yet. */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (credentials.password.length < 6) {
    throw new Error("Invalid email or password. Please try again.");
  }

  return {
    token: "demo-token",
    user: { email: credentials.email, name: "Demo User" },
  };
}

/** Simulated registration. No account is actually created yet. */
export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    token: "demo-token",
    user: { email: payload.email, name: payload.fullName },
  };
}
