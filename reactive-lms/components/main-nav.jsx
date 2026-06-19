"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";

import Logo from "./logo";
import MobileNav from "./mobile-nav";

import { Menu, X } from "lucide-react";

import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession , signOut } from 'next-auth/react';

const MainNav = ({ items = [] }) => {
  const {data:session} = useSession();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [loginSession, setLoginSession] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        setLoginSession(session);

        async function fetchMe() {
            try {
                const response = await fetch("/api/me");
                const data = await response.json();
                // console.log(data);
                setLoggedInUser(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchMe();

    },[session]);

  return (
    <>
      <div className="flex h-20 w-full items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-10">
          <Link href="/">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {items.map((item) => (
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

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">

          {
            !loginSession && (<>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  }),
                )}
              >
                Login
              </Link>
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

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Link href="/register/student">Student</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Link href="/register/instructor">Instructor</Link>
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
                        src={loggedInUser?.profilePicture}
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

                  {loggedInUser?.role === "instructor" && (
                      <DropdownMenuItem className="cursor-pointer">
                      <Link href='/dashboard'> <strong>Instructor Dashboard</strong> </Link> 
                  </DropdownMenuItem>
                  )}

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

        {/* Mobile Toggle */}
        <button
          onClick={() => setShowMobileMenu((prev) => !prev)}
          className="
            lg:hidden
            rounded-lg
            p-2
            hover:bg-slate-100
            transition
          "
        >
          {showMobileMenu ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <MobileNav items={items} onClose={() => setShowMobileMenu(false)} />
      )}
    </>
  );
};

export default MainNav;
