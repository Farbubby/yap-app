import { redirect } from "next/navigation";
import Home from "./home";
import { validateRequest } from "@/auth/validate";
import { logout } from "@/auth/logout";

export default async function HomePage() {
  const { user, session } = await validateRequest();

  if (!user || !session) {
    redirect("/login");
  }

  return (
    <>
      <Home userId={user.id} userAlias={user.alias} userName={user.username} />
      <form action={logout}>
        <button>Logout</button>
      </form>
    </>
  );
}
