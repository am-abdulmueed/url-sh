import { Link2 } from "lucide-react";
import { ModeToggle } from "../modetoggle";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="px-6 md:px-20 lg:px-32 py-12 text-center border-t border-border mt-10">
            <div className="grid gap-2 place-items-center">
                <Link2 className="h-6 w-6 text-blue-500" />
                <h3 className="text-xl font-semibold">URL Shortener</h3>
                <p className="text-muted-foreground text-sm sm:text-base max-w-md">
                    Crafted with ❤️ to showcase my development skills in a beautiful, fast, and useful open-source project.
                </p>
            </div>

            <div className="mt-4 flex gap-4 flex-wrap justify-center text-sm font-medium">
                <Link href="https://github.com/betaae/aurioapp/releases" className="text-blue-500 hover:underline hover:opacity-80 transition">
                    Aurio Music
                </Link>
                <Link href="https://github.com/BetaAE/cloudup/releases" className="text-blue-500 hover:underline hover:opacity-80 transition">
                    Cloud UP
                </Link>
                <Link href="https://am-abdulmueed.vercel.app" className="text-blue-500 hover:underline hover:opacity-80 transition">
                    My Portfolio
                </Link>
            </div>

            <div className="mt-6">
                <ModeToggle />
            </div>
        </footer>
    );
}
