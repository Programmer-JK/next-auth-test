"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Socials from "./Socials";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      username: email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });
    console.log(result);
  };

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md px-4">
        <h2 className="mb-5 text-3xl font-extrabold text-center">
          Next-Auth Login
        </h2>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-2">
          <input
            name="email"
            placeholder="이메일"
            onChange={onChangeEmail}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={onChangePassword}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
          />
          <button className="w-full py-3 bg-blue-800 text-blue-200rounded-2xl hover:bg-blue-700 text-white rounded-3xl">
            Login
          </button>
        </form>
        <Socials />
      </div>
    </div>
  );
}
