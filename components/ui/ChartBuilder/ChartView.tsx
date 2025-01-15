"use client"

import React, { useEffect } from "react"
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, RadarChart, Radar, RadialBarChart, RadialBar, XAxis, YAxis, LabelList, CartesianGrid } from "recharts"
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

        switch (chart.chart_type) {
            case 'bar':
                return (
                    <ChartContainer ref={ref} config={chartConfig} className="w-full p-4 pb-8 bg-white">
                        <BarChart accessibilityLayer data={chartData}>
                            {chart.ui?.cartesianGrid && <CartesianGrid strokeDasharray="3 3" />}
                            {chart.display_x_axis && <XAxis dataKey="label" />}
                            {chart.display_y_axis && <YAxis stroke="#333" />}
                            {Object.keys(chartConfig).map((key, index) => (
                                <Bar key={index} dataKey={key} fill={chartConfig[key].color} />
                            ))}
                            {chart.display_legend && <ChartLegend content={<ChartLegendContent />} />}
                        </BarChart>
                    </ChartContainer>
                );
            case 'area':
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <AreaChart accessibilityLayer data={chartData}>
                            {chart.display_x_axis && <XAxis dataKey="label" />}
                            {chart.display_y_axis && <YAxis stroke="#333" />}
                            {Object.keys(chartConfig).map((key, index) => (
                                <Area key={index} dataKey={key} fill={chartConfig[key].color} />
                            ))}
                            {chart.display_legend && <ChartLegend content={<ChartLegendContent />} />}
                        </AreaChart>
                    </ChartContainer>
                );
            case 'line':
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <LineChart accessibilityLayer data={chartData}>
                            {chart.display_x_axis && <XAxis dataKey="label" />}
                            {chart.display_y_axis && <YAxis stroke="#333" />}
                            {Object.keys(chartConfig).map((key, index) => (
                                <Line key={index} dataKey={key} stroke={chartConfig[key].color} />
                            ))}
                            {chart.display_legend && <ChartLegend content={<ChartLegendContent />} />}
                        </LineChart>
                    </ChartContainer>
                );
            case 'pie':
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <PieChart accessibilityLayer>
                            <Pie data={chartData} dataKey={chart.data[0].data_series[0].data_series_label} />
                            {chart.display_legend && (
                                <ChartLegend
                                    content={<ChartLegendContent nameKey="label" />}
                                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                                />
                            )}
                        </PieChart>
                    </ChartContainer>
                );
            case 'radar':
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <RadarChart accessibilityLayer data={chartData}>
                            {chart.display_legend && <ChartLegend content={<ChartLegendContent />} />}
                            <Radar dataKey={chart.data[0].data_series[0].data_series_label} fill={`var(--color-${chart.data[0].data_series[0].data_series_label})`} />
                        </RadarChart>
                    </ChartContainer>
                );
            case 'radial':
                return (
                    <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                        <RadialBarChart accessibilityLayer data={chartData}>
                            {chart.display_legend && <ChartLegend content={<ChartLegendContent />} />}
                            <RadialBar dataKey={chart.data[0].data_series[0].data_series_label} fill={`var(--color-${chart.data[0].data_series[0].data_series_label})`}>
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
        const chartComponent = chart.chart_type.charAt(0).toUpperCase() + chart.chart_type.slice(1) + 'Chart';
        const chartElement = chart.chart_type === 'pie' ? 'Pie' :
            (chart.chart_type === 'radar' ? 'Radar' :
                (chart.chart_type === 'radial' ? 'RadialBar' :
                    chart.chart_type.charAt(0).toUpperCase() + chart.chart_type.slice(1)));

        const additionalImports = [
            chart.display_x_axis ? 'XAxis' : '',
            chart.display_y_axis ? 'YAxis' : '',
        ].filter(Boolean);

        const imports = additionalImports.length > 0 ?
            `import { ${chartComponent}, ${chartElement}, ${additionalImports.join(', ')} } from "recharts"` :
            `import { ${chartComponent}, ${chartElement} } from "recharts"`;

        const chartImports = chart.display_legend ?
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
            `<${chartElement} dataKey="${key}" ${chart.chart_type === 'line' ? 'stroke' : 'fill'
            }="var(--color-${key})" radius={4} />`
        ).join('\n        ')}
        ${chart.display_x_axis ? '<XAxis dataKey="label" />' : ''}
        ${chart.display_y_axis ? '<YAxis stroke="#333" />' : ''}
        ${chart.display_legend ? '<ChartLegend content={<ChartLegendContent />} />' : ''}
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

