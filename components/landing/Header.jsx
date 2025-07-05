import { Link2 } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import IfLoggedInElse from "../helpers/ifLoggedInElse";
import { SignOutButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-border px-5 py-4 md:px-20 lg:px-32 shadow-sm bg-background/60 backdrop-blur-md sticky top-0 z-50">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-2 text-primary font-semibold text-lg hover:opacity-80 transition">
        <Link2 className="h-5 w-5 text-blue-500" />
        <span className="tracking-tight">u-sh</span>
      </Link>

      {/* Auth / Nav Buttons */}
      <div className="flex items-center gap-3">
        <IfLoggedInElse
          ifNot={
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Login
            </Link>
          }
          ifUser={
            <SignOutButton redirectUrl="/">
              <Button variant="outline" size="sm">Logout</Button>
            </SignOutButton>
          }
        />

        <IfLoggedInElse
          ifNot={
            <Link
              href="/sign-up"
              className={buttonVariants({ variant: "shine", size: "sm" })}
            >
              Get Started
            </Link>
          }
          ifUser={
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: "shine", size: "sm" })}
            >
              Dashboard
            </Link>
          }
        />
      </div>
    </header>
  );
}
