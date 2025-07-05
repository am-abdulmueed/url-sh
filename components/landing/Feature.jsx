import { AreaChart, Shapes, Signature, Unlink } from "lucide-react";

export default function Feature() {
    return (
        <section className="px-6 md:px-20 lg:px-32 mb-10">
            <div className="grid gap-2 max-w-xs md:max-w-lg sm:mx-auto lg:max-w-xl text-center">
                <h2 className="text-3xl font-semibold lg:text-5xl">
                    What it <span className="underline underline-offset-[5px] decoration-blue-400">requires</span> & How to <span className="underline underline-offset-[5px] decoration-blue-400">get started</span>?
                </h2>
                <p className="text-muted-foreground mx-auto text-base md:text-lg max-w-md">
                    Getting started is simple. No subscriptions or payments—just a few clicks to shorten and manage your links.
                </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-5 items-stretch justify-center">
                <FeatureCard
                    icon={<Signature className="h-6 w-6 text-blue-500" />}
                    title="Login or Sign Up"
                    desc="Create an account instantly using Google or GitHub. No need for passwords or emails—fast and secure access."
                />
                <FeatureCard
                    icon={<Unlink className="h-6 w-6 text-purple-500" />}
                    title="Shorten Your Links"
                    desc="Shrink any link—YouTube, Instagram, Facebook, or custom URLs—with just one click."
                />
                <FeatureCard
                    icon={<Shapes className="h-6 w-6 text-pink-500" />}
                    title="Share Instantly"
                    desc="Easily share your shortened links via social platforms or copy to clipboard in one tap."
                />
                <FeatureCard
                    icon={<AreaChart className="h-6 w-6 text-green-500" />}
                    title="View Analytics"
                    desc="Track clicks, devices, browsers, and regions with detailed link insights and performance stats."
                />
            </div>
        </section>
    );
}

// Reusable card component
function FeatureCard({ icon, title, desc }) {
    return (
        <div className="bg-card shadow-sm border border-border py-5 px-5 rounded-xl grid gap-2 sm:max-w-xs md:max-w-xs lg:max-w-sm">
            {icon}
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm sm:text-base text-muted-foreground">{desc}</p>
        </div>
    );
}
