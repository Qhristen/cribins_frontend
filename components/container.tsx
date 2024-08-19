"use client";

import React from "react";

export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto my-auto max-w-4xl px-4 sm:px-6 xl:max-w-6xl xl:px-0">
      {children}
    </div>
  );
}
