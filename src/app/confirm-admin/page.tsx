"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ConfirmAdminContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">
      {status === "success" && (
        <>
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Admin Access Confirmed
          </h1>
          <p className="text-gray-700 mb-6">
            You’ve successfully accepted admin priviledges on the CBT Platform.
          </p>
          <a
            href="https://cbt-app-gamma.vercel.app/auth/sign-in"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Log In to Continue
          </a>
        </>
      )}

      {status === "notfound" && (
        <>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Invalid Link</h1>
          <p className="text-gray-700 mb-6">
            This admin confirmation link has expired or is invalid.
          </p>
        </>
      )}

      {status === "invalid" && (
        <>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Missing Token</h1>
          <p className="text-gray-700 mb-6">
            Your link doesn’t include a valid confirmation token.
          </p>
        </>
      )}
    </div>
  );
}

export default function ConfirmAdminPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <ConfirmAdminContent />
    </Suspense>
  );
}
