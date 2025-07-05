"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarRadiusAxis,
  Label,
} from "recharts";

import { getUserData } from "@/server_functions/getUserData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer } from "../ui/chart";

export default function MainChart() {
  const [cclicks, setCclicks] = useState(0);

  useEffect(() => {
    const getAndSetClicks = async () => {
      const [allClicks] = await getUserData();
      setCclicks(allClicks || 0);
    };
    getAndSetClicks();
  }, []);

  // Adjust visitor count to avoid awkward 1-click values
  const visitors = cclicks > 2 ? cclicks - 1 : cclicks;

  const chartData = [
    {
      browser: "clicks",
      visitors,
      fill: "hsl(var(--chart-2))", // using a valid CSS color variable
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 text-center">
        <CardTitle className="text-lg font-semibold">Lifetime Clicks</CardTitle>
        <CardDescription className="-mt-1 text-sm">
          to view more visit{" "}
          <Link href="/dashboard/statistics" className="text-blue-500 hover:underline">
            Statistics
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            visitors: { label: "Clicks" },
            safari: { label: "clicks", color: "hsl(var(--chart-2))" },
          }}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={100}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid gridType="circle" radialLines={false} stroke="none" />
            <RadialBar dataKey="visitors" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Clicks
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 text-sm text-center">
        <div className="flex items-center justify-center gap-2 font-medium">
          Looks like you're{" "}
          {chartData[0].visitors === 0 && (
            <span className="underline underline-offset-4 decoration-blue-400">not</span>
          )}{" "}
          growing
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <span className="text-muted-foreground">
          Showing total clicks for your links
        </span>
      </CardFooter>
    </Card>
  );
}
