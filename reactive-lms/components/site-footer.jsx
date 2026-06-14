import React from "react";
import Logo from "./logo";
import Link from "next/link";

const SiteFooter = () => {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto max-w-7xl px-6">

        <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row">

          {/* Logo + Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Logo />

            <p className="text-sm text-slate-500">
              © 2026 Reactive Learning. All rights reserved.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-600">

            <Link
              href="/about"
              className="hover:text-blue-600 transition-colors"
            >
              About
            </Link>

            <Link
              href="/courses"
              className="hover:text-blue-600 transition-colors"
            >
              Courses
            </Link>

            <Link
              href="/contact"
              className="hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/privacy-policy"
              className="hover:text-blue-600 transition-colors"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="hover:text-blue-600 transition-colors"
            >
              Terms
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default SiteFooter;