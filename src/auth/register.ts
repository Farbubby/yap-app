"use server";

import { createUser, getUserByUsername } from "@/db/users";
import { z } from "zod";
import { Scrypt } from "lucia";
import { redirect } from "next/navigation";

const RegisterSchema = z.object({
  alias: z.string().min(1, "An alias is required"),
  username: z.string().min(1, "A username is required"),
  password: z
    .string()
    .min(1, "A password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export async function registerAction(_: unknown, formData: FormData) {
  const userInput = Object.fromEntries(formData.entries());
  const parsed = RegisterSchema.safeParse(userInput);

  if (!parsed.success) {
    const error = parsed.error.flatten();

    return {
      fieldError: {
        alias: error.fieldErrors.alias?.[0],
        username: error.fieldErrors.username?.[0],
        password: error.fieldErrors.password?.[0],
      },
    };
  }

  const { alias, username, password } = parsed.data;

  const existingUser = await getUserByUsername(username);

  if (existingUser) {
    return {
      fieldError: {
        username: "Username is already taken",
      },
    };
  }

  const hashedPassword = await new Scrypt().hash(password);

  const user = await createUser(alias, username, hashedPassword);

  if (!user) {
    return {
      unexpectedError: "An unexpected error occurred.",
    };
  }

  return redirect("/login");
}
