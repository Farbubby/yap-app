"use client";

import { useState } from "react";
import Form from "../../components/form";
import Input from "../../components/input";

export default function Register() {
  // Form states
  const [alias, setAlias] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [emptyFields, setEmptyFields] = useState(false);
  const [shortPassword, setShortPassword] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);

  const register = async function (e: { preventDefault: () => void }) {
    e.preventDefault();

    if (!alias || !username || !password) {
      setEmptyFields(true);
      return;
    } else {
      setEmptyFields(false);
    }

    if (password.length < 8) {
      setShortPassword(true);
      return;
    } else {
      setShortPassword(false);
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ alias, username, password }),
    });

    if (response.ok) {
      const { user, message } = await response.json();
      console.log(user, message);
      setUsernameExists(false);
    } else if (response.status === 409) {
      console.error("Username is taken");
      setUsernameExists(true);
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
          <Form action={register} value={"Register"}>
            <Input
              id="alias"
              label="Alias"
              type="text"
              placeholder="Enter your alias"
              value={alias}
              setValue={setAlias}
              error={false || emptyFields}
              errorMessage={emptyFields ? "Please enter an alias" : ""}
            />
            <Input
              id="username"
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={username}
              setValue={setUsername}
              error={usernameExists || emptyFields}
              errorMessage={
                emptyFields ? "Please enter a username" : "Username is taken"
              }
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              setValue={setPassword}
              error={shortPassword || emptyFields}
              errorMessage={
                emptyFields
                  ? "Please enter a password"
                  : "Password must be at least 8 characters long"
              }
            />
          </Form>
          <div className="sm:text-sm text-xs text-center">
            Already have an account? Login
          </div>
        </div>
      </div>
    </>
  );
}
