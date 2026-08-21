"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import logo from "@/images/logo.svg";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
   
];

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="w-full bg-background">
      <nav className="mx-auto flex max-w-[1408px] items-center justify-between px-4 py-4 md:px-6">
        <Link href="/home" className="flex-shrink-0">
          <Image
            src={logo}
            alt="Evisa logo"
            width={91.41}
            height={53.1}
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === "/home" && pathname === "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-base transition-colors ${
                    isActive
                      ? "font-semibold text-primary"
                      : "font-normal text-general hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/apply"
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Apply for eTA
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center justify-center md:hidden"
            style={{ width: "32px", height: "32px" }}
            aria-label="Open menu"
          >
            <Menu className="h-8 w-8 text-primary" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer panel */}
          <div
            className="absolute right-0 top-0 h-full shadow-lg"
            style={{ width: "280px", background: "var(--card)" }}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Image
                src={logo}
                alt="Evisa logo"
                width={91.41}
                height={53.1}
              />
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center"
                style={{ width: "32px", height: "32px" }}
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-primary" />
              </button>
            </div>
            <ul className="flex flex-col gap-0">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href === "/home" && pathname === "/");
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`block px-4 py-4 text-base transition-colors border-b border-border ${
                        isActive
                          ? "font-semibold text-primary"
                          : "font-normal text-general hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
