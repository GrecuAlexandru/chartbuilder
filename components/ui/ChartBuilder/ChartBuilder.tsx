'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "motion/react"
import { z, infer as zInfer } from "zod";
import { ChartConfig } from "@/components/ui/chart"
import { ChatInterface } from "@/components/ui/ChartBuilder/ChatInterface"
import { ChartView } from "@/components/ui/ChartBuilder/ChartView"
import { ChartCode } from "@/components/ui/ChartBuilder/ChartCode";
import { ChartSettings } from "@/components/ui/ChartBuilder/ChartSettings"
import { ChartData } from "@/components/ui/ChartBuilder/ChartData"
import { Chart, DataRow, DataSeries } from "@/types/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const demoString = `{ "chartType": "bar", "data": [ { "label": "Value 1", "dataSeries": [ { "dataSeriesLabel": "Category 1", "dataSeriesValue": 4 } ] }, { "label": "Value 2", "dataSeries": [ { "dataSeriesLabel": "Category 1", "dataSeriesValue": 7 } ] }, { "label": "Value 3", "dataSeries": [ { "dataSeriesLabel": "Category 1", "dataSeriesValue": 2 } ] } ], "display.displayLegend": true, "displayLabel": true, "displayXAxis": true, "displayYAxis": true, "barChartHorizontal": false, "barChartNegative": false, "uiBarChartLayout": "vertical", "uiBarChartBarCategoryGap": 10, "uiBarChartBarGap": 5, "uiBarChartBarSize": 20, "uiBarChartStackOffset": "none", "uiBarChartReverseStackOrder": false, "cartesianGrid.enabled": true, "cartesianGrid.horizontal": true, "cartesianGrid.vertical": true, "cartesianGrid.backgroundFill": "#f0f0f0", "cartesianGrid.fillOpacity": 0.5 }`;

export default function ChartBuilder() {
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState<{ role: string, content: string }[]>([])
    const [isFullScreen, setIsFullScreen] = useState(true)
    const [chart, setChart] = useState<zInfer<typeof Chart>>();
    const [chartData, setChartData] = useState<{ label: string;[key: string]: any }[]>([])
    const [chartConfig, setChartConfig] = useState<ChartConfig>({})

    // Add this function before the return statement
    const handleRequestSelect = (value: string) => {
        var msg = '';
        switch (value) {
            case 'bar3':
                setMessage('Bar chart with 3 random values under 1 category')
                msg = 'Bar chart with 3 random values under 1 category'
                break
            case 'areabig':
                setMessage('Area chart with the following data: const chartData = [  { date: "2024-04-01", desktop: 222, mobile: 150 },  { date: "2024-04-02", desktop: 97, mobile: 180 },  { date: "2024-04-03", desktop: 167, mobile: 120 },  { date: "2024-04-04", desktop: 242, mobile: 260 },  { date: "2024-04-05", desktop: 373, mobile: 290 },  { date: "2024-04-06", desktop: 301, mobile: 340 },  { date: "2024-04-07", desktop: 245, mobile: 180 },  { date: "2024-04-08", desktop: 409, mobile: 320 },  { date: "2024-04-09", desktop: 59, mobile: 110 },  { date: "2024-04-10", desktop: 261, mobile: 190 },  { date: "2024-04-11", desktop: 327, mobile: 350 },  { date: "2024-04-12", desktop: 292, mobile: 210 },  { date: "2024-04-13", desktop: 342, mobile: 380 },  { date: "2024-04-14", desktop: 137, mobile: 220 },  { date: "2024-04-15", desktop: 120, mobile: 170 },  { date: "2024-04-16", desktop: 138, mobile: 190 },  { date: "2024-04-17", desktop: 446, mobile: 360 },  { date: "2024-04-18", desktop: 364, mobile: 410 },  { date: "2024-04-19", desktop: 243, mobile: 180 },  { date: "2024-04-20", desktop: 89, mobile: 150 },  { date: "2024-04-21", desktop: 137, mobile: 200 },  { date: "2024-04-22", desktop: 224, mobile: 170 },  { date: "2024-04-23", desktop: 138, mobile: 230 },  { date: "2024-04-24", desktop: 387, mobile: 290 },  { date: "2024-04-25", desktop: 215, mobile: 250 },  { date: "2024-04-26", desktop: 75, mobile: 130 },  { date: "2024-04-27", desktop: 383, mobile: 420 },  { date: "2024-04-28", desktop: 122, mobile: 180 },  { date: "2024-04-29", desktop: 315, mobile: 240 },  { date: "2024-04-30", desktop: 454, mobile: 380 },  { date: "2024-05-01", desktop: 165, mobile: 220 },  { date: "2024-05-02", desktop: 293, mobile: 310 },  { date: "2024-05-03", desktop: 247, mobile: 190 },  { date: "2024-05-04", desktop: 385, mobile: 420 },  { date: "2024-05-05", desktop: 481, mobile: 390 },  { date: "2024-05-06", desktop: 498, mobile: 520 },  { date: "2024-05-07", desktop: 388, mobile: 300 },  { date: "2024-05-08", desktop: 149, mobile: 210 },  { date: "2024-05-09", desktop: 227, mobile: 180 },  { date: "2024-05-10", desktop: 293, mobile: 330 },  { date: "2024-05-11", desktop: 335, mobile: 270 },  { date: "2024-05-12", desktop: 197, mobile: 240 },  { date: "2024-05-13", desktop: 197, mobile: 160 }, { date: "2024-05-14", desktop: 448, mobile: 490 },  { date: "2024-05-15", desktop: 473, mobile: 380 },  { date: "2024-05-16", desktop: 338, mobile: 400 },  { date: "2024-05-17", desktop: 499, mobile: 420 },  { date: "2024-05-18", desktop: 315, mobile: 350 },  { date: "2024-05-19", desktop: 235, mobile: 180 },  { date: "2024-05-20", desktop: 177, mobile: 230 },  { date: "2024-05-21", desktop: 82, mobile: 140 },  { date: "2024-05-22", desktop: 81, mobile: 120 },  { date: "2024-05-23", desktop: 252, mobile: 290 },  { date: "2024-05-24", desktop: 294, mobile: 220 },  { date: "2024-05-25", desktop: 201, mobile: 250 },  { date: "2024-05-26", desktop: 213, mobile: 170 },  { date: "2024-05-27", desktop: 420, mobile: 460 },  { date: "2024-05-28", desktop: 233, mobile: 190 },  { date: "2024-05-29", desktop: 78, mobile: 130 },  { date: "2024-05-30", desktop: 340, mobile: 280 },  { date: "2024-05-31", desktop: 178, mobile: 230 },  { date: "2024-06-01", desktop: 178, mobile: 200 },  { date: "2024-06-02", desktop: 470, mobile: 410 },  { date: "2024-06-03", desktop: 103, mobile: 160 },  { date: "2024-06-04", desktop: 439, mobile: 380 },  { date: "2024-06-05", desktop: 88, mobile: 140 },  { date: "2024-06-06", desktop: 294, mobile: 250 },  { date: "2024-06-07", desktop: 323, mobile: 370 },  { date: "2024-06-08", desktop: 385, mobile: 320 },  { date: "2024-06-09", desktop: 438, mobile: 480 },  { date: "2024-06-10", desktop: 155, mobile: 200 },  { date: "2024-06-11", desktop: 92, mobile: 150 },  { date: "2024-06-12", desktop: 492, mobile: 420 },  { date: "2024-06-13", desktop: 81, mobile: 130 },  { date: "2024-06-14", desktop: 426, mobile: 380 },  { date: "2024-06-15", desktop: 307, mobile: 350 },  { date: "2024-06-16", desktop: 371, mobile: 310 },  { date: "2024-06-17", desktop: 475, mobile: 520 },  { date: "2024-06-18", desktop: 107, mobile: 170 },  { date: "2024-06-19", desktop: 341, mobile: 290 },  { date: "2024-06-20", desktop: 408, mobile: 450 },  { date: "2024-06-21", desktop: 169, mobile: 210 },  { date: "2024-06-22", desktop: 317, mobile: 270 },  { date: "2024-06-23", desktop: 480, mobile: 530 },  { date: "2024-06-24", desktop: 132, mobile: 180 },  { date: "2024-06-25", desktop: 141, mobile: 190 },  { date: "2024-06-26", desktop: 434, mobile: 380 },  { date: "2024-06-27", desktop: 448, mobile: 490 },  { date: "2024-06-28", desktop: 149, mobile: 200 },  { date: "2024-06-29", desktop: 103, mobile: 160 },  { date: "2024-06-30", desktop: 446, mobile: 400 },]const chartConfig = {  visitors: {    label: "Visitors",  },  desktop: {    label: "Desktop",    color: "hsl(var(--chart-1))",  },  mobile: {    label: "Mobile",    color: "hsl(var(--chart-2))",  },} satisfies ChartConfig')
                msg = 'Area chart with the following data: const chartData = [  { date: "2024-04-01", desktop: 222, mobile: 150 },  { date: "2024-04-02", desktop: 97, mobile: 180 },  { date: "2024-04-03", desktop: 167, mobile: 120 },  { date: "2024-04-04", desktop: 242, mobile: 260 },  { date: "2024-04-05", desktop: 373, mobile: 290 },  { date: "2024-04-06", desktop: 301, mobile: 340 },  { date: "2024-04-07", desktop: 245, mobile: 180 },  { date: "2024-04-08", desktop: 409, mobile: 320 },  { date: "2024-04-09", desktop: 59, mobile: 110 },  { date: "2024-04-10", desktop: 261, mobile: 190 },  { date: "2024-04-11", desktop: 327, mobile: 350 },  { date: "2024-04-12", desktop: 292, mobile: 210 },  { date: "2024-04-13", desktop: 342, mobile: 380 },  { date: "2024-04-14", desktop: 137, mobile: 220 },  { date: "2024-04-15", desktop: 120, mobile: 170 },  { date: "2024-04-16", desktop: 138, mobile: 190 },  { date: "2024-04-17", desktop: 446, mobile: 360 },  { date: "2024-04-18", desktop: 364, mobile: 410 },  { date: "2024-04-19", desktop: 243, mobile: 180 },  { date: "2024-04-20", desktop: 89, mobile: 150 },  { date: "2024-04-21", desktop: 137, mobile: 200 },  { date: "2024-04-22", desktop: 224, mobile: 170 },  { date: "2024-04-23", desktop: 138, mobile: 230 },  { date: "2024-04-24", desktop: 387, mobile: 290 },  { date: "2024-04-25", desktop: 215, mobile: 250 },  { date: "2024-04-26", desktop: 75, mobile: 130 },  { date: "2024-04-27", desktop: 383, mobile: 420 },  { date: "2024-04-28", desktop: 122, mobile: 180 },  { date: "2024-04-29", desktop: 315, mobile: 240 },  { date: "2024-04-30", desktop: 454, mobile: 380 },  { date: "2024-05-01", desktop: 165, mobile: 220 },  { date: "2024-05-02", desktop: 293, mobile: 310 },  { date: "2024-05-03", desktop: 247, mobile: 190 },  { date: "2024-05-04", desktop: 385, mobile: 420 },  { date: "2024-05-05", desktop: 481, mobile: 390 },  { date: "2024-05-06", desktop: 498, mobile: 520 },  { date: "2024-05-07", desktop: 388, mobile: 300 },  { date: "2024-05-08", desktop: 149, mobile: 210 },  { date: "2024-05-09", desktop: 227, mobile: 180 },  { date: "2024-05-10", desktop: 293, mobile: 330 },  { date: "2024-05-11", desktop: 335, mobile: 270 },  { date: "2024-05-12", desktop: 197, mobile: 240 },  { date: "2024-05-13", desktop: 197, mobile: 160 }, { date: "2024-05-14", desktop: 448, mobile: 490 },  { date: "2024-05-15", desktop: 473, mobile: 380 },  { date: "2024-05-16", desktop: 338, mobile: 400 },  { date: "2024-05-17", desktop: 499, mobile: 420 },  { date: "2024-05-18", desktop: 315, mobile: 350 },  { date: "2024-05-19", desktop: 235, mobile: 180 },  { date: "2024-05-20", desktop: 177, mobile: 230 },  { date: "2024-05-21", desktop: 82, mobile: 140 },  { date: "2024-05-22", desktop: 81, mobile: 120 },  { date: "2024-05-23", desktop: 252, mobile: 290 },  { date: "2024-05-24", desktop: 294, mobile: 220 },  { date: "2024-05-25", desktop: 201, mobile: 250 },  { date: "2024-05-26", desktop: 213, mobile: 170 },  { date: "2024-05-27", desktop: 420, mobile: 460 },  { date: "2024-05-28", desktop: 233, mobile: 190 },  { date: "2024-05-29", desktop: 78, mobile: 130 },  { date: "2024-05-30", desktop: 340, mobile: 280 },  { date: "2024-05-31", desktop: 178, mobile: 230 },  { date: "2024-06-01", desktop: 178, mobile: 200 },  { date: "2024-06-02", desktop: 470, mobile: 410 },  { date: "2024-06-03", desktop: 103, mobile: 160 },  { date: "2024-06-04", desktop: 439, mobile: 380 },  { date: "2024-06-05", desktop: 88, mobile: 140 },  { date: "2024-06-06", desktop: 294, mobile: 250 },  { date: "2024-06-07", desktop: 323, mobile: 370 },  { date: "2024-06-08", desktop: 385, mobile: 320 },  { date: "2024-06-09", desktop: 438, mobile: 480 },  { date: "2024-06-10", desktop: 155, mobile: 200 },  { date: "2024-06-11", desktop: 92, mobile: 150 },  { date: "2024-06-12", desktop: 492, mobile: 420 },  { date: "2024-06-13", desktop: 81, mobile: 130 },  { date: "2024-06-14", desktop: 426, mobile: 380 },  { date: "2024-06-15", desktop: 307, mobile: 350 },  { date: "2024-06-16", desktop: 371, mobile: 310 },  { date: "2024-06-17", desktop: 475, mobile: 520 },  { date: "2024-06-18", desktop: 107, mobile: 170 },  { date: "2024-06-19", desktop: 341, mobile: 290 },  { date: "2024-06-20", desktop: 408, mobile: 450 },  { date: "2024-06-21", desktop: 169, mobile: 210 },  { date: "2024-06-22", desktop: 317, mobile: 270 },  { date: "2024-06-23", desktop: 480, mobile: 530 },  { date: "2024-06-24", desktop: 132, mobile: 180 },  { date: "2024-06-25", desktop: 141, mobile: 190 },  { date: "2024-06-26", desktop: 434, mobile: 380 },  { date: "2024-06-27", desktop: 448, mobile: 490 },  { date: "2024-06-28", desktop: 149, mobile: 200 },  { date: "2024-06-29", desktop: 103, mobile: 160 },  { date: "2024-06-30", desktop: 446, mobile: 400 },]const chartConfig = {  visitors: {    label: "Visitors",  },  desktop: {    label: "Desktop",    color: "hsl(var(--chart-1))",  },  mobile: {    label: "Mobile",    color: "hsl(var(--chart-2))",  },} satisfies ChartConfig'
                break
        }

        const event = {
            preventDefault: () => { },
        } as React.FormEvent;

        // Pass message directly instead of relying on state
        handleSubmit(event, msg);
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
    // console.log("chartConfig", JSON.stringify(chartConfig, null, 2));
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
                            handleRequestSelect={handleRequestSelect}
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
                                handleRequestSelect={handleRequestSelect}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '60%' }}
                            transition={{ duration: 0.3 }}
                            className="p-4 border-r"
                        >
                            <Tabs defaultValue="preview" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="preview">Preview</TabsTrigger>
                                    <TabsTrigger value="data">Data</TabsTrigger>
                                    <TabsTrigger value="code">Code</TabsTrigger>
                                </TabsList>
                                <TabsContent value="preview">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <ChartView chart={chart} chartData={chartData} chartConfig={chartConfig} />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="data">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <ChartData chart={chart} chartData={chartData} chartConfig={chartConfig} setChart={setChart} setChartData={setChartData} setChartConfig={setChartConfig} />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="code">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <ChartCode chart={chart} chartData={chartData} chartConfig={chartConfig} />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
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