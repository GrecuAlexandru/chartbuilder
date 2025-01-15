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

// UI Settings
export const ChartUISettings = z.object({
    cartesianGrid: z.boolean().optional(),
});

// Main Chart Schema
export const Chart = z.object({
    chart_type: ChartType,
    data: z.array(DataRow),
    display_legend: z.boolean().optional(),
    display_label: z.boolean().optional(),
    display_x_axis: z.boolean().optional(),
    display_y_axis: z.boolean().optional(),
    area_chart_stacked: z.boolean().optional(),
    bar_chart_horizontal: z.boolean().optional(),
    bar_chart_negative: z.boolean().optional(),
    line_chart_linear: z.boolean().optional(),
    line_chart_dots: z.boolean().optional(),
    pie_chart_labels: z.boolean().optional(),
    pie_chart_donut: z.boolean().optional(),
    pie_chart_donut_with_text: z.boolean().optional(),
    radar_chart_dots: z.boolean().optional(),
    radial_chart_grid: z.boolean().optional(),
    radial_chart_text: z.boolean().optional(),
    scatter_chart_three_dim: z.boolean().optional(),
    ui: ChartUISettings.optional()
});

// Type Exports
export type ChartType = z.infer<typeof ChartType>;
export type DataSeries = z.infer<typeof DataSeries>;
export type DataRow = z.infer<typeof DataRow>;
export type ChartUISettings = z.infer<typeof ChartUISettings>;
export type Chart = z.infer<typeof Chart>;