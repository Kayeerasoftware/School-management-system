"use client";

import React, { useState } from "react";
import Image from "next/image";

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function UserButton({ afterSignOutUrl }: { afterSignOutUrl?: string }) {
  const [open, setOpen] = useState(false);

  const setRole = (role: string) => {
    document.cookie = `mock_role=${role}; path=/; max-age=31536000`;
    window.location.href = `/${role}`;
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center focus:outline-none ring-2 ring-purple-300 rounded-full"
        title="Switch user role"
      >
        <Image
          src="/avatar.png"
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full bg-slate-100"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 p-2 text-xs">
          <div className="font-semibold px-2 py-1 text-gray-700 border-b mb-1">
            Switch Role (Mock)
          </div>
          <button
            onClick={() => setRole("admin")}
            className="w-full text-left px-2 py-1.5 hover:bg-lamaSkyLight rounded flex items-center justify-between"
          >
            <span>Admin</span>
            <span className="text-[10px] text-gray-400">/admin</span>
          </button>
          <button
            onClick={() => setRole("teacher")}
            className="w-full text-left px-2 py-1.5 hover:bg-lamaPurpleLight rounded flex items-center justify-between"
          >
            <span>Teacher</span>
            <span className="text-[10px] text-gray-400">/teacher</span>
          </button>
          <button
            onClick={() => setRole("student")}
            className="w-full text-left px-2 py-1.5 hover:bg-lamaYellowLight rounded flex items-center justify-between"
          >
            <span>Student</span>
            <span className="text-[10px] text-gray-400">/student</span>
          </button>
          <button
            onClick={() => setRole("parent")}
            className="w-full text-left px-2 py-1.5 hover:bg-lamaSkyLight rounded flex items-center justify-between"
          >
            <span>Parent</span>
            <span className="text-[10px] text-gray-400">/parent</span>
          </button>
        </div>
      )}
    </div>
  );
}

export function useUser() {
  return {
    isLoaded: true,
    isSignedIn: true,
    user: {
      id: "admin1",
      firstName: "Admin",
      lastName: "User",
      imageUrl: "/avatar.png",
      publicMetadata: {
        role: "admin",
      },
    },
  };
}

export function useAuth() {
  return {
    isLoaded: true,
    isSignedIn: true,
    userId: "admin1",
    sessionId: "mock-session-id",
  };
}

export function SignedIn({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  return null;
}

export const SignIn = {
  Root: ({ children }: any) => <div>{children}</div>,
  Step: ({ children, className }: any) => <div className={className}>{children}</div>,
  Field: ({ children, className }: any) => <div className={className}>{children}</div>,
  Label: ({ children, className }: any) => <label className={className}>{children}</label>,
  Input: (props: any) => <input {...props} />,
  FieldError: () => null,
  Action: ({ children, className }: any) => <button className={className}>{children}</button>,
};
