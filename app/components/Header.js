"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "../_contexts/UserContext";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const handleNavigate = (path) => {
    setIsNavOpen(false);
    router.push(path);
  };
  return (
    <header className="bg-dark-green flex justify-between items-center text-white pl-4 pr-8 sticky top-0 z-10">
      <Link href="/">
        <Image
          src="/logo.png"
          height="68"
          width="68"
          alt="Habit Quest logo"
          priority
        />
      </Link>
      <button onClick={() => setIsNavOpen(!isNavOpen)}>
        <i className="fa fa-bars" title="Toggle Menu" />
      </button>
      <nav
        aria-label="Primary Navigation"
        className={`${
          isNavOpen
            ? "bg-dark-green flex flex-col items-end absolute top-16 left-0 w-full px-8 py-2 "
            : "hidden"
        } `}
      >
        <button
          onClick={(e) => handleNavigate("/")}
          className="pb-2 hover:text-yellow"
        >
          Home
        </button>
        <button
          onClick={(e) => handleNavigate("/about")}
          className="py-2 hover:text-yellow"
        >
          About
        </button>
        {!user?.username && (
          <>
            <button
              onClick={(e) => handleNavigate("/sign-in")}
              className="py-2 hover:text-yellow"
            >
              Sign In
            </button>
            <button
              onClick={(e) => handleNavigate("/sign-up")}
              className="py-2 hover:text-yellow"
            >
              Sign Up
            </button>
          </>
        )}
        {user?.username && (
          <button
            onClick={() => {
              setUser(null);
              handleNavigate("/");
            }}
            className="py-2 hover:text-yellow"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
