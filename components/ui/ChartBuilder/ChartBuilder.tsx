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
import { Chart, DataRow, DataSeries } from "@/types/chart"

const demoString = `{ "chartType": "bar", "data": [ { "label": "Value 1", "dataSeries": [ { "dataSeriesLabel": "Category 1", "dataSeriesValue": 4 } ] }, { "label": "Value 2", "dataSeries": [ { "dataSeriesLabel": "Category 1", "dataSeriesValue": 7 } ] }, { "label": "Value 3", "dataSeries": [ { "dataSeriesLabel": "Category 1", "dataSeriesValue": 2 } ] } ], "display.displayLegend": true, "displayLabel": true, "displayXAxis": true, "displayYAxis": true, "barChartHorizontal": false, "barChartNegative": false, "uiBarChartLayout": "vertical", "uiBarChartBarCategoryGap": 10, "uiBarChartBarGap": 5, "uiBarChartBarSize": 20, "uiBarChartStackOffset": "none", "uiBarChartReverseStackOrder": false, "cartesianGrid.enabled": true, "cartesianGrid.horizontal": true, "cartesianGrid.vertical": true, "cartesianGrid.backgroundFill": "#f0f0f0", "cartesianGrid.fillOpacity": 0.5 }`;

export default function ChartBuilder() {
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState<{ role: string, content: string }[]>([])
    const [isFullScreen, setIsFullScreen] = useState(true)
    const [chart, setChart] = useState<zInfer<typeof Chart>>();
    const [chartData, setChartData] = useState<{ label: string;[key: string]: any }[]>([])
    const [chartConfig, setChartConfig] = useState<ChartConfig>({})

    const handleDemoRequest = () => {
        const demoMessage = 'Bar chart with 3 random values';
        setMessage(demoMessage);

        const event = {
            preventDefault: () => { },
        } as React.FormEvent;

        // Pass message directly instead of relying on state
        handleSubmit(event, demoMessage);
    }


    const handleDemo = () => {
        const data = { chart: JSON.parse(demoString) };
        const validatedChart = Chart.parse(data.chart);
        setChart(validatedChart);

        if (data.chart.chartType === 'pie') {
            const chData: { label: string;[key: string]: any }[] = data.chart.data.map((row: zInfer<typeof DataRow>) => {
                const dataObject: { label: string;[key: string]: any } = { label: row.label };
                row.dataSeries.forEach((dataPoint: zInfer<typeof DataSeries>) => {
                    dataObject[dataPoint.dataSeriesLabel] = dataPoint.dataSeriesValue;
                });
                dataObject['fill'] = `var(--color-${row.label})`;
                return dataObject;
            });
            setChartData(chData);

            const chConfig: ChartConfig = {};
            chConfig[data.chart.data[0].dataSeries[0].dataSeriesLabel] = {
                label: data.chart.data[0].dataSeries[0].dataSeriesLabel,
            };
            data.chart.data.forEach((row: zInfer<typeof DataRow>) => {
                if (!chConfig[row.label]) {
                    chConfig[row.label] = {
                        label: row.label,
                        color: '#4287f5',
                    };
                }
            });
            setChartConfig(chConfig);
        } else {
            const chData: { label: string;[key: string]: any }[] = data.chart.data.map((row: zInfer<typeof DataRow>) => {
                const dataObject: { label: string;[key: string]: any } = { label: row.label };
                row.dataSeries.forEach((dataPoint: zInfer<typeof DataSeries>) => {
                    dataObject[dataPoint.dataSeriesLabel] = dataPoint.dataSeriesValue;
                });
                return dataObject;
            });
            setChartData(chData);

            const chConfig: ChartConfig = {};
            data.chart.data.forEach((row: zInfer<typeof DataRow>) => {
                row.dataSeries.forEach((dataPoint: zInfer<typeof DataSeries>) => {
                    if (!chConfig[dataPoint.dataSeriesLabel]) {
                        chConfig[dataPoint.dataSeriesLabel] = {
                            label: dataPoint.dataSeriesLabel,
                            color: '#4287f5',
                        };
                    }
                });
            });
            setChartConfig(chConfig);
        }

        const string_text = JSON.stringify(data.chart, null, 2);

        setChatHistory(prev => [...prev, { role: 'assistant', content: string_text }]);

        setMessage('')

        // Simulate agent response after 1 second
        setTimeout(() => {
            setIsFullScreen(false)
        }, 1000)
    }

    const handleSubmit = async (e: React.FormEvent, forcedMessage?: string) => {
        e.preventDefault();
        const messageToUse = forcedMessage || message;

        if (!messageToUse.trim()) return;

        const msg = messageToUse;
        setMessage('');
        if (msg.trim()) {
            const oldHistory = chatHistory;
            const newHistory = [...chatHistory, { role: 'user', content: msg }];
            setChatHistory(newHistory);
            try {
                const response = await fetch('/api/chartbot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: msg,
                        history: oldHistory // Send existing chat history
                    }),
                });

                const data = await response.json();
                const validatedChart = Chart.parse(data.chart);
                setChart(validatedChart);

                if (data.chart.chartType === 'pie') {
                    const chData: { label: string;[key: string]: any }[] = data.chart.data.map((row: zInfer<typeof DataRow>) => {
                        const dataObject: { label: string;[key: string]: any } = { label: row.label };
                        row.dataSeries.forEach((dataPoint: zInfer<typeof DataSeries>) => {
                            dataObject[dataPoint.dataSeriesLabel] = dataPoint.dataSeriesValue;
                        });
                        dataObject['fill'] = `var(--color-${row.label})`;
                        return dataObject;
                    });
                    setChartData(chData);

                    const chConfig: ChartConfig = {};
                    chConfig[data.chart.data[0].dataSeries[0].dataSeriesLabel] = {
                        label: data.chart.data[0].dataSeries[0].dataSeriesLabel,
                    };
                    data.chart.data.forEach((row: zInfer<typeof DataRow>) => {
                        if (!chConfig[row.label]) {
                            chConfig[row.label] = {
                                label: row.label,
                                color: '#4287f5',
                            };
                        }
                    });
                    setChartConfig(chConfig);
                } else {
                    const chData: { label: string;[key: string]: any }[] = data.chart.data.map((row: zInfer<typeof DataRow>) => {
                        const dataObject: { label: string;[key: string]: any } = { label: row.label };
                        row.dataSeries.forEach((dataPoint: zInfer<typeof DataSeries>) => {
                            dataObject[dataPoint.dataSeriesLabel] = dataPoint.dataSeriesValue;
                        });
                        return dataObject;
                    });
                    setChartData(chData);

                    const chConfig: ChartConfig = {};
                    data.chart.data.forEach((row: zInfer<typeof DataRow>) => {
                        row.dataSeries.forEach((dataPoint: zInfer<typeof DataSeries>) => {
                            if (!chConfig[dataPoint.dataSeriesLabel]) {
                                chConfig[dataPoint.dataSeriesLabel] = {
                                    label: dataPoint.dataSeriesLabel,
                                    color: '#4287f5',
                                };
                            }
                        });
                    });
                    setChartConfig(chConfig);

                    if (validatedChart.valueLabels) {
                        validatedChart.valueLabels.forEach(valueLabel => {
                            valueLabel.position = 'top';
                        });
                    }
                }

                // Update chat history with response
                const string_text = JSON.stringify(data.chart, null, 2);
                setChatHistory(prev => [...prev, { role: 'assistant', content: string_text }]);

            } catch (error) {
                console.error('Error:', error);
            }

            // Simulate agent response after 1 second
            setTimeout(() => {
                setIsFullScreen(false)
            }, 1000)
        }
    }

    // console.log("chartData", chartData);
    console.log("chartConfig", JSON.stringify(chartConfig, null, 2));
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
                            handleDemoRequest={handleDemoRequest}
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
                            className="border-r"
                        >
                            <ChatInterface
                                chatHistory={chatHistory}
                                message={message}
                                setMessage={setMessage}
                                handleSubmit={handleSubmit}
                                handleDemo={handleDemo}
                                handleDemoRequest={handleDemoRequest}
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
                        >
                            <ChartSettings
                                chart={chart}
                                chartConfig={chartConfig}
                                setChart={setChart}
                                setChartConfig={setChartConfig}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div >
    )
}