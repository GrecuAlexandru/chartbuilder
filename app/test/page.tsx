"use client"

import { BarChart, Bar, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

const chartData = [
  {
    "label": "Label1",
    "Category1": 12
  },
  {
    "label": "Label2",
    "Category1": 5
  },
  {
    "label": "Label3",
    "Category1": 9
  },
  {
    "label": "Label4",
    "Category1": 6
  }
]

const chartConfig = {
  "Category1": {
    "label": "Category1",
    "color": "hsl(var(--chart-3))"
  }
} satisfies ChartConfig

export default function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="Category1" fill="var(--color-Category1)" radius={4} />
        <XAxis dataKey="label" />
        <YAxis stroke="#333" />
        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  )
}