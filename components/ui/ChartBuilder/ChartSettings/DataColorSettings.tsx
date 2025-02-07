import { Chart } from "@/types/chart";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import ColorPicker from "@/components/ui/color-picker";

interface DataColorSettingsProps {
    chart: Chart;
    chartConfig: any;
    setChart: (chart: Chart) => void;
    setChartConfig: (chartConfig: any) => void;
}

export default function DataColorSettings({ chart, chartConfig, setChartConfig }: DataColorSettingsProps) {
    return (
        <div className="space-y-4 mb-8">
            <h1 className="text-2xl font-semibold">Data Color Settings</h1>
            {Object.entries(chartConfig).map(([seriesLabel, config]: [string, any]) => (
                <div key={seriesLabel}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {seriesLabel} Color
                    </label>
                    <ColorPicker
                        default_value={config.color}
                        onChange={(color) => {
                            setChartConfig({
                                ...chartConfig,
                                [seriesLabel]: {
                                    ...chartConfig[seriesLabel],
                                    color: color
                                }
                            });
                        }}
                    />
                </div>
            ))}
        </div>
    );
}