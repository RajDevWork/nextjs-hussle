import React from "react";
import Logo from "./logo";
import Link from "next/link";

const SiteFooter = ({ items }) => {
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


            {items?.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              {item.title}
            </Link>
          ))}

          </div>

        </div>

      </div>
    </footer>
  );
};

export default SiteFooter;