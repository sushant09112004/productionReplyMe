import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'), // Validates email format
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long') // Enforces minimum length
    .max(128, 'Password must be less than 128 characters'), // Optional: Adds a maximum length
});
