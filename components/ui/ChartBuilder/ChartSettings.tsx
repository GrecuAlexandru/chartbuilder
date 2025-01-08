import { Button } from "@/components/ui/button"

interface ChartSettingsProps {
    chart: any  // Use your Chart type here
    setChart: (chart: any) => void  // Function to update chart
}

export function ChartSettings({ chart, setChart }: ChartSettingsProps) {
    const handleChartTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChart({
            ...chart,
            chart_type: e.target.value.toLowerCase()
        })
    }

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
        </div>
    )
}