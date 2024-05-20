"use client";

import { useState } from "react";
import Form from "../../components/form";
import Input from "../../components/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  // Form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [emptyFields, setEmptyFields] = useState(false);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  const router = useRouter();

  const login = async function (e: any) {
    e.preventDefault();

    if (!username || !password) {
      setEmptyFields(true);
      return;
    } else {
      setEmptyFields(false);
    }

    const response = await fetch(
      `/api/login?username=${username}&password=${password}`
    );

    if (response.ok) {
      const { user, session, message } = await response.json();
      console.log(user, session, message);
      router.push("/home");
    } else {
      console.error("Failed to authenticate user");
      setIncorrectCredentials(true);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-14 bg-gray-950">
        <div className="border border-gray-700 p-6 rounded-lg flex flex-col gap-8 xl:w-2/5 lg:w-1/2 md:w-2/3 sm:w-3/4 w-4/5">
          <div className="sm:text-sm text-xs text-center">
            Login to your account
          </div>
          <Form action={login} value="Login">
            <Input
              id="username"
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={username}
              setValue={setUsername}
              error={emptyFields || incorrectCredentials}
              errorMessage={
                emptyFields
                  ? "Please enter your username"
                  : "Incorrect username or password"
              }
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              setValue={setPassword}
              error={emptyFields || incorrectCredentials}
              errorMessage={
                emptyFields
                  ? "Please enter your password"
                  : "Incorrect username or password"
              }
            />
          </Form>
          <div className="sm:text-sm text-xs text-center">
            Do not have an account? <Link href="/register">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}
