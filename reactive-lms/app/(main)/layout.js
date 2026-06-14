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