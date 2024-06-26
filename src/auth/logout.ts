"use server";

import { lucia } from "@/auth/lucia";
import { cookies } from "next/headers";
import { validateRequest } from "@/auth/validate";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const { session } = await validateRequest();

  if (!session) {
    return {
      authError: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/login");
}
