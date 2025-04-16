"use client";

import * as z from "zod";

export const starPlanSchema = z.object({
  price: z
    .string({ required_error: "Price is required" })
    .min(1, { message: "Price is required" }),
  stars: z
    .string({ required_error: "Star point is required" })
    .min(1, { message: "Star point is required" }),
  discount_rate: z.string().optional(),
  status: z.string().optional(),
});
