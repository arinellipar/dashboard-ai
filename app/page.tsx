"use client";

import AuthForm from "@/components/auth-form";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <button
        onClick={() => router.push("/admin/login")}
        className="fixed top-4 right-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg animate-pulse z-10"
      >
        <Shield className="w-4 h-4" />
        Admin Panel
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
        </span>
      </button>
      <AuthForm />
    </div>
  );
}
