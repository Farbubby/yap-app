import { logout } from "@/auth/logout";
import { User } from "lucia";
import Navbar from "@/components/navbar";

interface HomeProps {
  user: User;
}

export default function Home({ user }: HomeProps) {
  return (
    <>
      <Navbar />
      <div>
        You logged in {user.id} {user.alias} {user.username} yay!!!
      </div>
      <form action={logout}>
        <button>Logout</button>
      </form>
    </>
  );
}
