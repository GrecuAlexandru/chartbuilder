import { z } from "zod";

// Chart Types
export const ChartType = z.enum([
    "area",
    "bar",
    "line",
    "pie",
    "radar",
    "radial",
    "scatter",
]);

// Data Structure
export const DataSeries = z.object({
    data_series_label: z.string(),
    data_series_value: z.number(),
});

export const DataRow = z.object({
    label: z.string(),
    data_series: z.array(DataSeries),
});

// UI Settings for different chart types
export const AreaChartUISettings = z.object({
    cartesianGrid: z.boolean().optional(),
});

export const BarChartUISettings = z.object({
    cartesianGrid: z.boolean().optional(),
});

export const LineChartUISettings = z.object({
    cartesianGrid: z.boolean().optional(),
});

export const ScatterChartUISettings = z.object({
    cartesianGrid: z.boolean().optional(),
});

export const PieChartUISettings = z.object({
});

export const RadarChartUISettings = z.object({
});

export const RadialChartUISettings = z.object({
});

// Main Chart Schema
export const Chart = z.discriminatedUnion('chart_type', [
    z.object({
        chart_type: z.literal('area'),
        data: z.array(DataRow),
        display_legend: z.boolean().optional(),
        display_label: z.boolean().optional(),
        display_x_axis: z.boolean().optional(),
        display_y_axis: z.boolean().optional(),
        area_chart_stacked: z.boolean().optional(),
        ui: AreaChartUISettings.optional()
    }),
    z.object({
        chart_type: z.literal('bar'),
        data: z.array(DataRow),
        display_legend: z.boolean().optional(),
        display_label: z.boolean().optional(),
        display_x_axis: z.boolean().optional(),
        display_y_axis: z.boolean().optional(),
        bar_chart_horizontal: z.boolean().optional(),
        bar_chart_negative: z.boolean().optional(),
        ui: BarChartUISettings.optional()
    }),
    z.object({
        chart_type: z.literal('line'),
        data: z.array(DataRow),
        display_legend: z.boolean().optional(),
        display_label: z.boolean().optional(),
        display_x_axis: z.boolean().optional(),
        display_y_axis: z.boolean().optional(),
        line_chart_dots: z.boolean().optional(),
        ui: LineChartUISettings.optional()
    }),
    z.object({
        chart_type: z.literal('scatter'),
        data: z.array(DataRow),
        display_legend: z.boolean().optional(),
        display_label: z.boolean().optional(),
        display_x_axis: z.boolean().optional(),
        display_y_axis: z.boolean().optional(),
        scatter_chart_three_dim: z.boolean().optional(),
        ui: ScatterChartUISettings.optional()
    }),
    z.object({
        chart_type: z.literal('pie'),
        data: z.array(DataRow),
        display_legend: z.boolean().optional(),
        display_label: z.boolean().optional(),
        pie_chart_donut: z.boolean().optional(),
        ui: PieChartUISettings.optional()
    }),
    z.object({
        chart_type: z.literal('radar'),
        data: z.array(DataRow),
        display_legend: z.boolean().optional(),
        display_label: z.boolean().optional(),
        radar_chart_dots: z.boolean().optional(),
        ui: RadarChartUISettings.optional()
    }),
    z.object({
        chart_type: z.literal('radial'),
        data: z.array(DataRow),
        display_legend: z.boolean().optional(),
        display_label: z.boolean().optional(),
        radial_chart_text: z.boolean().optional(),
        ui: RadialChartUISettings.optional()
    }),
]);

export type ChartUISettings =
    | AreaChartUISettings
    | BarChartUISettings
    | LineChartUISettings
    | ScatterChartUISettings
    | PieChartUISettings
    | RadarChartUISettings
    | RadialChartUISettings;

export type ChartType = z.infer<typeof ChartType>;
export type DataSeries = z.infer<typeof DataSeries>;
export type DataRow = z.infer<typeof DataRow>;
export type Chart = z.infer<typeof Chart>;
export type AreaChartUISettings = z.infer<typeof AreaChartUISettings>;
export type BarChartUISettings = z.infer<typeof BarChartUISettings>;
export type LineChartUISettings = z.infer<typeof LineChartUISettings>;
export type ScatterChartUISettings = z.infer<typeof ScatterChartUISettings>;
export type PieChartUISettings = z.infer<typeof PieChartUISettings>;
export type RadarChartUISettings = z.infer<typeof RadarChartUISettings>;
export type RadialChartUISettings = z.infer<typeof RadialChartUISettings>;