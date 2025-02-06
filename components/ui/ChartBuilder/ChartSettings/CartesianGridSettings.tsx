import { Chart } from "@/types/chart";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import ColorPicker from "@/components/ui/color-picker";

interface CartesianGridSettingsProps {
    chart: Chart;
    setChart: (chart: Chart) => void;
}

export default function CartesianGridSettings({ chart, setChart }: CartesianGridSettingsProps) {
    if (chart.chartType !== 'bar' && chart.chartType !== 'area' && chart.chartType !== 'line' && chart.chartType !== 'scatter') return null;

    return (
        <div className="space-y-4 mb-8">
            <h1 className="text-2xl font-semibold">Cartesian Grid Settings</h1>
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
                    <ColorPicker
                        default_value={chart.cartesianGrid.backgroundFill ?? '#ffffff'}
                        onChange={(color) => setChart({ ...chart, cartesianGrid: { ...chart.cartesianGrid, backgroundFill: color } })}
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
                        {chart.cartesianGrid.fillOpacity?.toFixed(2) ?? '0.00'}
                    </div>
                </div>
            </div>
        </div>
    );
}