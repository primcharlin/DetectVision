export type DemoRequest = {
  name: string;
  email: string;
  phone?: string;
  business?: string;
  interests: string[];
  plan?: string;
  message?: string;
};

export const interestOptions = ["D-Vision", "D-Voice", "D-ROBOT", "D-Camera", "Free business analysis"] as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\-.\s\d]{7,20}$/;

/** Shared by the form (instant feedback) and the API route (never trust the client). */
export function validateDemoRequest(input: Partial<DemoRequest>): Partial<Record<keyof DemoRequest, string>> {
  const errors: Partial<Record<keyof DemoRequest, string>> = {};
  if (!input.name?.trim()) errors.name = "Enter your full name.";
  if (!input.email?.trim()) errors.email = "Enter a valid email address.";
  else if (!emailPattern.test(input.email.trim())) errors.email = "Enter a valid email address, like name@business.com.";
  if (input.phone?.trim() && !phonePattern.test(input.phone.trim())) errors.phone = "Enter a valid phone number.";
  if ((input.message?.length ?? 0) > 2000) errors.message = "Keep your message under 2,000 characters.";
  return errors;
}
