import { redirect } from "next/navigation";
import Home from "./home";
import { validateUser } from "@/auth/validate";

export default async function HomePage() {
  const { user, session } = await validateUser();

  if (!user || !session) {
    redirect("/login");
  }

  return (
    <>
      <Home userAlias={user.alias} userName={user.username} />
    </>
  );
}
