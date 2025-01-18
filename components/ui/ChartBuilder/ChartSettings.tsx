import { Chart, ChartUISettings } from "@/types/chart";
import { z } from "zod";

interface ChartSettingsProps {
    chart?: Chart
    setChart: (chart: Chart) => void
    updateChartUI: (updates: Partial<ChartUISettings>) => void
}

export function ChartSettings({ chart, setChart, updateChartUI }: ChartSettingsProps) {
    const handleChartTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!chart) return;
        setChart({
            ...chart,
            chart_type: e.target.value.toLowerCase() as 'area' | 'bar' | 'line' | 'pie' | 'radar' | 'radial' | 'scatter'
        } as Chart)
    }

    const handleCartesianGridChange = (position: string) => {
        updateChartUI({
            cartesianGrid: position === 'true'
        });
    };

    if (!chart) return null;
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Chart Settings</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Chart Type</label>
                    <select
                        value={chart.chart_type.charAt(0).toUpperCase() + chart.chart_type.slice(1)}
                        onChange={handleChartTypeChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option>Area</option>
                        <option>Bar</option>
                        <option>Line</option>
                        <option>Pie</option>
                        <option>Radar</option>
                        <option>Radial</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {chart.ui && 'cartesianGrid' in chart.ui && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cartesian Grid</label>
                        <select
                            value={chart.ui?.cartesianGrid?.toString() ?? 'false'}
                            onChange={(e) => handleCartesianGridChange(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="true">Show</option>
                            <option value="false">Hide</option>
                        </select>
                    </div>
                )}
                {/* Add more UI controls */}
            </div>
        </div>
    )
}