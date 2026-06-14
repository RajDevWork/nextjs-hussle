"use client";

import { useState } from "react";
import Link from "next/link";

import Logo from "./logo";

import { Menu, X } from "lucide-react";

import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";

const MainNav = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex h-20 w-full items-center justify-between">
        
        {/* Left Side */}
        <div className="flex items-center gap-10">

          <Link href="/">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {items?.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  relative
                  text-sm
                  font-medium
                  text-slate-600
                  transition-colors
                  hover:text-blue-600
                  after:absolute
                  after:left-0
                  after:-bottom-1
                  after:h-[2px]
                  after:w-0
                  after:bg-blue-600
                  after:transition-all
                  hover:after:w-full
                "
              >
                {item.title}
              </Link>
            ))}
          </nav>

        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">

          <Link
            href="/login"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
              })
            )}
          >
            Login
          </Link>

          {/* Register Dropdown */}
          <DropdownMenu>

            <DropdownMenuTrigger>
              <div
                className="
                  inline-flex
                  h-9
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-md
                  bg-gradient-to-r
                  from-blue-600
                  via-violet-600
                  to-fuchsia-600
                  px-4
                  text-sm
                  font-medium
                  text-white
                  shadow-md
                  transition-all
                  hover:opacity-90
                "
              >
                Register
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 mt-2"
            >
              <DropdownMenuItem>
                <Link href="/register/student">
                  Student
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/register/instructor">
                  Instructor
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>

          </DropdownMenu>

          {/* User Menu */}
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

            <DropdownMenuContent
              align="end"
              className="w-56 mt-2"
            >
              <DropdownMenuItem>
                <Link href="/account">
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/account/enrolled-courses">
                  My Courses
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/account/certificates">
                  Certificates
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/logout">
                  Logout
                </Link>
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            md:hidden
            rounded-lg
            p-2
            hover:bg-slate-100
            transition
          "
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="
            absolute
            left-0
            right-0
            top-20
            z-50
            border-b
            bg-white
            shadow-lg
            md:hidden
          "
        >
          <div className="container py-6">

            <div className="flex flex-col gap-5">

              {items?.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="
                    text-sm
                    font-medium
                    text-slate-700
                    hover:text-blue-600
                  "
                >
                  {item.title}
                </Link>
              ))}

              <div className="mt-2 border-t pt-4 flex flex-col gap-3">

                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="
                    rounded-xl
                    border
                    py-3
                    text-center
                    font-medium
                    hover:bg-slate-50
                  "
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    via-violet-600
                    to-fuchsia-600
                    py-3
                    text-center
                    font-semibold
                    text-white
                  "
                >
                  Get Started
                </Link>

              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default MainNav;