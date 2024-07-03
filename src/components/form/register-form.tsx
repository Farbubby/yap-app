"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { registerAction } from "@/auth/register";

export default function RegisterForm() {
  const [error, register] = useFormState(registerAction, null);
  return (
    <>
      <div className="border border-gray-700 p-6 rounded-lg flex flex-col gap-8 xl:w-2/5 lg:w-1/2 md:w-2/3 sm:w-3/4 w-4/5">
        <div className="sm:text-sm text-xs text-center">
          Register an account to start yapping
        </div>
        <form action={register} className="flex flex-col gap-3">
          {error?.serverError && (
            <div className="text-red-500 text-sm">{error.serverError}</div>
          )}
          <label htmlFor="alias" className="text-xs">
            Alias
          </label>
          <input
            id="alias"
            name="alias"
            type="text"
            className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
            placeholder="Alias"
          />
          {error?.fieldError?.alias && (
            <div className="text-red-500 text-sm">{error.fieldError.alias}</div>
          )}
          <label htmlFor="username" className="text-xs">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
            placeholder="Username"
          />
          {error?.fieldError?.username && (
            <div className="text-red-500 text-sm">
              {error.fieldError.username}
            </div>
          )}
          <label htmlFor="password" className="text-xs">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
            placeholder="Password"
          />
          {error?.fieldError?.password && (
            <div className="text-red-500 text-sm">
              {error.fieldError.password}
            </div>
          )}
          <input
            type="submit"
            value="Register"
            className="rounded-lg bg-gray-900 text-white py-1 hover:bg-gray-800 cursor-pointer"
          />
        </form>
        <div className="sm:text-sm text-xs text-center">
          Already have an account? <Link href="/login">Login</Link>
        </div>
      </div>
    </>
  );
}
