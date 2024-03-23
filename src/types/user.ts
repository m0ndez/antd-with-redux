import { z } from "zod";
import { userFormSchema } from "../schemas";

export type UserData = z.infer<typeof userFormSchema>;
