"use client"

import { BarChart, Bar, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

const chartData = [
    {
        "label": "Label1",
        "Value1": 4
    },
    {
        "label": "Label2",
        "Value1": 7
    },
    {
        "label": "Label3",
        "Value1": 2
    }
]

const chartConfig = {
    "Value1": {
        "label": "Value1",
        "color": "hsl(var(--chart-4))"
    }
} satisfies ChartConfig

export default function Component() {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <Bar dataKey="Value1" fill="var(--color-Value1)" radius={4} />
                <XAxis dataKey="label" />
                <YAxis stroke="#333" />
                <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
        </ChartContainer>
    )
}