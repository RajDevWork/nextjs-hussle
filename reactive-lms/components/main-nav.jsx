"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./logo";

const MainNav = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between w-full">

        {/* Logo */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {items?.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">

          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get Started →
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
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
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b shadow-lg">

          <div className="container py-6 flex flex-col gap-5">

            {items?.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                {item.title}
              </Link>
            ))}

            <div className="flex flex-col gap-3 pt-4 border-t">

              <Link
                href="/login"
                className="text-center rounded-lg border px-4 py-3 text-sm font-medium"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="text-center rounded-lg bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-4 py-3 text-sm font-semibold text-white"
              >
                Get Started
              </Link>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default MainNav;