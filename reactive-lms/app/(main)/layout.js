import MainNav from "@/components/main-nav";
import SiteFooter from "@/components/site-footer";
import Link from "next/link";

const navLinks = [
  {
    title: "Courses",
    href: "/courses",
  },
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Documentation",
    href: "/documentation",
  },
];

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-xl">

        <div className="container mx-auto max-w-7xl px-6">

          <div className="flex h-20 items-center justify-between">

            <MainNav items={navLinks} />

            {/* Right Actions */}
            <div className="flex items-center gap-3">

            <Link
                href="/login"
                className="
                hidden
                sm:flex
                items-center
                rounded-full
                px-4
                py-2
                text-sm
                font-medium
                text-slate-600
                transition-all
                duration-300
                hover:bg-slate-100
                hover:text-slate-900
                "
            >
                Sign In
            </Link>

            <Link
                href="/register"
                className="
                group
                relative
                inline-flex
                items-center
                gap-2
                overflow-hidden
                rounded-full
                bg-gradient-to-r
                from-blue-600
                via-violet-600
                to-fuchsia-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-[0_10px_40px_rgba(99,102,241,0.35)]
                "
            >
                Get Started

                <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                />
                </svg>
            </Link>

            </div>

          </div>

        </div>

      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        {children}
      </main>

      {/* Footer */}
      <SiteFooter />

    </div>
  );
};

export default Layout;