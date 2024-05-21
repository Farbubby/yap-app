import { User } from "lucia";
import Navbar from "@/components/navbar";

interface HomeProps {
  user: User;
}

export default function Home({ user }: HomeProps) {
  return (
    <>
      <div className="bg-gray-950 h-screen">
        <Navbar />
        <div>
          You logged in {user.id} {user.alias} {user.username} yay!!!
        </div>
      </div>
    </>
  );
}
