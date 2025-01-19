import { Chart, ChartUISettings, CartesianGridSettings } from "@/types/chart";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

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
            chartType: e.target.value.toLowerCase() as 'area' | 'bar' | 'line' | 'pie' | 'radar' | 'radial' | 'scatter'
        } as Chart)
    }

    const handleCartesianGridChange = (key: keyof z.infer<typeof CartesianGridSettings>, value: any) => {
        if (!chart || !chart.ui || !('cartesianGrid' in chart.ui)) return;

        const currentGrid = chart.ui.cartesianGrid ?? {};

        if (key === 'enabled') {
            updateChartUI({
                cartesianGrid: {
                    ...currentGrid,
                    enabled: value,
                    horizontal: value,
                    vertical: value,
                    fillOpacity: 0,
                }
            });
            return;
        }

        if ((key === 'horizontal' || key === 'vertical') && value === false) {
            const otherKey = key === 'horizontal' ? 'vertical' : 'horizontal';
            const otherValue = currentGrid[otherKey] ?? false;

            updateChartUI({
                cartesianGrid: {
                    ...currentGrid,
                    [key]: false,
                    enabled: otherValue
                }
            });
            return;
        }

        updateChartUI({
            cartesianGrid: {
                ...currentGrid,
                [key]: value
            }
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
                    </select>
                </div>
            </div>

            {chart.ui && 'cartesianGrid' in chart.ui && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Cartesian Grid Settings</h3>

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Enable Grid</label>
                        <Switch
                            checked={chart.ui.cartesianGrid?.enabled ?? false}
                            onCheckedChange={(checked) => handleCartesianGridChange('enabled', checked)}
                        />
                    </div>

                    <div className={`space-y-4 ${!chart.ui.cartesianGrid?.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Horizontal Lines</label>
                            <Switch
                                checked={chart.ui.cartesianGrid?.horizontal ?? false}
                                onCheckedChange={(checked) => handleCartesianGridChange('horizontal', checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Vertical Lines</label>
                            <Switch
                                checked={chart.ui.cartesianGrid?.vertical ?? false}
                                onCheckedChange={(checked) => handleCartesianGridChange('vertical', checked)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stroke Dash Array</label>
                            <Input
                                type="text"
                                value={chart.ui.cartesianGrid?.strokeDasharray ?? ''}
                                onChange={(e) => handleCartesianGridChange('strokeDasharray', e.target.value)}
                                placeholder="e.g., 3 3"
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Background Fill</label>
                            <Input
                                type="color"
                                value={chart.ui.cartesianGrid?.backgroundFill ?? '#ffffff'}
                                onChange={(e) => handleCartesianGridChange('backgroundFill', e.target.value)}
                                className="w-full h-10"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fill Opacity</label>
                            <Slider
                                value={[chart.ui.cartesianGrid?.fillOpacity ?? 0]}
                                onValueChange={(value) => handleCartesianGridChange('fillOpacity', value[0])}
                                min={0}
                                max={1}
                                step={0.01}
                                className="w-full"
                            />
                            <div className="text-xs text-gray-500 mt-1">
                                {chart.ui.cartesianGrid?.fillOpacity?.toFixed(2) ?? '0.00'}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}