import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";

const Navbar = async () => {
  // const categories = await getCategories();

  return (
    <div className="shadow-sm sticky top-0 z-50 bg-white">
      <div className="relative px-6 sm:px-8 lg:px-10 flex-row flex h-16 items-center justify-between">
        <Link href="/">
          {/* <p className="font-bold text-xl">STORE</p> */}
          <img src="/logo2.png" alt="logo" className="w-36 h-28 mt-2" />
        </Link>
        {/* <MainNav data={categories} /> */}
        <MainNav />
        <NavbarActions />
      </div>
    </div>
  );
};

export default Navbar;
