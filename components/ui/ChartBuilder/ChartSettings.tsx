import { Chart } from "@/types/chart";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
                    </select>
                </div>
            </div>

            {chart.chartType === 'bar' && (
                <div className="space-y-4 mt-4 mb-8">
                    <h3 className="text-lg font-semibold">Bar Chart Settings</h3>
                    <div>
                        <Label htmlFor="layout">Layout</Label>
                        <select
                            id="layout"
                            value={chart.uiBarChartLayout ?? 'vertical'}
                            onChange={(e) => setChart({ ...chart, uiBarChartLayout: e.target.value as any })}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="vertical">Vertical</option>
                            <option value="horizontal">Horizontal</option>
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="barCategoryGap">Bar Category Gap</Label>
                        <Input
                            id="barCategoryGap"
                            type="text"
                            value={chart.uiBarChartBarCategoryGap ?? ''}
                            onChange={(e) => setChart({ ...chart, uiBarChartBarCategoryGap: parseInt(e.target.value) })}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="barGap">Bar Gap</Label>
                        <Input
                            id="barGap"
                            type="text"
                            value={chart.uiBarChartBarGap ?? ''}
                            onChange={(e) => setChart({ ...chart, uiBarChartBarGap: parseInt(e.target.value) })}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="barSize">Bar Size</Label>
                        <Input
                            id="barSize"
                            type="text"
                            value={chart.uiBarChartBarSize ?? ''}
                            onChange={(e) => setChart({ ...chart, uiBarChartBarSize: parseInt(e.target.value) })}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="stackOffset">Stack Offset</Label>
                        <select
                            id="stackOffset"
                            value={chart.uiBarChartStackOffset ?? 'none'}
                            onChange={(e) => setChart({ ...chart, uiBarChartStackOffset: e.target.value as any })}
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
                            checked={chart.uiBarChartReverseStackOrder ?? false}
                            onCheckedChange={(checked) => setChart({ ...chart, uiBarChartReverseStackOrder: checked })}
                        />
                    </div>
                </div>
            )}

            {chart.chartType == 'bar' && (
                <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-semibold">Cartesian Grid Settings</h3>
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Enable Grid</label>
                        <Switch
                            checked={chart.cartesianGrid.enabled ?? false}
                            onCheckedChange={(checked) => setChart({ ...chart, cartesianGrid: { ...chart.cartesianGrid, enabled: checked } })}
                        />
                    </div>
                    <div className={`space-y-4 ${!chart.cartesianGrid.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Horizontal Lines</label>
                            <Switch
                                checked={chart.cartesianGrid.horizontal ?? false}
                                onCheckedChange={(checked) => setChart({ ...chart, cartesianGrid: { ...chart.cartesianGrid, horizontal: checked } })}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Vertical Lines</label>
                            <Switch
                                checked={chart.cartesianGrid.vertical ?? false}
                                onCheckedChange={(checked) => setChart({ ...chart, cartesianGrid: { ...chart.cartesianGrid, vertical: checked } })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Background Fill</label>
                            <Input
                                type="color"
                                value={chart.cartesianGrid.backgroundFill ?? '#ffffff'}
                                onChange={(e) => setChart({ ...chart, cartesianGrid: { ...chart.cartesianGrid, backgroundFill: e.target.value } })}
                                className="w-full h-10"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fill Opacity</label>
                            <Slider
                                value={[chart.cartesianGrid.fillOpacity ?? 0]}
                                onValueChange={(value) => setChart({ ...chart, cartesianGrid: { ...chart.cartesianGrid, fillOpacity: value[0] } })}
                                min={0}
                                max={1}
                                step={0.01}
                                className="w-full"
                            />
                            <div className="text-xs text-gray-500 mt-1">
                                {chart.cartesianGrid.fillOpacity.toFixed(2) ?? '0.00'}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {chart.chartType === 'bar' && (
                <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-semibold">X Axis Settings</h3>
                    <div className="flex items-center justify-between">
                        <Label>Enable X Axis</Label>
                        <Switch
                            checked={chart.xAxis.enabled ?? false}
                            onCheckedChange={(checked) => setChart({ ...chart, xAxis: { ...chart.xAxis, enabled: checked } })}
                        />
                    </div>
                    <div className={`space-y-4 ${!chart.xAxis.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
                        <div>
                            <Label>Height</Label>
                            <Input
                                type="number"
                                value={chart.xAxis.height ?? 30}
                                onChange={(e) => setChart({ ...chart, xAxis: { ...chart.xAxis, height: parseInt(e.target.value) } })}
                            />
                        </div>
                        <div>
                            <Label>Orientation</Label>
                            <select
                                value={chart.xAxis.orientation ?? 'bottom'}
                                onChange={(e) => setChart({ ...chart, xAxis: { ...chart.xAxis, orientation: e.target.value as 'top' | 'bottom' } })}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                <option value="top">Top</option>
                                <option value="bottom">Bottom</option>
                            </select>
                        </div>
                        <div>
                            <Label>Type</Label>
                            <select
                                value={chart.xAxis.type ?? 'category'}
                                onChange={(e) => setChart({ ...chart, xAxis: { ...chart.xAxis, type: e.target.value as 'number' | 'category' } })}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                <option value="number">Number</option>
                                <option value="category">Category</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>Allow Decimals</Label>
                            <Switch
                                checked={chart.xAxis.allowDecimals ?? true}
                                onCheckedChange={(checked) => setChart({ ...chart, xAxis: { ...chart.xAxis, allowDecimals: checked } })}
                            />
                        </div>
                        <div>
                            <Label>Tick Count</Label>
                            <Input
                                type="number"
                                value={chart.xAxis.tickCount ?? 5}
                                onChange={(e) => setChart({ ...chart, xAxis: { ...chart.xAxis, tickCount: parseInt(e.target.value) } })}
                            />
                        </div>
                        <div>
                            <Label>Padding Left</Label>
                            <Input
                                type="number"
                                value={chart.xAxis.paddingLeft ?? 0}
                                onChange={(e) => setChart({ ...chart, xAxis: { ...chart.xAxis, paddingLeft: parseInt(e.target.value) } })}
                            />
                        </div>
                        <div>
                            <Label>Padding Right</Label>
                            <Input
                                type="number"
                                value={chart.xAxis.paddingRight ?? 0}
                                onChange={(e) => setChart({ ...chart, xAxis: { ...chart.xAxis, paddingRight: parseInt(e.target.value) } })}
                            />
                        </div>
                        <div>
                            <Label>Tick Size</Label>
                            <Input
                                type="number"
                                value={chart.xAxis.tickSize ?? 6}
                                onChange={(e) => setChart({ ...chart, xAxis: { ...chart.xAxis, tickSize: parseInt(e.target.value) } })}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>Mirror</Label>
                            <Switch
                                checked={chart.xAxis.mirror ?? false}
                                onCheckedChange={(checked) => setChart({ ...chart, xAxis: { ...chart.xAxis, mirror: checked } })}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>Reversed</Label>
                            <Switch
                                checked={chart.xAxis.reversed ?? false}
                                onCheckedChange={(checked) => setChart({ ...chart, xAxis: { ...chart.xAxis, reversed: checked } })}
                            />
                        </div>
                    </div>
                </div>
            )}

            {chart.chartType === 'bar' && (
                <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-semibold">Y Axis Settings</h3>
                    <div className="flex items-center justify-between">
                        <Label>Enable Y Axis</Label>
                        <Switch
                            checked={chart.yAxis.enabled ?? false}
                            onCheckedChange={(checked) => setChart({ ...chart, yAxis: { ...chart.yAxis, enabled: checked } })}
                        />
                    </div>
                </div>
            )}
        </ScrollArea>
    )
}