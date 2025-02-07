import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React from "react";

const SidebarBottom = () => {
  return (
    <div className="  text-white">
      <h6 className="text-sm pb-1  ">🚀 Available Credits: <span className="text-green-400">5</span></h6>

      <Progress value={30} 
    //   className=" rounded-full transition-all duration-500"
       />

      <p className="text-sm text-gray-300 mt-2">🔹 1 out of 5 credits used</p>

      <Link href="/dashboard/upgrade"
      className="text-blue-700 text-sm"
      >
        {/* <button className="mt-3 w-full text-center hover:bg-green-600 transition-all duration-300 py-2 rounded-md font-semibold"> */}
          Upgrade to Get More 🚀
        {/* </button> */}
      </Link>
    </div>
  );
};

export default SidebarBottom;
