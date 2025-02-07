import { Chart } from "@/types/chart";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface YAxisSettingsProps {
    chart: Chart;
    setChart: (chart: Chart) => void;
}

export default function YAxisSettings({ chart, setChart }: YAxisSettingsProps) {
    if (chart.chartType !== 'area' && chart.chartType !== 'bar' && chart.chartType !== 'line' && chart.chartType !== 'scatter') return null;

    return (
        <div className="space-y-4 mb-8">
            <h1 className="text-2xl font-semibold">Y Axis Settings</h1>
            <div className="flex items-center justify-between">
                <h1>Enable Y Axis</h1>
                <Switch
                    checked={chart.yAxis.enabled ?? false}
                    onCheckedChange={(checked) => setChart({ ...chart, yAxis: { ...chart.yAxis, enabled: checked } })}
                />
            </div>
            <div className={`space-y-4 ${!chart.yAxis.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
                <div>
                    <h1>Tick Line</h1>
                    <Switch
                        checked={chart.yAxis.tickLine ?? true}
                        onCheckedChange={(checked) => setChart({ ...chart, yAxis: { ...chart.yAxis, tickLine: checked } })}
                    />
                </div>
                <div>
                    <h1>Axis Line</h1>
                    <Switch
                        checked={chart.yAxis.axisLine ?? true}
                        onCheckedChange={(checked) => setChart({ ...chart, yAxis: { ...chart.yAxis, axisLine: checked } })}
                    />
                </div>
                <div>
                    <h1>Width</h1>
                    <Input
                        type="number"
                        value={chart.yAxis.height ?? 30}
                        onChange={(e) => setChart({ ...chart, yAxis: { ...chart.yAxis, height: parseInt(e.target.value) } })}
                    />
                </div>
                <div>
                    <h1>Orientation</h1>
                    <select
                        value={chart.yAxis.orientation ?? 'bottom'}
                        onChange={(e) => setChart({ ...chart, yAxis: { ...chart.yAxis, orientation: e.target.value as 'top' | 'bottom' } })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="top">Right</option>
                        <option value="bottom">Left</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <h1>Allow Decimals</h1>
                    <Switch
                        checked={chart.yAxis.allowDecimals ?? true}
                        onCheckedChange={(checked) => setChart({ ...chart, yAxis: { ...chart.yAxis, allowDecimals: checked } })}
                    />
                </div>
                <div>
                    <h1>Tick Count</h1>
                    <Input
                        type="number"
                        value={chart.yAxis.tickCount ?? 5}
                        onChange={(e) => setChart({ ...chart, yAxis: { ...chart.yAxis, tickCount: parseInt(e.target.value) } })}
                    />
                </div>
                <div>
                    <h1>Padding Top</h1>
                    <Input
                        type="number"
                        value={chart.yAxis.paddingLeft ?? 0}
                        onChange={(e) => setChart({ ...chart, yAxis: { ...chart.yAxis, paddingLeft: parseInt(e.target.value) } })}
                    />
                </div>
                <div>
                    <h1>Padding Bottom</h1>
                    <Input
                        type="number"
                        value={chart.yAxis.paddingRight ?? 0}
                        onChange={(e) => setChart({ ...chart, yAxis: { ...chart.yAxis, paddingRight: parseInt(e.target.value) } })}
                    />
                </div>
                <div>
                    <h1>Tick Size</h1>
                    <Input
                        type="number"
                        value={chart.yAxis.tickSize ?? 6}
                        onChange={(e) => setChart({ ...chart, yAxis: { ...chart.yAxis, tickSize: parseInt(e.target.value) } })}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <h1>Mirror</h1>
                    <Switch
                        checked={chart.yAxis.mirror ?? false}
                        onCheckedChange={(checked) => setChart({ ...chart, yAxis: { ...chart.yAxis, mirror: checked } })}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <h1>Reversed</h1>
                    <Switch
                        checked={chart.yAxis.reversed ?? false}
                        onCheckedChange={(checked) => setChart({ ...chart, yAxis: { ...chart.yAxis, reversed: checked } })}
                    />
                </div>
            </div>
        </div>
    );
}