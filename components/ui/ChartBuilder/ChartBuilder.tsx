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
import { Chart, ChartUISettings, AreaChartUISettings, BarChartUISettings, LineChartUISettings, ScatterChartUISettings, PieChartUISettings, RadarChartUISettings, RadialChartUISettings, DataRow, DataSeries } from "@/types/chart"

const demoString = `{ "chart_type": "bar", "data": [ { "label": "Label1", "data_series": [ { "data_series_label": "Category1", "data_series_value": 12 } ] }, { "label": "Label2", "data_series": [ { "data_series_label": "Category1", "data_series_value": 5 } ] }, { "label": "Label3", "data_series": [ { "data_series_label": "Category1", "data_series_value": 9 } ] }, { "label": "Label4", "data_series": [ { "data_series_label": "Category1", "data_series_value": 6 } ] } ], "display_legend": true, "display_label": false, "display_x_axis": true, "display_y_axis": true, "area_chart_stacked": false, "bar_chart_horizontal": false, "bar_chart_negative": false, "line_chart_linear": false, "line_chart_dots": false, "pie_chart_labels": false, "pie_chart_donut": false, "pie_chart_donut_with_text": false, "radar_chart_dots": false, "radial_chart_grid": false, "radial_chart_text": false, "scatter_chart_three_dim": false }`;

export default function ChartBuilder() {
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState<{ role: string, content: string }[]>([])
    const [isFullScreen, setIsFullScreen] = useState(true)
    const [chart, setChart] = useState<zInfer<typeof Chart>>();
    const [chartData, setChartData] = useState<{ label: string;[key: string]: any }[]>([])
    const [chartConfig, setChartConfig] = useState<ChartConfig>({})

    // Helper function to update UI settings
    const updateChartUI = (updates: Partial<ChartUISettings>) => {
        setChart(prev => {
            if (!prev) return prev;

            // Type guard to ensure UI settings match chart type
            switch (prev.chart_type) {
                case 'area':
                    return {
                        ...prev,
                        ui: {
                            ...prev.ui,
                            ...(updates as AreaChartUISettings)
                        }
                    };
                case 'bar':
                    return {
                        ...prev,
                        ui: {
                            ...prev.ui,
                            ...(updates as BarChartUISettings)
                        }
                    };
                case 'line':
                    return {
                        ...prev,
                        ui: {
                            ...prev.ui,
                            ...(updates as LineChartUISettings)
                        }
                    };
                case 'scatter':
                    return {
                        ...prev,
                        ui: {
                            ...prev.ui,
                            ...(updates as ScatterChartUISettings)
                        }
                    };
                case 'pie':
                    return {
                        ...prev,
                        ui: {
                            ...prev.ui,
                            ...(updates as PieChartUISettings)
                        }
                    };
                case 'radar':
                    return {
                        ...prev,
                        ui: {
                            ...prev.ui,
                            ...(updates as RadarChartUISettings)
                        }
                    };
                case 'radial':
                    return {
                        ...prev,
                        ui: {
                            ...prev.ui,
                            ...(updates as RadialChartUISettings)
                        }
                    };
                default:
                    return prev;
            }
        });
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