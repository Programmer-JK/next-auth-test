"use client";
import LoginForm from "@/components/form/LoginForm";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={() => router.back()}
    >
      {/* 모달 컨텐츠 */}
      <div className="bg-white p-6 rounded-lg" onClick={onClickClose}>
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">로그인</h2>
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
