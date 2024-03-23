import { z } from "zod";

const requiredString = z.string().min(1, {
  message: "required",
});

export const userFormSchema = z.object({
  key: requiredString,
  namePrefix: requiredString,
  firstName: requiredString,
  lastName: requiredString,
  dob: requiredString,
  nationality: requiredString,
  citizenId: requiredString.min(13, {
    message: "required",
  }),
  sex: requiredString,
  phoneNumber: requiredString
    .refine(
      (value) =>
        (value.startsWith("0") && value.length === 10) ||
        (!value.startsWith("0") && value.length === 9),
      {
        message: "required",
      }
    )
    .transform((value) => (value.startsWith("0") ? value.substring(1) : value)),
  countryCode: requiredString,
  passportNumber: z.string().optional(),
  expectedSalary: requiredString,
});
