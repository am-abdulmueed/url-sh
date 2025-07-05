import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Star } from "lucide-react";
import IfLoggedInElse from "../helpers/ifLoggedInElse";

export default function Hero() {
  return (
    <section className="py-20 px-6 md:px-20 lg:px-32 bg-background">
      <div className="grid gap-6 text-center place-items-center max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-fade-in-up">
            Supercharged URL Shortener
          </span>
          <br />
          Built with{" "}
          <span className="underline underline-offset-[6px] decoration-blue-400">
            Next.js 14
          </span>{" "}
          &{" "}
          <span className="underline underline-offset-[6px] decoration-blue-400">
            MongoDB
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-2xl leading-relaxed">
          A blazing-fast, open-source URL shortener with analytics, full link control, custom slugs, and a clean experience — powered by Next.js 14, MongoDB, and shadcn/ui.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center flex-wrap gap-4 mt-6">
          <IfLoggedInElse
            ifNot={
              <Link
                href="/sign-up"
                className={buttonVariants({
                  variant: "shine",
                  size: "lg",
                })}
              >
                Get Started
              </Link>
            }
            ifUser={
              <Link
                href="/dashboard"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}
              >
                Go to Dashboard
              </Link>
            }
          />

          <Link
            href="https://github.com/am-abdulmueed/u-sh"
            target="_blank"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "flex items-center gap-2"
            )}
          >
            <Star className="h-4 w-4" />
            Star on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
