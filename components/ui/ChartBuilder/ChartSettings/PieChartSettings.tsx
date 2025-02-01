import { Chart } from "@/types/chart";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PieChartSettingsProps {
    chart: Chart;
    setChart: (chart: Chart) => void;
}

export default function PieChartSettings({ chart, setChart }: PieChartSettingsProps) {
    if (chart.chartType !== 'pie') return null;

    return (
        <div className="space-y-4 mb-8">
            <h1 className="text-2xl font-semibold">Pie Chart Settings</h1>
            <div>
                <Label htmlFor="cx">Center X (%)</Label>
                <Input
                    id="cx"
                    type="text"
                    value={(chart.uiPieCX ?? '50%')}
                    onChange={(e) => setChart({ ...chart, uiPieCX: e.target.value })}
                />
            </div>
            <div>
                <Label htmlFor="cy">Center Y (%)</Label>
                <Input
                    id="cy"
                    type="text"
                    value={(chart.uiPieCY ?? '50%')}
                    onChange={(e) => setChart({ ...chart, uiPieCY: e.target.value })}
                />
            </div>
            <div>
                <Label htmlFor="innerRadius">Inner Radius</Label>
                <Input
                    id="innerRadius"
                    type="number"
                    value={chart.uiPieInnerRadius ?? 0}
                    onChange={(e) => setChart({ ...chart, uiPieInnerRadius: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <Label htmlFor="outerRadius">Outer Radius</Label>
                <Input
                    id="outerRadius"
                    type="number"
                    value={chart.uiPieOuterRadius ?? 80}
                    onChange={(e) => setChart({ ...chart, uiPieOuterRadius: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <Label htmlFor="startAngle">Start Angle</Label>
                <Input
                    id="startAngle"
                    type="number"
                    value={chart.uiPieStartAngle ?? 0}
                    onChange={(e) => setChart({ ...chart, uiPieStartAngle: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <Label htmlFor="endAngle">End Angle</Label>
                <Input
                    id="endAngle"
                    type="number"
                    value={chart.uiPieEndAngle ?? 360}
                    onChange={(e) => setChart({ ...chart, uiPieEndAngle: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <Label htmlFor="minAngle">Minimum Angle</Label>
                <Input
                    id="minAngle"
                    type="number"
                    value={chart.uiPieMinAngle ?? 0}
                    onChange={(e) => setChart({ ...chart, uiPieMinAngle: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <Label htmlFor="paddingAngle">Padding Angle</Label>
                <Input
                    id="paddingAngle"
                    type="number"
                    value={chart.uiPiePaddingAngle ?? 0}
                    onChange={(e) => setChart({ ...chart, uiPiePaddingAngle: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <Label htmlFor="activeIndex">Active Segment</Label>
                <Input
                    id="activeIndex"
                    type="number"
                    value={chart.uiPieActiveIndex ?? -1}
                    onChange={(e) => setChart({ ...chart, uiPieActiveIndex: parseInt(e.target.value) })}
                />
            </div>
        </div>
    );
}