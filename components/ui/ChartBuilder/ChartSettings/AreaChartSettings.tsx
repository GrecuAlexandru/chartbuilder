import { Chart } from "@/types/chart";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface AreaSettingsProps {
    chart: Chart;
    setChart: (chart: Chart) => void;
}

export default function AreaChartSettings({ chart, setChart }: AreaSettingsProps) {
    if (chart.chartType !== 'area') return null;

    return (
        <div className="space-y-4 mt-4 mb-8">
            <h1 className="text-2xl font-semibold">Area Chart Settings</h1>
            <div>
                <Label htmlFor="stackOffset">Stack Offset</Label>
                <select
                    id="stackOffset"
                    value={chart.uiAreaChartStackOffset ?? 'none'}
                    onChange={(e) => setChart({ ...chart, uiAreaChartStackOffset: e.target.value as any })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="expand">Expand</option>
                    <option value="none">None</option>
                    <option value="wiggle">Wiggle</option>
                    <option value="silhouette">Silhouette</option>
                </select>
            </div>
            <div>
                <Label htmlFor="areaType">Area Type</Label>
                <select
                    id="areaType"
                    value={chart.uiAreaType ?? 'linear'}
                    onChange={(e) => setChart({ ...chart, uiAreaType: e.target.value as any })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    {['basis', 'basisClosed', 'basisOpen', 'bumpX', 'bumpY', 'bump', 'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter'].map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div>
                <Label htmlFor="areaStroke">Stroke Color</Label>
                <Input
                    id="areaStroke"
                    type="color"
                    value={chart.uiAreaStroke ?? '#000000'}
                    onChange={(e) => setChart({ ...chart, uiAreaStroke: e.target.value })}
                    className="w-full h-10"
                />
            </div>
            <div>
                <Label htmlFor="strokeWidth">Stroke Width</Label>
                <Input
                    id="strokeWidth"
                    type="number"
                    value={chart.uiAreaStrokeWidth ?? 1}
                    onChange={(e) => setChart({ ...chart, uiAreaStrokeWidth: parseInt(e.target.value) })}
                />
            </div>
            <div className="flex items-center justify-between">
                <Label htmlFor="connectNulls">Connect Nulls</Label>
                <Switch
                    id="connectNulls"
                    checked={chart.uiAreaConnectNulls ?? false}
                    onCheckedChange={(checked) => setChart({ ...chart, uiAreaConnectNulls: checked })}
                />
            </div>
        </div>
    );
}