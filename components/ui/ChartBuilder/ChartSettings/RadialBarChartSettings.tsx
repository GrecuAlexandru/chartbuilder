import { Chart } from "@/types/chart";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface RadialBarChartSettingsProps {
    chart: Chart;
    setChart: (chart: Chart) => void;
}

export default function RadialBarChartSettings({ chart, setChart }: RadialBarChartSettingsProps) {
    if (chart.chartType !== 'radial') return null;

    return (
        <div className="space-y-4 mt-4 mb-8">
            <h1 className="text-2xl font-semibold">Radial Bar Chart Settings</h1>
            <div>
                <Label htmlFor="fillOpacity">Fill Opacity</Label>
                <Slider
                    id="fillOpacity"
                    value={[chart.uiRadialBarFillOpacity ?? 0.8]}
                    onValueChange={(value) => setChart({ ...chart, uiRadialBarFillOpacity: value[0] })}
                    min={0}
                    max={1}
                    step={0.1}
                    className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                    {(chart.uiRadialBarFillOpacity ?? 0.8).toFixed(1)}
                </div>
            </div>
            <div>
                <Label htmlFor="barCategoryGap">Bar Category Gap</Label>
                <Input
                    id="barCategoryGap"
                    type="text"
                    value={chart.uiRadialBarChartBarCategoryGap ?? '10%'}
                    onChange={(e) => setChart({ ...chart, uiRadialBarChartBarCategoryGap: e.target.value })}
                />
            </div>
            <div>
                <Label htmlFor="barGap">Bar Gap</Label>
                <Input
                    id="barGap"
                    type="number"
                    value={chart.uiRadialBarChartBarGap ?? 4}
                    onChange={(e) => setChart({ ...chart, uiRadialBarChartBarGap: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <Label htmlFor="cx">Center X</Label>
                <Input
                    id="cx"
                    type="text"
                    value={chart.uiRadialBarChartCX ?? '50%'}
                    onChange={(e) => setChart({ ...chart, uiRadialBarChartCX: e.target.value })}
                />
            </div>
            <div>
                <Label htmlFor="cy">Center Y</Label>
                <Input
                    id="cy"
                    type="text"
                    value={chart.uiRadialBarChartCY ?? '50%'}
                    onChange={(e) => setChart({ ...chart, uiRadialBarChartCY: e.target.value })}
                />
            </div>
            <div>
                <Label htmlFor="startAngle">Start Angle</Label>
                <Input
                    id="startAngle"
                    type="number"
                    value={chart.uiRadialBarChartStartAngle ?? 0}
                    onChange={(e) => setChart({ ...chart, uiRadialBarChartStartAngle: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <Label htmlFor="endAngle">End Angle</Label>
                <Input
                    id="endAngle"
                    type="number"
                    value={chart.uiRadialBarChartEndAngle ?? 360}
                    onChange={(e) => setChart({ ...chart, uiRadialBarChartEndAngle: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <Label htmlFor="innerRadius">Inner Radius</Label>
                <Input
                    id="innerRadius"
                    type="text"
                    value={chart.uiRadialBarChartInnerRadius ?? '30%'}
                    onChange={(e) => setChart({ ...chart, uiRadialBarChartInnerRadius: e.target.value })}
                />
            </div>
            <div>
                <Label htmlFor="outerRadius">Outer Radius</Label>
                <Input
                    id="outerRadius"
                    type="text"
                    value={chart.uiRadialBarChartOuterRadius ?? '100%'}
                    onChange={(e) => setChart({ ...chart, uiRadialBarChartOuterRadius: e.target.value })}
                />
            </div>
            <div className="flex items-center justify-between">
                <Label htmlFor="background">Show Background</Label>
                <Switch
                    id="background"
                    checked={chart.uiRadialBarBackground ?? false}
                    onCheckedChange={(checked) => setChart({ ...chart, uiRadialBarBackground: checked })}
                />
            </div>
        </div>
    );
}