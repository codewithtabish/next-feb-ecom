"use client";

import React from "react";

const Loader = () => {
  return (
    <div className="fixed min-h-screen w-[calc(100%-16rem)] flex justify-center items-center left-64 top-0 z-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
  </div>
  );
};

export default Loader;
