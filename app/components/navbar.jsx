// @flow strict
"use client"

import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

const NAV_LINKS = [
  { href: "/#about", label: "ABOUT" },
  { href: "/#experience", label: "EXPERIENCE" },
  { href: "/#skills", label: "SKILLS" },
  { href: "/#research", label: "RESEARCH" },
  { href: "/#projects", label: "PROJECTS" },
  { href: "/#achievements", label: "ACHIEVEMENTS" },
  { href: "/#education", label: "EDUCATION" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent relative z-[60]">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className=" text-[#16f2b3] text-2xl sm:text-3xl font-bold">
            ROHIT KUMAR
          </Link>
        </div>

        {/* mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="navbar-menu"
          className="md:hidden p-2.5 text-white hover:text-pink-500 transition-colors duration-300 cursor-pointer"
        >
          {isOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
        </button>

        {/* desktop links */}
        <ul className="hidden md:flex md:flex-row md:space-x-1" id="navbar-menu">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href={link.href}>
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">{link.label}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* mobile dropdown */}
      {isOpen && (
        <ul className="md:hidden flex flex-col rounded-lg border border-[#1b2c68a0] bg-[#0d1224]/95 backdrop-blur-md px-3 py-3 mb-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm text-white no-underline rounded-md transition-colors duration-300 hover:text-pink-500 hover:bg-[#1a1443]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
