"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
}

const MainNav = () => {
  const pathname = usePathname();

  // const routes = data.map((route) => ({
  //   href: `/category/${route.id}`,
  //   label: route.name,
  //   active: pathname === `/category/${route.id}`,
  // }));

  const routes = [
    {
      label: "Home",
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Cateogories",
      href: "/categories",
      active: pathname === "/categories",
    },
    {
      label: "About",
      href: "/about",
      active: pathname === "/about",
    },
    {
      label: "Contact",
      href: "/contact",
      active: pathname === "/contact",
    },
  ];

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
