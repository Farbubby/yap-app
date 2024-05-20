import Login from "./login";
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth/validate";

export default async function LoginPage() {
  const { session } = await validateRequest();

  if (session) {
    redirect("/home");
  }

  return (
    <>
      <Login />
    </>
  );
}
