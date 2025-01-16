"use client"

import { BarChart, Bar, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

const chartData = [
  {
    "label": "January",
    "Category A": 12,
    "Category B": 8
  },
  {
    "label": "February",
    "Category A": 15,
    "Category B": 6
  },
  {
    "label": "March",
    "Category A": 9,
    "Category B": 14
  }
]

const chartConfig = {
  "Category A": {
    "label": "Category A",
    "color": "hsl(var(--chart-1))"
  },
  "Category B": {
    "label": "Category B",
    "color": "hsl(var(--chart-3))"
  }
} satisfies ChartConfig

export default function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="Category A" fill="var(--color-Category A)" radius={4} />
        <Bar dataKey="Category B" fill="var(--color-Category B)" radius={4} />
        <XAxis dataKey="label" />
        <YAxis stroke="#333" />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  )
}