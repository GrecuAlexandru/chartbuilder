import { Chart } from "@/types/chart";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

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

            {/* {chart.chartType === 'bar' && chart.ui && 'settings' in chart.ui && (
                <div className="space-y-4 mt-4">
                    <h3 className="text-lg font-semibold">Bar Chart Settings</h3>
                    <div>
                        <Label htmlFor="width">Width</Label>
                        <Input
                            id="width"
                            type="number"
                            value={chart.ui.settings?.width ?? ''}
                            onChange={(e) => handleBarChartSettingChange('width', parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="height">Height</Label>
                        <Input
                            id="height"
                            type="number"
                            value={chart.ui.settings?.height ?? ''}
                            onChange={(e) => handleBarChartSettingChange('height', parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="barCategoryGap">Bar Category Gap</Label>
                        <Input
                            id="barCategoryGap"
                            type="text"
                            value={chart.ui.settings?.barCategoryGap ?? ''}
                            onChange={(e) => handleBarChartSettingChange('barCategoryGap', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="barGap">Bar Gap</Label>
                        <Input
                            id="barGap"
                            type="text"
                            value={chart.ui.settings?.barGap ?? ''}
                            onChange={(e) => handleBarChartSettingChange('barGap', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="barSize">Bar Size</Label>
                        <Input
                            id="barSize"
                            type="text"
                            value={chart.ui.settings?.barSize ?? ''}
                            onChange={(e) => handleBarChartSettingChange('barSize', e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="stackOffset">Stack Offset</Label>
                        <select
                            id="stackOffset"
                            value={chart.ui.settings?.stackOffset ?? 'none'}
                            onChange={(e) => handleBarChartSettingChange('stackOffset', e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="expand">Expand</option>
                            <option value="none">None</option>
                            <option value="wiggle">Wiggle</option>
                            <option value="silhouette">Silhouette</option>
                            <option value="sign">Sign</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="reverseStackOrder">Reverse Stack Order</Label>
                        <Switch
                            id="reverseStackOrder"
                            checked={chart.ui.settings?.reverseStackOrder ?? false}
                            onCheckedChange={(checked) => handleBarChartSettingChange('reverseStackOrder', checked)}
                        />
                    </div>
                </div>
            )}

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
            )} */}
        </div>
    )
}