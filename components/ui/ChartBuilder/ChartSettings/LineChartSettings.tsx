import { Chart } from "@/types/chart";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ColorPicker from "@/components/ui/color-picker";

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
                <h1>Line Type</h1>
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
                <h1>Stroke Color</h1>
                <ColorPicker
                    default_value={chart.uiLineStroke ?? '#000000'}
                    onChange={(color) => setChart({ ...chart, uiLineStroke: color })}
                />
            </div>
            <div>
                <h1>Stroke Width</h1>
                <Input
                    id="lineWidth"
                    type="number"
                    value={chart.uiLineStrokeWidth ?? 1}
                    onChange={(e) => setChart({ ...chart, uiLineStrokeWidth: parseInt(e.target.value) })}
                />
            </div>
            <div className="flex items-center justify-between">
                <h1>Connect Nulls</h1>
                <Switch
                    id="connectNulls"
                    checked={chart.uiLineConnectNulls ?? false}
                    onCheckedChange={(checked) => setChart({ ...chart, uiLineConnectNulls: checked })}
                />
            </div>
        </div>
    );
}