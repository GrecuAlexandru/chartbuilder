import { Chart } from "@/types/chart";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface PolarGridSettingsProps {
    chart: Chart;
    setChart: (chart: Chart) => void;
}

export default function PolarGridSettings({ chart, setChart }: PolarGridSettingsProps) {
    if (chart.chartType !== 'radial' && chart.chartType !== 'radar') return null;

    return (
        <div className="space-y-4 mb-8">
            <h1 className="text-2xl font-semibold">Polar Grid Settings</h1>
            <div className="flex items-center justify-between">
                <h1>Enable Polar Grid</h1>
                <Switch
                    checked={chart.polarGrid?.enabled ?? true}
                    onCheckedChange={(checked) => setChart({ ...chart, polarGrid: { ...chart.polarGrid, enabled: checked } })}
                />
            </div>
            <div className={`space-y-4 ${!chart.polarGrid?.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
                <div>
                    <h1>Inner Radius</h1>
                    <Input
                        type="number"
                        value={chart.polarGrid?.innerRadius ?? 0}
                        onChange={(e) => setChart({ ...chart, polarGrid: { ...chart.polarGrid, innerRadius: parseInt(e.target.value) } })}
                    />
                </div>
                <div>
                    <h1>Outer Radius</h1>
                    <Input
                        type="number"
                        value={chart.polarGrid?.outerRadius ?? 80}
                        onChange={(e) => setChart({ ...chart, polarGrid: { ...chart.polarGrid, outerRadius: parseInt(e.target.value) } })}
                    />
                </div>
                <div>
                    <h1>Polar Angles Count</h1>
                    <Input
                        type="number"
                        value={chart.polarGrid?.polarAnglesCount ?? 6}
                        onChange={(e) => setChart({ ...chart, polarGrid: { ...chart.polarGrid, polarAnglesCount: parseInt(e.target.value) } })}
                    />
                </div>
                <div>
                    <h1>Polar Radius Count</h1>
                    <Input
                        type="number"
                        value={chart.polarGrid?.polarRadiusCount ?? 6}
                        onChange={(e) => setChart({ ...chart, polarGrid: { ...chart.polarGrid, polarRadiusCount: parseInt(e.target.value) } })}
                    />
                </div>
                <div>
                    <h1>Grid Type</h1>
                    <select
                        value={chart.polarGrid?.gridType ?? 'polygon'}
                        onChange={(e) => setChart({ ...chart, polarGrid: { ...chart.polarGrid, gridType: e.target.value as 'circle' | 'polygon' } })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="circle">Circle</option>
                        <option value="polygon">Polygon</option>
                    </select>
                </div>
            </div>
        </div>
    );
}