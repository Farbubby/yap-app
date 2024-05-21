"use client";

import { useState } from "react";
import Form from "../../components/form";
import Input from "../../components/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  // Form states
  const [alias, setAlias] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

  const register = async function (e: any) {
    e.preventDefault();

    if (!alias || !username || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ alias, username, password }),
    });

    if (response.ok) {
      const { user, message } = await response.json();
      console.log(user, message);
      setError("");
      router.push("/login");
    } else if (response.status === 409) {
      console.error("Username is taken");
      setError("Username is taken");
    } else {
      console.error("Failed to register user");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-14 bg-gray-950">
        <div className="lg:text-4xl md:text-3xl sm:text-2xl text-xl">
          Welcome to the yap app!
        </div>
        <div className="border border-gray-700 p-6 rounded-lg flex flex-col gap-8 xl:w-2/5 lg:w-1/2 md:w-2/3 sm:w-3/4 w-4/5">
          <div className="sm:text-sm text-xs text-center">
            Register an account to start yapping
          </div>
          <Form submit={register} value={"Register"} errorMessage={error}>
            <Input
              id="alias"
              label="Alias"
              type="text"
              placeholder="Enter an alias"
              setValue={setAlias}
            />
            <Input
              id="username"
              label="Username"
              type="text"
              placeholder="Enter a username"
              setValue={setUsername}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Enter a password"
              setValue={setPassword}
            />
          </Form>
          <div className="sm:text-sm text-xs text-center">
            Already have an account? <Link href="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}
