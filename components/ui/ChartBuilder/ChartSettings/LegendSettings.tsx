import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Chart } from "@/types/chart"; // Assuming you have a Chart type defined
import { SliderInput } from "../../sliderinput";

interface LegendSettingsProps {
    chart: Chart;
    setChart: (chart: Chart) => void;
}

export default function LegendSettings({ chart, setChart }: LegendSettingsProps) {
    return (
        <div className="space-y-4 mb-8">
            <h1 className="text-2xl font-semibold">Legend Settings</h1>
            <div className="flex items-center justify-between">
                <h1>Enable Legend</h1>
                <Switch
                    checked={chart.legend.enabled ?? false}
                    onCheckedChange={(checked) => setChart({ ...chart, legend: { ...chart.legend, enabled: checked } })}
                />
            </div>
            <div className={`space-y-4 ${!chart.legend.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
                <div>
                    <h1>Layout</h1>
                    <select
                        value={chart.legend.layout ?? 'horizontal'}
                        onChange={(e) => setChart({ ...chart, legend: { ...chart.legend, layout: e.target.value as 'horizontal' | 'vertical' } })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="horizontal">Horizontal</option>
                        <option value="vertical">Vertical</option>
                    </select>
                </div>
                <div>
                    <h1>Align</h1>
                    <select
                        value={chart.legend.align ?? 'center'}
                        onChange={(e) => setChart({ ...chart, legend: { ...chart.legend, align: e.target.value as 'left' | 'center' | 'right' } })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </div>
                <div>
                    <h1>Vertical Align</h1>
                    <select
                        value={chart.legend.verticalAlign ?? 'bottom'}
                        onChange={(e) => setChart({ ...chart, legend: { ...chart.legend, verticalAlign: e.target.value as 'top' | 'middle' | 'bottom' } })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="top">Top</option>
                        <option value="middle">Middle</option>
                        <option value="bottom">Bottom</option>
                    </select>
                </div>
                <div>
                    <h1>Icon Size</h1>
                    <SliderInput
                        type="number"
                        min={0}
                        max={20}
                        value={chart.legend.iconSize ?? 14}
                        onChange={(e) => setChart({ ...chart, legend: { ...chart.legend, iconSize: parseInt(e.target.value) } })}
                    />


                </div>
                <div>
                    <h1>Icon Type</h1>
                    <select
                        value={chart.legend.iconType ?? 'rect'}
                        onChange={(e) => setChart({ ...chart, legend: { ...chart.legend, iconType: e.target.value as any } })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {['line', 'plainline', 'square', 'rect', 'circle', 'cross', 'diamond', 'star', 'triangle', 'wye'].map(type => (
                            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}