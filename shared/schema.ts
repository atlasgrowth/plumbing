import { z } from "zod";

export const businessDataSchema = z.object({
  basic_info: z.object({
    name: z.string(),
    phone: z.string().optional(),
    city: z.string().optional(),
    rating: z.number().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    working_hours: z.record(z.string(), z.string()).optional(),
  }),
  five_star_reviews: z.array(z.object({
    text: z.string(),
    reviewer_name: z.string(),
    date: z.string(),
  })).optional(),
});

export type BusinessData = z.infer<typeof businessDataSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email().optional(),
  service: z.string(),
  message: z.string().min(10, "Please provide more details"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;
