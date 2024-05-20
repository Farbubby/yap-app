"use server";

import { validateRequest } from "./validate";
import { lucia } from "./lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async function () {
  const { session } = await validateRequest();

  if (!session) {
    return { error: "No session found" };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  redirect("/login");
};
