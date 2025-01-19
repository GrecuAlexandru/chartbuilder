"use client"

import React, { useEffect } from "react"
import dynamic from "next/dynamic"
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Bar, Area, Pie, Radar, RadialBar, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import { useToPng } from '@hugocxl/react-to-image'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import PrismLoader from "@/components/ui/CustomUI/prism-loader";


interface ChartViewProps {
    chart: any
    chartData: any[]
    chartConfig: any
}

export function ChartView({ chart, chartData, chartConfig }: ChartViewProps) {
    const [_, convert, ref] = useToPng<HTMLDivElement>({
        quality: 0.8,
        canvasHeight: 2000,
        canvasWidth: 2000,
        onSuccess: data => {
            const link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = data;
            link.click();
        }
    })

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

    const renderChart = () => {
        if (!chart) return <div>Loading...</div>;

        switch (chart.chartType) {
            case 'bar':
                const BarChart = dynamic(() => import("recharts").then(mod => mod.BarChart));
                return (
                    <ChartContainer ref={ref} config={chartConfig} className="w-full p-4 pb-8 bg-white">
                        <BarChart accessibilityLayer data={chartData}>
                            {chart.ui?.cartesianGrid?.enabled && (
                                <CartesianGrid
                                    horizontal={chart.ui.cartesianGrid.horizontal ?? true}
                                    vertical={chart.ui.cartesianGrid.vertical ?? true}
                                    strokeDasharray={chart.ui.cartesianGrid.strokeDasharray}
                                    fill={chart.ui.cartesianGrid.backgroundFill}
                                    fillOpacity={chart.ui.cartesianGrid.fillOpacity}
                                />
                            )}
                            {chart.displayXAxis && <XAxis dataKey="label" />}
                            {chart.displayYAxis && <YAxis stroke="#333" />}
                            {Object.keys(chartConfig).map((key, index) => (
                                <Bar key={index} dataKey={key} fill={chartConfig[key].color} />
                            ))}
                            {chart.displayLegend && <ChartLegend content={<ChartLegendContent />} />}
                        </BarChart>
                    </ChartContainer>
                );
            case 'area':
                const AreaChart = dynamic(() => import("recharts").then(mod => mod.AreaChart));
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <AreaChart accessibilityLayer data={chartData}>
                            {chart.displayXAxis && <XAxis dataKey="label" />}
                            {chart.displayYAxis && <YAxis stroke="#333" />}
                            {Object.keys(chartConfig).map((key, index) => (
                                <Area key={index} dataKey={key} fill={chartConfig[key].color} />
                            ))}
                            {chart.displayLegend && <ChartLegend content={<ChartLegendContent />} />}
                        </AreaChart>
                    </ChartContainer>
                );
            case 'line':
                const LineChart = dynamic(() => import("recharts").then(mod => mod.LineChart));
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <LineChart accessibilityLayer data={chartData}>
                            {chart.displayXAxis && <XAxis dataKey="label" />}
                            {chart.displayYAxis && <YAxis stroke="#333" />}
                            {Object.keys(chartConfig).map((key, index) => (
                                <Line key={index} dataKey={key} stroke={chartConfig[key].color} />
                            ))}
                            {chart.displayLegend && <ChartLegend content={<ChartLegendContent />} />}
                        </LineChart>
                    </ChartContainer>
                );
            case 'pie':
                const PieChart = dynamic(() => import("recharts").then(mod => mod.PieChart));
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <PieChart accessibilityLayer>
                            <Pie data={chartData} dataKey={chart.data[0].dataSeries[0].dataSeriesLabel} />
                            {chart.displayLegend && (
                                <ChartLegend
                                    content={<ChartLegendContent nameKey="label" />}
                                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                                />
                            )}
                        </PieChart>
                    </ChartContainer>
                );
            case 'radar':
                const RadarChart = dynamic(() => import("recharts").then(mod => mod.RadarChart));
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <RadarChart accessibilityLayer data={chartData}>
                            {chart.displayLegend && <ChartLegend content={<ChartLegendContent />} />}
                            <Radar dataKey={chart.data[0].dataSeries[0].dataSeriesLabel} fill={`var(--color-${chart.data[0].dataSeries[0].dataSeriesLabel})`} />
                        </RadarChart>
                    </ChartContainer>
                );
            case 'radial':
                const RadialBarChart = dynamic(() => import("recharts").then(mod => mod.RadialBarChart), { ssr: false });
                const LabelList = dynamic(() => import("recharts").then(mod => mod.LabelList));
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <RadialBarChart accessibilityLayer data={chartData}>
                            {chart.displayLegend && <ChartLegend content={<ChartLegendContent />} />}
                            <RadialBar dataKey={chart.data[0].dataSeries[0].dataSeriesLabel} fill={`var(--color-${chart.data[0].dataSeries[0].dataSeriesLabel})`}>
                                <LabelList
                                    position="insideStart"
                                    dataKey="label"
                                    className="fill-white capitalize mix-blend-luminosity"
                                    fontSize={11}
                                />
                            </RadialBar>
                        </RadialBarChart>
                    </ChartContainer>
                );
            default:
                return <div>Unsupported chart type</div>;
        }
    };

    const generateChartCode = () => {
        const chartComponent = chart.chartType.charAt(0).toUpperCase() + chart.chartType.slice(1) + 'Chart';
        const chartElement = chart.chartType === 'pie' ? 'Pie' :
            (chart.chartType === 'radar' ? 'Radar' :
                (chart.chartType === 'radial' ? 'RadialBar' :
                    chart.chartType.charAt(0).toUpperCase() + chart.chartType.slice(1)));

        const additionalImports = [
            chart.displayXAxis ? 'XAxis' : '',
            chart.displayYAxis ? 'YAxis' : '',
        ].filter(Boolean);

        const imports = additionalImports.length > 0 ?
            `import { ${chartComponent}, ${chartElement}, ${additionalImports.join(', ')} } from "recharts"` :
            `import { ${chartComponent}, ${chartElement} } from "recharts"`;

        const chartImports = chart.displayLegend ?
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
        ${chart.displayXAxis ? '<XAxis dataKey="label" />' : ''}
        ${chart.displayYAxis ? '<YAxis stroke="#333" />' : ''}
        ${chart.displayLegend ? '<ChartLegend content={<ChartLegendContent />} />' : ''}
      </${chartComponent}>
    </ChartContainer>
  )
}`.trim();
    };

    return (
        <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-4 items-center">
                            <div className="w-full flex items-center justify-center border rounded-lg">
                                {renderChart()}
                            </div>
                            <Button onClick={convert} className="w-1/2">Download Image</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="code">
                <Card>
                    <CardContent className="pt-6">
                        <pre className="line-numbers">
                            <code className="language-tsx text-sm">
                                {chartCode}
                            </code>
                        </pre>
                        <PrismLoader />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

