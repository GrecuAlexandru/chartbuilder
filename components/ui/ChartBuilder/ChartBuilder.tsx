'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "motion/react"
import { z, infer as zInfer } from "zod";

import { Bar, BarChart, Area, AreaChart, Line, LineChart, Pie, PieChart, Sector, Radar, RadarChart, RadialBar, RadialBarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { ChatInterface } from "./ChatInterface"
import { ChartView } from "./ChartView"
import { ChartSettings } from "./ChartSettings"
import { Chart, ChartUISettings, DataRow, DataSeries } from './types';

// const chartData = [
//     { label: "January", desktop: 186, mobile: 80 },
//     { label: "February", desktop: 305, mobile: 200 },
//     { label: "March", desktop: 237, mobile: 120 },
//     { label: "April", desktop: 73, mobile: 190 },
//     { label: "May", desktop: 209, mobile: 130 },
//     { label: "June", desktop: 214, mobile: 140 },
// ]

// const chartConfig = {
//     desktop: {
//         label: "Desktop",
//         color: "#2563eb",
//     },
//     mobile: {
//         label: "Mobile",
//         color: "#60a5fa",
//     },
// } satisfies ChartConfig

// const ChartType = z.enum([
//     "area",
//     "bar",
//     "line",
//     "pie",
//     "radar",
//     "radial",
//     "scatter",
// ]);

// const DataSeries = z.object({
//     data_series_label: z.string(),
//     data_series_value: z.number(),
// })

// const DataRow = z.object({
//     label: z.string(),
//     data_series: z.array(DataSeries),
// });

// const ChartUISettings = z.object({
//     // Visual settings
//     colors: z.array(z.string()).optional(),
//     fontFamily: z.string().optional(),
//     fontSize: z.number().optional(),

//     // Axis settings
//     xAxisLabel: z.string().optional(),
//     yAxisLabel: z.string().optional(),
//     xAxisRotation: z.number().optional(),
//     yAxisRotation: z.number().optional(),

//     // Legend settings
//     legendPosition: z.enum(['top', 'right', 'bottom', 'left']).optional(),
//     legendLayout: z.enum(['horizontal', 'vertical']).optional(),

//     // Animation settings
//     animate: z.boolean().optional(),
//     animationDuration: z.number().optional(),

//     // Interactivity
//     tooltipEnabled: z.boolean().optional(),
//     zoomEnabled: z.boolean().optional(),
//     panEnabled: z.boolean().optional(),

//     // Chart specific settings
//     gridLines: z.boolean().optional(),
//     borderRadius: z.number().optional(),
//     barGap: z.number().optional(),
//     lineStyle: z.enum(['solid', 'dashed', 'dotted']).optional(),
//     fillOpacity: z.number().optional(),
// });

// const Chart = z.object({
//     chart_type: ChartType,
//     data: z.array(DataRow),
//     display_legend: z.boolean().optional(),
//     display_label: z.boolean().optional(),
//     display_x_axis: z.boolean().optional(),
//     display_y_axis: z.boolean().optional(),
//     area_chart_stacked: z.boolean().optional(),
//     bar_chart_horizontal: z.boolean().optional(),
//     bar_chart_negative: z.boolean().optional(),
//     line_chart_linear: z.boolean().optional(),
//     line_chart_dots: z.boolean().optional(),
//     pie_chart_labels: z.boolean().optional(),
//     pie_chart_donut: z.boolean().optional(),
//     pie_chart_donut_with_text: z.boolean().optional(),
//     radar_chart_dots: z.boolean().optional(),
//     radial_chart_grid: z.boolean().optional(),
//     radial_chart_text: z.boolean().optional(),
//     scatter_chart_three_dim: z.boolean().optional(),

//     ui: ChartUISettings.optional()
// });
const demoString = `{ "chart_type": "bar", "data": [ { "label": "Label1", "data_series": [ { "data_series_label": "Category1", "data_series_value": 12 } ] }, { "label": "Label2", "data_series": [ { "data_series_label": "Category1", "data_series_value": 5 } ] }, { "label": "Label3", "data_series": [ { "data_series_label": "Category1", "data_series_value": 9 } ] }, { "label": "Label4", "data_series": [ { "data_series_label": "Category1", "data_series_value": 6 } ] } ], "display_legend": true, "display_label": false, "display_x_axis": true, "display_y_axis": true, "area_chart_stacked": false, "bar_chart_horizontal": false, "bar_chart_negative": false, "line_chart_linear": false, "line_chart_dots": false, "pie_chart_labels": false, "pie_chart_donut": false, "pie_chart_donut_with_text": false, "radar_chart_dots": false, "radial_chart_grid": false, "radial_chart_text": false, "scatter_chart_three_dim": false }`;

export default function ChartBuilder() {
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState<{ role: string, content: string }[]>([])
    const [isFullScreen, setIsFullScreen] = useState(true)
    const [chart, setChart] = useState<zInfer<typeof Chart>>({
        chart_type: "bar",
        data: [],
        display_legend: false,
        display_label: false,
        display_x_axis: false,
        display_y_axis: false,
        area_chart_stacked: false,
        bar_chart_horizontal: false,
        bar_chart_negative: false,
        line_chart_linear: false,
        line_chart_dots: false,
        pie_chart_labels: false,
        pie_chart_donut: false,
        pie_chart_donut_with_text: false,
        radar_chart_dots: false,
        radial_chart_grid: false,
        radial_chart_text: false,
        scatter_chart_three_dim: false,

        ui: {
            cartesianGrid: false,
        }
    })
    const [chartData, setChartData] = useState<{ label: string;[key: string]: any }[]>([])
    const [chartConfig, setChartConfig] = useState<ChartConfig>({})

    // Helper function to update UI settings
    const updateChartUI = (updates: Partial<zInfer<typeof ChartUISettings>>) => {
        setChart(prev => ({
            ...prev,
            ui: {
                ...prev.ui,
                ...updates
            }
        }));
    };

    const handleDemo = () => {
        const data = { chart: JSON.parse(demoString) };
        setChart(data.chart);

        if (data.chart.chart_type === 'pie') {
            const chData: { label: string;[key: string]: any }[] = data.chart.data.map((row: zInfer<typeof DataRow>) => {
                const dataObject: { label: string;[key: string]: any } = { label: row.label };
                row.data_series.forEach((dataPoint: zInfer<typeof DataSeries>) => {
                    dataObject[dataPoint.data_series_label] = dataPoint.data_series_value;
                });
                dataObject['fill'] = `var(--color-${row.label})`;
                return dataObject;
            });
            setChartData(chData);

            const chConfig: ChartConfig = {};
            chConfig[data.chart.data[0].data_series[0].data_series_label] = {
                label: data.chart.data[0].data_series[0].data_series_label,
            };
            data.chart.data.forEach((row: zInfer<typeof DataRow>) => {
                if (!chConfig[row.label]) {
                    chConfig[row.label] = {
                        label: row.label,
                        color: `hsl(var(--chart-${Math.floor(Math.random() * 5) + 1}))`,
                    };
                }
            });
            setChartConfig(chConfig);
        } else {
            const chData: { label: string;[key: string]: any }[] = data.chart.data.map((row: zInfer<typeof DataRow>) => {
                const dataObject: { label: string;[key: string]: any } = { label: row.label };
                row.data_series.forEach((dataPoint: zInfer<typeof DataSeries>) => {
                    dataObject[dataPoint.data_series_label] = dataPoint.data_series_value;
                });
                return dataObject;
            });
            setChartData(chData);

            const chConfig: ChartConfig = {};
            data.chart.data.forEach((row: zInfer<typeof DataRow>) => {
                row.data_series.forEach((dataPoint: zInfer<typeof DataSeries>) => {
                    if (!chConfig[dataPoint.data_series_label]) {
                        chConfig[dataPoint.data_series_label] = {
                            label: dataPoint.data_series_label,
                            color: `hsl(var(--chart-${Math.floor(Math.random() * 5) + 1}))`,
                        };
                    }
                });
            });
            setChartConfig(chConfig);
        }

        const string_text = JSON.stringify(data.chart, null, 2);

        setChatHistory(prev => [...prev, { role: 'agent', content: string_text }]);

        setMessage('')

        // Simulate agent response after 1 second
        setTimeout(() => {
            setChatHistory(prev => [...prev, { role: 'agent', content: 'Here\'s the chart you requested. You can customize it using the panel on the right.' }])
            setIsFullScreen(false)
        }, 1000)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (message.trim()) {
            setChatHistory([...chatHistory, { role: 'user', content: message }])
            try {
                const response = await fetch('/api/chartbot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: message }),
                });

                const data = await response.json();
                setChart(data.chart);
                console.log(data);


                if (data.chart.chart_type === 'pie') {
                    const chData: { label: string;[key: string]: any }[] = data.chart.data.map((row: zInfer<typeof DataRow>) => {
                        const dataObject: { label: string;[key: string]: any } = { label: row.label };
                        row.data_series.forEach((dataPoint: zInfer<typeof DataSeries>) => {
                            dataObject[dataPoint.data_series_label] = dataPoint.data_series_value;
                        });
                        dataObject['fill'] = `var(--color-${row.label})`;
                        return dataObject;
                    });
                    setChartData(chData);

                    const chConfig: ChartConfig = {};
                    chConfig[data.chart.data[0].data_series[0].data_series_label] = {
                        label: data.chart.data[0].data_series[0].data_series_label,
                    };
                    data.chart.data.forEach((row: zInfer<typeof DataRow>) => {
                        if (!chConfig[row.label]) {
                            chConfig[row.label] = {
                                label: row.label,
                                color: `hsl(var(--chart-${Math.floor(Math.random() * 5) + 1}))`,
                            };
                        }
                    });
                    setChartConfig(chConfig);
                } else {
                    const chData: { label: string;[key: string]: any }[] = data.chart.data.map((row: zInfer<typeof DataRow>) => {
                        const dataObject: { label: string;[key: string]: any } = { label: row.label };
                        row.data_series.forEach((dataPoint: zInfer<typeof DataSeries>) => {
                            dataObject[dataPoint.data_series_label] = dataPoint.data_series_value;
                        });
                        return dataObject;
                    });
                    setChartData(chData);

                    const chConfig: ChartConfig = {};
                    data.chart.data.forEach((row: zInfer<typeof DataRow>) => {
                        row.data_series.forEach((dataPoint: zInfer<typeof DataSeries>) => {
                            if (!chConfig[dataPoint.data_series_label]) {
                                chConfig[dataPoint.data_series_label] = {
                                    label: dataPoint.data_series_label,
                                    color: `hsl(var(--chart-${Math.floor(Math.random() * 5) + 1}))`,
                                };
                            }
                        });
                    });
                    setChartConfig(chConfig);
                }

                const string_text = JSON.stringify(data.chart, null, 2);

                setChatHistory(prev => [...prev, { role: 'agent', content: string_text }]);
            } catch (error) {
                console.error('Error:', error);
            }

            setMessage('')

            // Simulate agent response after 1 second
            setTimeout(() => {
                setChatHistory(prev => [...prev, { role: 'agent', content: 'Here\'s the chart you requested. You can customize it using the panel on the right.' }])
                setIsFullScreen(false)
            }, 1000)
        }
    }

    // console.log("chartData", chartData);
    // console.log("chartConfig", chartConfig);
    // console.log("chart", chart);

    return (
        <div
            className={`flex ${isFullScreen ? 'items-center justify-center' : ''}`}
            style={{ height: 'calc(100vh - 4rem)' }}
        >
            <div className="flex w-full h-full">
                {isFullScreen && (
                    <div
                        className="w-full p-4 border-r"
                    >
                        <ChatInterface
                            chatHistory={chatHistory}
                            message={message}
                            setMessage={setMessage}
                            handleSubmit={handleSubmit}
                            handleDemo={handleDemo}
                        />
                    </div>
                )}
                {!isFullScreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-row w-full h-full"
                    >
                        <motion.div
                            initial={{ width: '20%', opacity: 0 }}
                            animate={{ width: '20%', opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 border-r"
                        >
                            <ChatInterface
                                chatHistory={chatHistory}
                                message={message}
                                setMessage={setMessage}
                                handleSubmit={handleSubmit}
                                handleDemo={handleDemo}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '60%' }}
                            transition={{ duration: 0.3 }}
                            className="p-4 border-r"
                        >
                            <ChartView
                                chart={chart}
                                chartData={chartData}
                                chartConfig={chartConfig}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '20%' }}
                            transition={{ duration: 0.5 }}
                            className="p-4"
                        >
                            <ChartSettings
                                chart={chart}
                                setChart={setChart}
                                updateChartUI={updateChartUI}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div >
    )
}