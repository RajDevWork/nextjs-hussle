import Link from "next/link";
import Logo from "./logo";

const MainNav = ({ items }) => {
  return (
    <div className="flex items-center gap-12">

      {/* Logo */}
      <Link href="/">
        <Logo />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {items?.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
          >
            {item.title}
          </Link>
        ))}
      </nav>

    </div>
  );
};

export default MainNav;