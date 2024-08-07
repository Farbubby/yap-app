import { redirect } from "next/navigation";
import Home from "./home";
import { validateRequest } from "@/auth/validate";
import PostList from "@/components/post-list";

export default async function HomePage() {
  const { user, session } = await validateRequest();

  if (!user || !session) {
    redirect("/login");
  }

  return (
    <>
      <Home user={user}>
        <PostList />
      </Home>
    </>
  );
}
