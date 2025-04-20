import { z } from "zod";

// Asset creation schema (fields user provides)
export const assetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,8})?$/, "Amount must be a number with up to 8 decimals"),
  avg_pricing: z
    .string()
    .regex(/^\d+(\.\d{1,8})?$/, "Average pricing must be a number with up to 8 decimals"),
  current_pricing: z
    .string()
    .regex(/^\d+(\.\d{1,8})?$/, "Current pricing must be a number with up to 8 decimals"),
  unit: z.string().min(1, "Unit is required"),
  purchaseDate: z
    .string()
    .datetime({ message: "Purchase date must be a valid ISO date string" }),
  notes: z.string().optional(),
});

// For edit/update, all fields except name/type/unit can be optional
export const assetUpdateSchema = assetSchema.partial().extend({
  name: z.string().min(1, "Name is required").optional(),
  type: z.string().min(1, "Type is required").optional(),
  unit: z.string().min(1, "Unit is required").optional(),
});
