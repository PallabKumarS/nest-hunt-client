"use client";

import { Button } from "../ui/button";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { logout, userSelector } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { config } from "@/middleware";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  const navItems = [
    { href: "/listings", label: "All Rentals" },
    { href: "/about", label: "About" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    if (config.matcher.some((route) => pathname.match(route))) {
      router.push("/login");
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <nav className="container mx-auto px-4 pb-2 lg:h-16 flex items-center justify-center lg:justify-between gap-4 flex-wrap lg:flex-nowrap">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <h1 className="text-2xl font-black">
            <span className="text-gradient">Nest Hunt</span>
          </h1>
        </Link>

        {/* Search Bar - Always in main navbar */}
        <div className="flex-grow max-w-md hidden md:block">
          <input
            type="text"
            placeholder="Search for houses..."
            className="w-full px-4 py-2 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {user?.email ? (
            <>
              <Link href="/create-listing" className="hidden sm:block">
                <Button variant="outline" className="rounded-full">
                  Post Rental
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="rounded-full">
                Login
              </Button>
            </Link>
          )}

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Search - Always visible on small screens */}
      <div className="md:hidden px-4 py-2 border-t">
        <input
          type="text"
          placeholder="Search for houses..."
          className="w-full px-4 py-2 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user?.email && (
              <Link
                href="/create-listing"
                className="block text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Post Rental
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
