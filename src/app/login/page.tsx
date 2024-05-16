"use client";

import { useState } from "react";

export default function LoginPage() {
  // Form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [emptyFields, setEmptyFields] = useState(false);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  const login = async function (e: { preventDefault: () => void }) {
    e.preventDefault();

    if (!username || !password) {
      setEmptyFields(true);
      return;
    } else {
      setEmptyFields(false);
    }

    const response = await fetch(
      `/api/users?username=${username}&password=${password}`
    );

    if (response.ok) {
      const user = await response.json();
      console.log(user, "Logged in");
      setIncorrectCredentials(false);
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
          <form onSubmit={(e) => login(e)} className="flex flex-col gap-3">
            {emptyFields && (
              <div className="text-red-500 text-xs">
                Please fill in all fields
              </div>
            )}
            {incorrectCredentials && (
              <div className="text-red-500 text-xs">
                Username or password is incorrect
              </div>
            )}
            <label className="text-xs">Username</label>
            <input
              id="username"
              type="text"
              className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
              onChange={(e) => {
                setUsername(e.target.value);
              }}></input>
            <label className="text-xs">Password</label>
            <input
              id="password"
              type="password"
              className="rounded-lg bg-gray-950 border-gray-700 border py-1 px-2 hover:bg-gray-900"
              onChange={(e) => setPassword(e.target.value)}></input>
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
