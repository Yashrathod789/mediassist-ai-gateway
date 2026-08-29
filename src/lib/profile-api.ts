/**
 * Profile data layer (frontend prototype only).
 *
 * All values below are FICTIONAL placeholders for the academic prototype.
 * Later these functions can be swapped for real Axios calls, e.g.:
 *
 *   const { data } = await axios.get(`${API_BASE_URL}/profile`);
 *   return data;
 */

export type UserProfile = {
  fullName: string;
  email: string;
  role: string;
  organisation: string;
  phone: string;
};

export type ProfileUpdates = {
  fullName: string;
  role: string;
  organisation: string;
  phone: string;
};

const DEMO_PROFILE: UserProfile = {
  fullName: "Demo User",
  email: "demo@mediassist.ai",
  role: "Student Researcher",
  organisation: "TY BCA — NLP Project",
  phone: "+91 90000 00000",
};

export async function getProfile(): Promise<UserProfile> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ...DEMO_PROFILE };
}

export async function updateProfile(updates: ProfileUpdates): Promise<UserProfile> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { ...DEMO_PROFILE, ...updates };
}

const PHONE_PATTERN = /^[+\d][\d\s-]{6,}$/;

export type ProfileErrors = {
  fullName?: string;
  role?: string;
  organisation?: string;
  phone?: string;
};

export function validateProfile(updates: ProfileUpdates): ProfileErrors {
  const errors: ProfileErrors = {};

  if (!updates.fullName.trim()) errors.fullName = "Full name is required.";
  else if (updates.fullName.trim().length < 3)
    errors.fullName = "Full name must be at least 3 characters.";

  if (!updates.role.trim()) errors.role = "Role is required.";

  if (!updates.organisation.trim()) errors.organisation = "Organisation is required.";

  if (!updates.phone.trim()) errors.phone = "Phone number is required.";
  else if (!PHONE_PATTERN.test(updates.phone.trim()))
    errors.phone = "Enter a valid phone number (digits, spaces, + and - only).";

  return errors;
}
