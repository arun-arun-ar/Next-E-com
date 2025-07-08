"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setStatus("error");
        return;
      }
      try {
        const res = await fetch(`/api/auth/verify?token=${token}`);
        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };
    verify();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {status === "verifying" && <p>Verifying your email...</p>}
      {status === "success" && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your email has been successfully verified!</h1>
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push("/login")}
          >
            Proceed to Login
          </button>
        </div>
      )}
      {status === "error" && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Verification failed or link is invalid.</h1>
        </div>
      )}
    </div>
  );
}
