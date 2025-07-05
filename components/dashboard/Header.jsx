"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton, UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { BarChart2Icon, Loader2 } from "lucide-react";

import { Button, buttonVariants } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { ModeToggle } from "../modetoggle";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "All Links", path: "/dashboard/links" },
    { name: "Statistics", path: "/dashboard/statistics" },
  ];

  const linkClass = "transition h-10 px-3 rounded-md text-center hover:bg-accent/40 text-base";
  const activeClass = "bg-accent/40 text-primary font-semibold";

  return (
    <header className="px-6 md:px-20 lg:px-32 py-4 flex items-center justify-between border-b">
      {/* Left Menu (Drawer/Sheet for mobile) */}
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex items-center justify-center h-10 w-10 rounded-lg cursor-pointer transition hover:bg-accent/40">
            <BarChart2Icon className="h-6 w-6 rotate-90" />
          </div>
        </SheetTrigger>

        <SheetContent side="left" className="flex flex-col justify-between sm:max-w-xs">
          <SheetHeader>
            <SheetDescription className="mt-10 grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(linkClass, pathname === link.path && activeClass)}
                >
                  {link.name}
                </Link>
              ))}
            </SheetDescription>
          </SheetHeader>

          <SheetFooter className="mt-10">
            <div className="w-full grid gap-4">
              <div className="flex items-center justify-between gap-3">
                <div className="grid gap-0.5">
                  <div className="border rounded-lg overflow-hidden">
                    <ModeToggle btnClassName="border-0 rounded-none" />
                  </div>
                  <span className="text-xs text-center opacity-70">Change Theme</span>
                </div>

                <SignOutButton redirectUrl="/">
                  <Button size="sm">Logout</Button>
                </SignOutButton>
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Right Side (User buttons) */}
      <ClerkLoaded>
        <div className="flex items-center gap-3">
          <SignOutButton redirectUrl="/">
            <Button variant="outline" size="sm">Logout</Button>
          </SignOutButton>
          <UserButton />
        </div>
      </ClerkLoaded>

      <ClerkLoading>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="w-20">
            <Loader2 className="h-5 w-5 animate-spin" />
          </Button>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </ClerkLoading>
    </header>
  );
}
