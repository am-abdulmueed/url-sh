"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export default function Review() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length); // loop through reviews
    }, 5000); // every 5 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <section className="px-6 md:px-20 lg:px-32 mb-20 max-w-6xl sm:mx-auto">
      <div className="sm:text-center mb-10 grid gap-2 max-w-xs md:max-w-lg sm:mx-auto lg:max-w-xl">
        <h2 className="text-4xl font-bold lg:text-6xl sm:text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          What our customers are saying
        </h2>
        <p className="text-muted-foreground mx-auto text-base md:text-lg max-w-md">
          See how people are loving the experience. These aren’t real reviews—just demo content to inspire confidence!
        </p>
      </div>

      <Carousel className="transition-all duration-500">
        <CarouselContent
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: "transform 0.6s ease-in-out",
            display: "flex",
          }}
        >
          {reviews.map((review, i) => (
            <CarouselItem key={i} className="min-w-full max-w-sm px-2">
              <div className="bg-card shadow-md hover:shadow-xl transition-shadow duration-300 py-6 px-5 rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.image} />
                    <AvatarFallback>{review.initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid !gap-0">
                    <h2 className="text-lg font-medium">{review.name}</h2>
                    <span className="text-sm text-muted-foreground -mt-1">{review.handle}</span>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">{review.content}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

const reviews = [
  {
    name: "BetaAE",
    handle: "@betaae",
    image: "https://avatars.githubusercontent.com/u/205015653?v=4",
    initials: "AR",
    content:
      "This URL shortener is incredibly easy to use. With a clean and intuitive interface, I can shorten my links in seconds. Highly recommended!",
  },
  {
    name: "Abdul Mueed :))",
    handle: "@am-abdulmueed",
    image: "https://avatars.githubusercontent.com/u/218471065?v=4",
    initials: "RR",
    content:
      "Speed is crucial for me, and this tool delivers every time. It generates links instantly and has never failed me. A fantastic tool for anyone!",
  },
  {
    name: "Beta Pix",
    handle: "@betapix",
    image: "https://avatars.githubusercontent.com/u/177719587?v=4",
    initials: "DG",
    content:
      "Security is a big concern, and this app meets all my expectations. I feel confident using it for business communication. Excellent choice!",
  },
];
