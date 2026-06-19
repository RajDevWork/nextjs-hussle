"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from 'react';
import { Button, buttonVariants } from "./ui/button";
import { useLockBody } from '@/hooks/use-lock-body';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession , signOut } from 'next-auth/react';

const MobileNav = ({ items = [] }) => {

    useLockBody();
    useLockBody(); 

    const {data:session} = useSession();
    const [loginSession, setLoginSession] = useState(null);
    useEffect(() => {
        // console.log("Test information");
        setLoginSession(session);
    },[session]);


  return (
    <div
      className={cn(
        "fixed inset-0 top-20 z-50 h-[calc(100vh-5rem)] overflow-auto bg-white px-6 py-6 lg:hidden"
      )}
    >
      <div className="rounded-xl border bg-white p-4 shadow-lg">

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-600",
                item.disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* CTA Section */}
        <div className="mt-5 border-t pt-5 flex gap-3">

          {
            !loginSession && (
              <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "default",
                  }),
                  "flex-1 py-2 px-4"

                )}
              >
                Login
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger >
                  <div
                    className="
                      flex
                      flex-1
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-md
                      bg-gradient-to-r
                      from-blue-600
                      via-violet-600
                      to-fuchsia-600
                      px-4
                      py-2
                      font-medium
                      text-white
                    "
                  >
                    Register
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem >
                    <Link href="/register/student">
                      Student
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem >
                    <Link href="/register/instructor">
                      Instructor
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </>
            )
          }
          {
            loginSession && (
              <>
                {/* Avatar Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="cursor-pointer">
                    <Avatar className="ring-2 ring-slate-200 hover:ring-blue-500 transition">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Profile"
                      />
                      <AvatarFallback>RL</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Link href="/account">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link href="/account/enrolled-courses">My Courses</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link href="/account/certificates">Certificates</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link href="/logout" onClick={(e) => {e.preventDefault(); signOut(); }}>Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </>
            )
          }

          

        </div>

      </div>
    </div>
  );
};

export default MobileNav;