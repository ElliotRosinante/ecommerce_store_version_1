import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto py-10">
        <Link href="/">
          <p className="text-center text-xs text-black my-2">
            Visit admin site
          </p>
        </Link>
        <p className="text-center text-xs text-black">
          &copy; 2023 Store, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
