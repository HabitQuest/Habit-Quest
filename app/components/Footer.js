import Link from "next/link";
import { balthazar } from "../lib/fonts";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center pt-8 pb-4 bg-dark-green text-white">
      <section className="w-full pb-4 border-b-2">
        <div className="flex justify-between max-w-[480px] mx-auto px-24 text-4xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fa-brands fa-facebook" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fa-brands fa-instagram" />
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer noopener">
            <i className="fa-brands fa-x-twitter" />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <i className="fa-brands fa-github" />
          </a>
        </div>
      </section>
      <nav
        className="flex flex-wrap justify-between pt-6 pb-2 px-8 text-sm"
        aria-label="Secondary Navigation"
      >
        <Link
          href="/about"
          className="flex-grow mx-2 my-1 text-center hover:text-yellow"
        >
          Our Story
        </Link>
        <Link
          href="/tos"
          className="flex-grow mx-2 my-1 text-center hover:text-yellow"
        >
          Terms of Service
        </Link>
        <Link
          href="/privacy"
          className="flex-grow mx-2 my-1 text-center hover:text-yellow"
        >
          Privacy Policy
        </Link>
        <Link
          href="/help"
          className="flex-grow mx-2 my-1 text-center hover:text-yellow"
        >
          Help Center
        </Link>
        <Link
          href="/faq"
          className="flex-grow mx-2 my-1 text-center hover:text-yellow"
        >
          FAQ
        </Link>
        <Link
          href="/contact-us"
          className="flex-grow mx-2 my-1 text-center hover:text-yellow"
        >
          Contact Us
        </Link>
      </nav>
      <p className={balthazar.className}>
        © 2024 Habit Quest. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
