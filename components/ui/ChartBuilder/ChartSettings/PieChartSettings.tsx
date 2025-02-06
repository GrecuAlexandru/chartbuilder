import { Chart } from "@/types/chart";
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
                <h1>Center X (%)</h1>
                <Input
                    id="cx"
                    type="text"
                    value={(chart.uiPieCX ?? '50%')}
                    onChange={(e) => setChart({ ...chart, uiPieCX: e.target.value })}
                />
            </div>
            <div>
                <h1>Center Y (%)</h1>
                <Input
                    id="cy"
                    type="text"
                    value={(chart.uiPieCY ?? '50%')}
                    onChange={(e) => setChart({ ...chart, uiPieCY: e.target.value })}
                />
            </div>
            <div>
                <h1>Inner Radius</h1>
                <Input
                    id="innerRadius"
                    type="number"
                    value={chart.uiPieInnerRadius ?? 0}
                    onChange={(e) => setChart({ ...chart, uiPieInnerRadius: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <h1>Outer Radius</h1>
                <Input
                    id="outerRadius"
                    type="number"
                    value={chart.uiPieOuterRadius ?? 80}
                    onChange={(e) => setChart({ ...chart, uiPieOuterRadius: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <h1>Start Angle</h1>
                <Input
                    id="startAngle"
                    type="number"
                    value={chart.uiPieStartAngle ?? 0}
                    onChange={(e) => setChart({ ...chart, uiPieStartAngle: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <h1>End Angle</h1>
                <Input
                    id="endAngle"
                    type="number"
                    value={chart.uiPieEndAngle ?? 360}
                    onChange={(e) => setChart({ ...chart, uiPieEndAngle: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <h1>Minimum Angle</h1>
                <Input
                    id="minAngle"
                    type="number"
                    value={chart.uiPieMinAngle ?? 0}
                    onChange={(e) => setChart({ ...chart, uiPieMinAngle: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <h1>Padding Angle</h1>
                <Input
                    id="paddingAngle"
                    type="number"
                    value={chart.uiPiePaddingAngle ?? 0}
                    onChange={(e) => setChart({ ...chart, uiPiePaddingAngle: parseInt(e.target.value) })}
                />
            </div>
            <div>
                <h1>Active Segment</h1>
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