"use client";

import { useRouter } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Go back"
      className="mx-10 py-5 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
    >
      <ArrowBigLeft className="w-10 h-8 cursor-pointer hover:opacity-80 transition-transform transform hover:scale-105" />
      <span className="hidden sm:inline text-lg font-medium">Back</span>
    </button>
  );
};

export default BackButton;
