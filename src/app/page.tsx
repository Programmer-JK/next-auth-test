"use client";
import LoginForm from "@/components/form/LoginForm";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2 className="mb-5 text-3xl font-extrabold text-center">
          Next-Auth Login
        </h2>
        <div className="space-y-2">
          <h1 className="text-lg font-medium">지금 가입하세요.</h1>
          <Link
            href="/signup"
            className="block bg-blue-800 text-blue-200 text-center py-1 rounded-2xl hover:bg-blue-700"
          >
            계정 만들기
          </Link>
          {/* <LoginForm /> */}
          {session && session.user ? (
            <>
              <h3>{session.user.name}님 안녕하세요!</h3>
              <button
                className="w-full bg-blue-800 text-blue-200 py-1 rounded-2xl hover:bg-blue-700"
                onClick={() => signOut()}
              >
                로그아웃하기
              </button>
            </>
          ) : (
            <>
              <h3 className="text-base mt-4">이미 가입하셨나요?</h3>
              <button
                className="w-full bg-blue-800 text-blue-200 py-1 rounded-2xl hover:bg-blue-700"
                onClick={() => signIn()}
              >
                로그인하기
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
