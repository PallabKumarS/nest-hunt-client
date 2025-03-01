"use client";

import { Button } from "../ui/button";
import { Heart, LogOut } from "lucide-react";
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
// import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  //   const pathname = usePathname();
  //   const router = useRouter();

  const user = {
    email: "",
    role: "admin",
  };

  const handleLogout = () => {
    // logout();
    // setLoading(true);
    // if (config.matcher.some((route) => pathname.match(route))) {
    //   router.push("/login");
    // }
  };

  return (
    <header className="border-b bg-background w-full sticky top-0 z-10">
      <div className="container flex justify-between items-center mx-auto h-16 px-5">
        {/* Logo Text */}
        <Link href="/">
          <h1 className="text-2xl font-black flex items-center space-x-2">
            <span className="text-gradient">Nest Hunt</span>
          </h1>
        </Link>

        {/* Search bar */}
        <div className="max-w-md flex-grow">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full max-w-6xl border border-gray-300 rounded-full py-2 px-5"
          />
        </div>

        {/* Navigation buttons */}
        <nav className="flex gap-2">
          <Button variant="outline" className="rounded-full p-0 size-10">
            <Heart />
          </Button>

          {user?.email ? (
            <>
              {/* Create Shop button */}
              <Link href={"/create-listing"}>
                <Button variant={"outline"} className="rounded-full p-4">
                  Post Rental House Info
                </Button>
              </Link>

              {/* Dropdown menu */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>My Shop</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // Login button
            <Link href={"/login"}>
              <Button variant={"outline"} className="rounded-full p-4">
                Login
              </Button>
            </Link>
          )}

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
