"use client"

import React, { useEffect } from "react"
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { BarChart, AreaChart, LineChart, RadarChart, ScatterChart, RadialBarChart, LabelList, PieChart, Bar, Area, Pie, Radar, RadialBar, Line, XAxis, YAxis, CartesianGrid, Legend, Scatter, PolarGrid, PolarAngleAxis } from "recharts"
import { useToPng } from '@hugocxl/react-to-image'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import PrismLoader from "@/components/ui/CustomUI/prism-loader";
import { Chart } from "@/types/chart"

interface ChartCodeProps {
    chart?: Chart
    chartData: any[]
    chartConfig: any
}

export function ChartCode({ chart, chartData, chartConfig }: ChartCodeProps) {
    const [chartCode, setChartCode] = React.useState<string>('');

    useEffect(() => {
        setChartCode(generateChartCode());
    }, [chart]); // Add any dependencies that affect the code generation

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // @ts-ignore
            if (window.Prism) window.Prism.highlightAll();
        }
    }, [chartCode]);

    const generateChartCode = () => {
        if (!chart) return '';

        const chartComponent = chart.chartType.charAt(0).toUpperCase() + chart.chartType.slice(1) + 'Chart';
        const chartElement = chart.chartType === 'pie' ? 'Pie' :
            (chart.chartType === 'radar' ? 'Radar' :
                (chart.chartType === 'radial' ? 'RadialBar' :
                    chart.chartType.charAt(0).toUpperCase() + chart.chartType.slice(1)));

        const additionalImports = [
            (chart.chartType !== 'pie' && chart.chartType !== 'radar' && chart.chartType !== 'radial' && chart.xAxis.enabled) ? 'XAxis' : '',
            (chart.chartType !== 'pie' && chart.chartType !== 'radar' && chart.chartType !== 'radial' && chart.yAxis.enabled) ? 'YAxis' : '',
        ].filter(Boolean);

        const imports = additionalImports.length > 0 ?
            `import { ${chartComponent}, ${chartElement}, ${additionalImports.join(', ')} } from "recharts"` :
            `import { ${chartComponent}, ${chartElement} } from "recharts"`;

        const chartImports = chart.legend.enabled ?
            `import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"` :
            `import { ChartConfig, ChartContainer } from "@/components/ui/chart"`;

        return `
"use client"

${imports}
${chartImports}

const chartData = ${JSON.stringify(chartData, null, 2)}

const chartConfig = ${JSON.stringify(chartConfig, null, 2)} satisfies ChartConfig

export default function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <${chartComponent} accessibilityLayer data={chartData}>
        ${Object.keys(chartConfig).map(key =>
            `<${chartElement} dataKey="${key}" ${chart.chartType === 'line' ? 'stroke' : 'fill'
            }="var(--color-${key})" radius={4} />`
        ).join('\n        ')}
        ${(chart.chartType !== 'pie' && chart.chartType !== 'radar' && chart.chartType !== 'radial' && 'displayXAxis' in chart && chart.displayXAxis) ? '<XAxis dataKey="label" />' : ''}
        ${(chart.chartType !== 'pie' && chart.chartType !== 'radar' && chart.chartType !== 'radial' && 'displayYAxis' in chart && chart.displayYAxis) ? '<YAxis stroke="#333" />' : ''}
        ${chart.legend.enabled ? '<ChartLegend content={<ChartLegendContent />} />' : ''}
      </${chartComponent}>
    </ChartContainer>
  )
}`.trim();
    };

    return (
        <>
            <pre className="line-numbers">
                <code className="language-tsx text-sm">
                    {chartCode}
                </code>
            </pre>
            <PrismLoader />
        </>
    )
}

