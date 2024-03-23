import { z } from "zod";

export const userFormSchema = z.object({
  key: z.string(),
  namePrefix: z.string().min(1, {
    message: "required",
  }),
  firstName: z.string().min(1, {
    message: "required",
  }),
  lastName: z.string().min(1, {
    message: "required",
  }),
  dob: z.string().min(1, {
    message: "required",
  }),
  nationality: z.string().min(1, {
    message: "required",
  }),
  citizenId: z.string().min(13, {
    message: "required",
  }),
  sex: z.string().min(1, {
    message: "required",
  }),
  phoneNumber: z
    .string()
    .min(1, {
      message: "required",
    })
    .refine(
      (value) =>
        (value.startsWith("0") && value.length === 10) ||
        (!value.startsWith("0") && value.length === 9),
      {
        message: "required",
      }
    ),
  countryCode: z.string().min(1, {
    message: "required",
  }),
  passportNumber: z.string().optional(),
  expectedSalary: z.string().min(1, {
    message: "required",
  }),
});
