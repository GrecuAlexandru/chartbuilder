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

const ChartType = z.enum([
    "area",
    "bar",
    "line",
    "pie",
    "radar",
    "radial",
    "scatter",
]);

const DataSeries = z.object({
    data_series_label: z.string(),
    data_series_value: z.number(),
})

const DataRow = z.object({
    label: z.string(),
    data_series: z.array(DataSeries),
});

const Chart = z.object({
    chart_type: ChartType,
    data: z.array(DataRow),
    display_legend: z.boolean().optional(),
    display_label: z.boolean().optional(),
    display_x_axis: z.boolean().optional(),
    display_y_axis: z.boolean().optional(),
    area_chart_stacked: z.boolean().optional(),
    bar_chart_horizontal: z.boolean().optional(),
    bar_chart_negative: z.boolean().optional(),
    line_chart_linear: z.boolean().optional(),
    line_chart_dots: z.boolean().optional(),
    pie_chart_labels: z.boolean().optional(),
    pie_chart_donut: z.boolean().optional(),
    pie_chart_donut_with_text: z.boolean().optional(),
    radar_chart_dots: z.boolean().optional(),
    radial_chart_grid: z.boolean().optional(),
    radial_chart_text: z.boolean().optional(),
    scatter_chart_three_dim: z.boolean().optional(),
});

const demoAreaString = `{ "chart_type": "area", "data": [ { "label": "Point1", "data_series": [ { "data_series_label": "Category1", "data_series_value": 4 } ] }, { "label": "Point2", "data_series": [ { "data_series_label": "Category1", "data_series_value": 7 } ] }, { "label": "Point3", "data_series": [ { "data_series_label": "Category1", "data_series_value": 2 } ] } ], "display_legend": true, "display_label": true, "display_x_axis": true, "display_y_axis": true, "area_chart_stacked": false, "bar_chart_horizontal": false, "bar_chart_negative": false, "line_chart_linear": false, "line_chart_dots": false, "pie_chart_labels": false, "pie_chart_donut": false, "pie_chart_donut_with_text": false, "radar_chart_dots": false, "radial_chart_grid": false, "radial_chart_text": false, "scatter_chart_three_dim": false }`;
const demoString = `{ "chart_type": "bar", "data": [ { "label": "Label1", "data_series": [ { "data_series_label": "Category1", "data_series_value": 4 } ] }, { "label": "Label2", "data_series": [ { "data_series_label": "Category1", "data_series_value": 2 } ] }, { "label": "Label3", "data_series": [ { "data_series_label": "Category1", "data_series_value": 7 } ] }, { "label": "Label4", "data_series": [ { "data_series_label": "Category1", "data_series_value": 3 } ] } ], "display_legend": true, "display_label": true, "display_x_axis": true, "display_y_axis": true, "area_chart_stacked": false, "bar_chart_horizontal": false, "bar_chart_negative": false, "line_chart_linear": false, "line_chart_dots": false, "pie_chart_labels": false, "pie_chart_donut": false, "pie_chart_donut_with_text": false, "radar_chart_dots": false, "radial_chart_grid": false, "radial_chart_text": false, "scatter_chart_three_dim": false }`;
const isDemo = false;

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
    })
    const [chartData, setChartData] = useState<{ label: string;[key: string]: any }[]>([])
    const [chartConfig, setChartConfig] = useState<ChartConfig>({})

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (message.trim() || isDemo) {
            if (isDemo) {
                setChatHistory([...chatHistory, { role: 'user', content: message }]);
                setChatHistory(prev => [...prev, { role: 'agent', content: demoAreaString }]);
                setMessage('');

                const data = JSON.parse(demoAreaString);
                setChart(data);

                const chData: { label: string;[key: string]: any }[] = data.data.map((row: zInfer<typeof DataRow>) => {
                    const dataObject: { label: string;[key: string]: any } = { label: row.label };
                    row.data_series.forEach((dataPoint: zInfer<typeof DataSeries>) => {
                        dataObject[dataPoint.data_series_label] = dataPoint.data_series_value;
                    });
                    return dataObject;
                });
                setChartData(chData);

                const chConfig: ChartConfig = {};
                data.data.forEach((row: zInfer<typeof DataRow>) => {
                    row.data_series.forEach((dataPoint: zInfer<typeof DataSeries>) => {
                        if (!chConfig[dataPoint.data_series_label]) {
                            chConfig[dataPoint.data_series_label] = {
                                label: dataPoint.data_series_label,
                                color: `hsl(var(--chart-${Object.keys(chConfig).length + 1}))`,
                            };
                        }
                    });
                });
                setChartConfig(chConfig);

            } else {
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
            }


            // Simulate agent response after 1 second
            setTimeout(() => {
                setChatHistory(prev => [...prev, { role: 'agent', content: 'Here\'s the chart you requested. You can customize it using the panel on the right.' }])
                setIsFullScreen(false)
            }, 1000)
        }
    }

    console.log("chartData", chartData);
    console.log("chartConfig", chartConfig);
    console.log("chart", chart);

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
                            />
                        </motion.div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '60%' }}
                            transition={{ duration: 0.3 }}
                            className="p-4 border-r"
                        >
                            <h2 className="text-2xl font-bold mb-4">Chart View</h2>
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
                        </motion.div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '20%' }}
                            transition={{ duration: 0.5 }}
                            className="p-4"
                        >
                            <h2 className="text-2xl font-bold mb-4">Chart Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Chart Type</label>
                                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                        <option>Bar</option>
                                        <option>Line</option>
                                        <option>Pie</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Color Scheme</label>
                                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                        <option>Default</option>
                                        <option>Pastel</option>
                                        <option>Vibrant</option>
                                    </select>
                                </div>
                                <Button>Update Chart</Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div >
    )
}

interface ChatInterfaceProps {
    chatHistory: { role: string, content: string }[]
    message: string
    setMessage: (message: string) => void
    handleSubmit: (e: React.FormEvent) => void
}

function ChatInterface({ chatHistory, message, setMessage, handleSubmit }: ChatInterfaceProps) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto mb-4">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                            {msg.content}
                        </span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center">
                <Input
                    type="text"
                    placeholder="Type your chart request..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 mr-2"
                />
                <Button type="submit">
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </div>
    )
}
