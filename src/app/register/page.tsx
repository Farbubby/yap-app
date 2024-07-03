import RegisterForm from "../../components/form/register-form";

export default function RegisterPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-14 bg-gray-950">
        <div className="lg:text-4xl md:text-3xl sm:text-2xl text-xl">
          Welcome to the yap app!
        </div>
        <RegisterForm />
      </div>
    </>
  );
}
