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
    dataSeriesLabel: z.string(),
    dataSeriesValue: z.number(),
});

export const DataRow = z.object({
    label: z.string(),
    dataSeries: z.array(DataSeries),
});

export const CartesianGridSettings = z.object({
    enabled: z.boolean(),
    horizontal: z.boolean(),
    vertical: z.boolean(),
    strokeDasharray: z.string(),
    backgroundFill: z.string(),
    fillOpacity: z.number().min(0).max(1)
});

// UI Settings for different chart types
export const AreaChartUISettings = z.object({
    cartesianGrid: CartesianGridSettings
});

export const BarChartUISettings = z.object({
    cartesianGrid: CartesianGridSettings
});

export const LineChartUISettings = z.object({
    cartesianGrid: CartesianGridSettings
});

export const ScatterChartUISettings = z.object({
    cartesianGrid: CartesianGridSettings
});

export const PieChartUISettings = z.object({
});

export const RadarChartUISettings = z.object({
});

export const RadialChartUISettings = z.object({
});

// Main Chart Schema
export const Chart = z.discriminatedUnion('chartType', [
    z.object({
        chartType: z.literal('area'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        displayXAxis: z.boolean(),
        displayYAxis: z.boolean(),
        areaChartStacked: z.boolean(),
        ui: AreaChartUISettings
    }),
    z.object({
        chartType: z.literal('bar'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        displayXAxis: z.boolean(),
        displayYAxis: z.boolean(),
        barChartHorizontal: z.boolean(),
        barChartNegative: z.boolean(),
        ui: BarChartUISettings
    }),
    z.object({
        chartType: z.literal('line'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        displayXAxis: z.boolean(),
        displayYAxis: z.boolean(),
        lineChartDots: z.boolean(),
        ui: LineChartUISettings
    }),
    z.object({
        chartType: z.literal('scatter'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        displayXAxis: z.boolean(),
        displayYAxis: z.boolean(),
        scatterChartThreeDimensions: z.boolean(),
        ui: ScatterChartUISettings
    }),
    z.object({
        chartType: z.literal('pie'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        pieChartDonut: z.boolean(),
        ui: PieChartUISettings
    }),
    z.object({
        chartType: z.literal('radar'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        radarChartDots: z.boolean(),
        ui: RadarChartUISettings
    }),
    z.object({
        chartType: z.literal('radial'),
        data: z.array(DataRow),
        displayLegend: z.boolean(),
        displayLabel: z.boolean(),
        radialChartText: z.boolean(),
        ui: RadialChartUISettings
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