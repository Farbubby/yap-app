"use server";

import { getUserByUsername } from "@/db/users";
import { lucia } from "@/auth/lucia";
import { cookies } from "next/headers";
import { Scrypt } from "lucia";
import { z } from "zod";
import { redirect } from "next/navigation";

const LoginSchema = z.object({
  username: z.string().min(1, "A username is required"),
  password: z.string().min(1, "A password is required"),
});

export async function loginAction(_: unknown, formData: FormData) {
  const userInput = Object.fromEntries(formData.entries());
  const parsed = LoginSchema.safeParse(userInput);

  if (!parsed.success) {
    const error = parsed.error.flatten();

    return {
      fieldError: {
        username: error.fieldErrors.username?.[0],
        password: error.fieldErrors.password?.[0],
      },
    };
  }

  const { username, password } = parsed.data;

  const user = await getUserByUsername(username);

  if (!user) {
    return {
      authError: "Invalid credentials",
    };
  }

  const isCorrectPassword = await new Scrypt().verify(user.password, password);

  if (!isCorrectPassword) {
    return {
      authError: "Invalid credentials",
    };
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/home");
}
