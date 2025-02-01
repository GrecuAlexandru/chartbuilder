import { Chart } from "@/types/chart";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "../button";
import AreaChartSettings from "@/components/ui/ChartBuilder/ChartSettings/AreaChartSettings";
import BarChartSettings from "@/components/ui/ChartBuilder/ChartSettings/BarChartSettings";
import CartesianGridSettings from "@/components/ui/ChartBuilder/ChartSettings/CartesianGridSettings";
import LineChartSettings from "@/components/ui/ChartBuilder/ChartSettings/LineChartSettings";
import RadarChartSettings from "@/components/ui/ChartBuilder/ChartSettings/RadarChartSettings";
import RadialBarChartSettings from "@/components/ui/ChartBuilder/ChartSettings/RadialBarChartSettings";
import PolarGridSettings from "@/components/ui/ChartBuilder/ChartSettings/PolarGridSettings";
import PieChartSettings from "@/components/ui/ChartBuilder/ChartSettings/PieChartSettings";
import XAxisSettings from "@/components/ui/ChartBuilder/ChartSettings/XAxisSettings";
import YAxisSettings from "@/components/ui/ChartBuilder/ChartSettings/YAxisSettings";
import LegendSettings from "@/components/ui/ChartBuilder/ChartSettings/LegendSettings";

interface ChartSettingsProps {
    chart?: Chart
    setChart: (chart: Chart) => void
}

export function ChartSettings({ chart, setChart }: ChartSettingsProps) {
    const handleChartTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!chart) return;
        setChart({
            ...chart,
            chartType: e.target.value.toLowerCase() as 'area' | 'bar' | 'line' | 'pie' | 'radar' | 'radial' | 'scatter'
        } as Chart)
    }

    if (!chart) return null;

    return (
        <ScrollArea className="w-full h-full p-4">
            <h2 className="text-2xl font-bold mb-8">Chart Settings</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Chart Type</label>
                    <select
                        value={chart.chartType.charAt(0).toUpperCase() + chart.chartType.slice(1)}
                        onChange={handleChartTypeChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option>Area</option>
                        <option>Bar</option>
                        <option>Line</option>
                        <option>Pie</option>
                        <option>Radar</option>
                        <option>Radial</option>
                        <option>Scatter</option>
                    </select>
                </div>
            </div>

            {chart.chartType === 'area' && (
                <AreaChartSettings chart={chart} setChart={setChart} />
            )}

            {chart.chartType === 'bar' && (
                <BarChartSettings chart={chart} setChart={setChart} />
            )}

            {chart.chartType == 'bar' || chart.chartType == 'area' || chart.chartType == 'line' || chart.chartType == 'scatter' && (
                <CartesianGridSettings chart={chart} setChart={setChart} />
            )}

            {chart.chartType === 'line' && (
                <LineChartSettings chart={chart} setChart={setChart} />
            )}

            {chart.chartType === 'radar' && (
                <RadarChartSettings chart={chart} setChart={setChart} />
            )}

            {chart.chartType === 'radial' && (
                <RadialBarChartSettings chart={chart} setChart={setChart} />
            )}

            {chart.chartType === 'radar' || chart.chartType === 'radial' && (
                <PolarGridSettings chart={chart} setChart={setChart} />
            )}

            {chart.chartType === 'pie' && (
                <PieChartSettings chart={chart} setChart={setChart} />
            )}

            {chart.chartType === 'bar' || chart.chartType === 'area' || chart.chartType === 'line' || chart.chartType === 'scatter' && (
                <XAxisSettings chart={chart} setChart={setChart} />
            )}

            {chart.chartType === 'bar' || chart.chartType === 'area' || chart.chartType === 'line' || chart.chartType === 'scatter' && (
                <YAxisSettings chart={chart} setChart={setChart} />
            )}

            <LegendSettings chart={chart} setChart={setChart} />
        </ScrollArea>
    )
}