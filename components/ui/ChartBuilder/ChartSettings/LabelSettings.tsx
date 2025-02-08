import { Chart } from "@/types/chart";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import ColorPicker from "@/components/ui/color-picker";

interface LabelSettingsProps {
    chart: Chart;
    setChart: (chart: Chart) => void;
}

const labelPositions = ['top', 'left', 'right', 'bottom', 'inside', 'outside', 'insideLeft',
    'insideRight', 'insideTop', 'insideBottom', 'insideTopLeft', 'insideBottomLeft',
    'insideTopRight', 'insideBottomRight', 'insideStart', 'insideEnd', 'end', 'center'
] as const;

export default function LabelSettings({ chart, setChart }: LabelSettingsProps) {
    const updateLabel = (dataKey: string, field: string, value: any) => {
        setChart({
            ...chart,
            labels: chart.labels.map(label =>
                label.dataKey === dataKey ? { ...label, [field]: value } : label
            )
        });
    };

    return (
        <div className="space-y-4 mb-8">
            <h1 className="text-2xl font-semibold">Label Settings</h1>
            {chart.labels.map((label) => (
                <div key={label.dataKey} className="space-y-4 p-4 border rounded">
                    <h1 className="text-lg font-semibold">{label.dataKey}</h1>
                    <div className="flex items-center justify-between">
                        <label htmlFor={`label-switch-${label.dataKey}`} className="text-sm font-medium">
                            Labels
                        </label>
                        <Switch
                            id={`label-switch-${label.dataKey}`}
                            checked={label.enabled}
                            onCheckedChange={(checked) =>
                                updateLabel(label.dataKey, 'enabled', checked)
                            }
                        />
                    </div>

                    {label.enabled && (
                        <>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Position</label>
                                <select
                                    value={label.position}
                                    onChange={(e) =>
                                        updateLabel(label.dataKey, 'position', e.target.value)
                                    }
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    {labelPositions.map((pos) => (
                                        <option key={pos} value={pos}>
                                            {pos}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Offset</label>
                                <Slider
                                    value={[label.offset]}
                                    min={0}
                                    max={20}
                                    step={1}
                                    onValueChange={([value]) =>
                                        updateLabel(label.dataKey, 'offset', value)
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Font Size</label>
                                <Slider
                                    value={[label.fontSize]}
                                    min={0}
                                    max={52}
                                    step={1}
                                    onValueChange={([value]) =>
                                        updateLabel(label.dataKey, 'fontSize', value)
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Color</label>
                                <ColorPicker
                                    default_value={label.fill}
                                    onChange={(color) =>
                                        updateLabel(label.dataKey, 'fill', color)
                                    }
                                />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}