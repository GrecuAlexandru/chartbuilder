import { Chart } from "@/types/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface LineChartSettingsProps {
    chart: Chart;
    setChart: (chart: Chart) => void;
}

export default function LineChartSettings({ chart, setChart }: LineChartSettingsProps) {
    if (chart.chartType !== 'line') return null;

    return (
        <div className="space-y-4 mt-4 mb-8">
            <h1 className="text-2xl font-semibold">Line Chart Settings</h1>
            <div>
                <Label htmlFor="lineType">Line Type</Label>
                <select
                    id="lineType"
                    value={chart.uiLineType ?? 'linear'}
                    onChange={(e) => setChart({ ...chart, uiLineType: e.target.value as any })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    {['basis', 'basisClosed', 'basisOpen', 'bumpX', 'bumpY', 'bump', 'linear', 'linearClosed', 'natural', 'monotoneX', 'monotoneY', 'monotone', 'step', 'stepBefore', 'stepAfter'].map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div>
                <Label htmlFor="lineStroke">Stroke Color</Label>
                <Input
                    id="lineStroke"
                    type="color"
                    value={chart.uiLineStroke ?? '#000000'}
                    onChange={(e) => setChart({ ...chart, uiLineStroke: e.target.value })}
                    className="w-full h-10"
                />
            </div>
            <div>
                <Label htmlFor="lineWidth">Stroke Width</Label>
                <Input
                    id="lineWidth"
                    type="number"
                    value={chart.uiLineStrokeWidth ?? 1}
                    onChange={(e) => setChart({ ...chart, uiLineStrokeWidth: parseInt(e.target.value) })}
                />
            </div>
            <div className="flex items-center justify-between">
                <Label htmlFor="connectNulls">Connect Nulls</Label>
                <Switch
                    id="connectNulls"
                    checked={chart.uiLineConnectNulls ?? false}
                    onCheckedChange={(checked) => setChart({ ...chart, uiLineConnectNulls: checked })}
                />
            </div>
        </div>
    );
}