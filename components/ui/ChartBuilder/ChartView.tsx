
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, RadarChart, Radar, RadialBarChart, RadialBar, XAxis, YAxis, LabelList } from "recharts"

interface ChartViewProps {
    chart: any
    chartData: any[]
    chartConfig: any
}

export function ChartView({ chart, chartData, chartConfig }: ChartViewProps) {
    return (
        <div className="w-full flex items-center justify-center border rounded-lg">
            {!chart && (
                <div>Loading...</div>
            )}
            {chart.chart_type === 'bar' && (
                <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                    <BarChart accessibilityLayer data={chartData}>
                        {chart.display_x_axis &&
                            <XAxis
                                dataKey="label"
                            />
                        }
                        {chart.display_y_axis &&
                            <YAxis
                                stroke="#333"
                            />
                        }
                        {chart.display_y_axis && <YAxis stroke="#333" />}
                        {Object.keys(chartConfig).map((key, index) => (
                            <Bar key={index} dataKey={key} fill={chartConfig[key].color} />
                        ))}
                        {chart.display_legend &&
                            <ChartLegend content={<ChartLegendContent />} />
                        }
                    </BarChart>
                </ChartContainer>
            )}
            {chart.chart_type === 'area' && (
                <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                    <AreaChart accessibilityLayer data={chartData}>
                        {chart.display_x_axis &&
                            <XAxis
                                dataKey="label"
                            />
                        }
                        {chart.display_y_axis &&
                            <YAxis
                                stroke="#333"
                            />
                        }
                        {Object.keys(chartConfig).map((key, index) => (
                            <Area key={index} dataKey={key} fill={chartConfig[key].color} />
                        ))}
                        {chart.display_legend &&
                            <ChartLegend content={<ChartLegendContent />} />
                        }
                    </AreaChart>
                </ChartContainer>
            )}
            {chart.chart_type === 'line' && (
                <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                    <LineChart accessibilityLayer data={chartData}>
                        {chart.display_x_axis &&
                            <XAxis
                                dataKey="label"
                            />
                        }
                        {chart.display_y_axis &&
                            <YAxis
                                stroke="#333"
                            />
                        }
                        {Object.keys(chartConfig).map((key, index) => (
                            <Line key={index} dataKey={key} stroke={chartConfig[key].color} />
                        ))}
                        {chart.display_legend &&
                            <ChartLegend content={<ChartLegendContent />} />
                        }
                    </LineChart>
                </ChartContainer>
            )}
            {chart.chart_type === 'pie' && (
                <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                    <PieChart accessibilityLayer>
                        <Pie
                            data={chartData}
                            dataKey={chart.data[0].data_series[0].data_series_label}
                        />

                        {chart.display_legend &&
                            <ChartLegend
                                content={<ChartLegendContent nameKey="label" />}
                                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                            />
                        }
                    </PieChart>
                </ChartContainer>
            )}
            {chart.chart_type === 'radar' && (
                <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                    <RadarChart accessibilityLayer data={chartData}>
                        {chart.display_legend &&
                            <ChartLegend content={<ChartLegendContent />} />
                        }
                        <Radar dataKey={chart.data[0].data_series[0].data_series_label} fill={`var(--color-${chart.data[0].data_series[0].data_series_label}`} />
                    </RadarChart>
                </ChartContainer>
            )}
            {chart.chart_type === 'radial' && (
                <ChartContainer config={chartConfig} className="w-full p-4 pb-8">
                    <RadialBarChart accessibilityLayer data={chartData}>
                        {chart.display_legend &&
                            <ChartLegend content={<ChartLegendContent />} />
                        }
                        <RadialBar dataKey={chart.data[0].data_series[0].data_series_label} fill={`var(--color-${chart.data[0].data_series[0].data_series_label}`} >
                            <LabelList
                                position="insideStart"
                                dataKey="label"
                                className="fill-white capitalize mix-blend-luminosity"
                                fontSize={11}
                            />
                        </RadialBar>
                    </RadialBarChart>
                </ChartContainer>
            )}
        </div>
    )
}