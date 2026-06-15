"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "./ui/button";
import { useLockBody } from '@/hooks/use-lock-body';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const MobileNav = ({ items = [] }) => {

    useLockBody();
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
        <div className="mt-5 border-t pt-5 flex flex-col gap-3">

          <Link
            href="/login"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "default",
              }),
              "w-full"
            )}
          >
            Login
          </Link>

          <DropdownMenu>

            <DropdownMenuTrigger>
                <div
                    className="
                    flex
                    w-full
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
              <DropdownMenuItem asChild>
                <Link href="/register/student">
                  Student
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/register/instructor">
                  Instructor
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>

          </DropdownMenu>

        </div>

      </div>
    </div>
  );
};

export default MobileNav;