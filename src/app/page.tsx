"use client";

import { useState } from "react";

export default function Home() {
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
      const user = await response.json();
      console.log(user);
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
          <form onSubmit={(e) => register(e)} className="flex flex-col gap-3">
            {emptyFields && (
              <div className="text-red-500 text-xs">
                Please fill in all fields
              </div>
            )}
            <label className="text-xs">Alias</label>
            <input
              id="alias"
              type="text"
              className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
              onChange={(e) => setAlias(e.target.value)}></input>
            <label className="text-xs">Username</label>
            <input
              id="username"
              type="text"
              className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameExists(false);
              }}></input>
            {usernameExists && (
              <div className="text-red-500 text-xs">Username is taken</div>
            )}
            <label className="text-xs">Password</label>
            <input
              id="password"
              type="password"
              className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
              onChange={(e) => setPassword(e.target.value)}></input>
            {shortPassword && (
              <div className="text-red-500 text-xs">
                Password must be at least 8 characters long
              </div>
            )}
            <input
              type="submit"
              value="Register"
              className="rounded-lg bg-gray-900 text-white py-1 hover:bg-gray-800 cursor-pointer"></input>
          </form>
          <div className="sm:text-sm text-xs text-center">
            Already have an account? Sign in
          </div>
        </div>
      </div>
    </>
  );
}
