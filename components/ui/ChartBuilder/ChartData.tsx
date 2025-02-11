import { useState } from 'react';
import { Chart } from "@/types/chart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartConfig } from "@/components/ui/chart";
import { Trash2, Plus } from 'lucide-react';

interface ChartDataProps {
    chart?: Chart;
    chartData: any[];
    chartConfig: ChartConfig;
    setChart: (chart: Chart) => void;
    setChartData: (data: any[]) => void;
    setChartConfig: (config: ChartConfig) => void;
}

export function ChartData({
    chart,
    chartData,
    chartConfig,
    setChart,
    setChartData,
    setChartConfig
}: ChartDataProps) {
    const [newRowLabel, setNewRowLabel] = useState('');

    const handleValueChange = (rowIndex: number, key: string, value: string) => {
        const newData = [...chartData];
        newData[rowIndex][key] = key === 'label' ? value : Number(value);
        setChartData(newData);

        // Update chart data structure
        if (chart) {
            const newChartData = [...chart.data];
            if (key === 'label') {
                newChartData[rowIndex].label = value;
            } else {
                const seriesIndex = newChartData[rowIndex].dataSeries.findIndex(
                    ds => ds.dataSeriesLabel === key
                );
                if (seriesIndex !== -1) {
                    newChartData[rowIndex].dataSeries[seriesIndex].dataSeriesValue = Number(value);
                }
            }
            setChart({ ...chart, data: newChartData });
        }
    };

    const addRow = () => {
        if (!newRowLabel.trim()) return;

        const newDataRow: { label: string;[key: string]: number | string } = { label: newRowLabel };
        Object.keys(chartConfig).forEach(key => {
            if (key !== 'label') {
                newDataRow[key] = 0;
            }
        });
        setChartData([...chartData, newDataRow]);

        // Update chart data structure
        if (chart) {
            const newChartData = [...chart.data];
            const newSeries = Object.keys(chartConfig)
                .filter(key => key !== 'label')
                .map(key => ({
                    dataSeriesLabel: key,
                    dataSeriesValue: 0
                }));
            newChartData.push({
                label: newRowLabel,
                dataSeries: newSeries
            });
            setChart({ ...chart, data: newChartData });
        }

        setNewRowLabel('');
    };

    const deleteRow = (index: number) => {
        const newData = chartData.filter((_, i) => i !== index);
        setChartData(newData);

        // Update chart data structure
        if (chart) {
            const newChartData = chart.data.filter((_, i) => i !== index);
            setChart({ ...chart, data: newChartData });
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Chart Data</h2>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Label</TableHead>
                            {Object.keys(chartConfig).map(key => (
                                key !== 'label' && <TableHead key={key}>{key}</TableHead>
                            ))}
                            <TableHead className="w-16">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {chartData.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell>
                                    <Input
                                        value={row.label}
                                        onChange={(e) => handleValueChange(rowIndex, 'label', e.target.value)}
                                    />
                                </TableCell>
                                {Object.keys(chartConfig).map(key => (
                                    key !== 'label' && (
                                        <TableCell key={key}>
                                            <Input
                                                type="number"
                                                value={row[key]}
                                                onChange={(e) => handleValueChange(rowIndex, key, e.target.value)}
                                            />
                                        </TableCell>
                                    )
                                ))}
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteRow(rowIndex)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex gap-2">
                <Input
                    placeholder="Enter new row label"
                    value={newRowLabel}
                    onChange={(e) => setNewRowLabel(e.target.value)}
                />
                <Button onClick={addRow}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Row
                </Button>
            </div>
        </div>
    );
}