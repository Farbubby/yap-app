import LoginForm from "../../components/login-form";
import { redirect } from "next/navigation";
import { validateRequest } from "@/auth/validate";

export default async function LoginPage() {
  const { session } = await validateRequest();

  if (session) {
    redirect("/home");
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-14 bg-gray-950">
        <LoginForm />
      </div>
    </>
  );
}
