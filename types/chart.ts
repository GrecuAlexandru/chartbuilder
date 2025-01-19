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
    enabled: z.boolean().optional(),
    horizontal: z.boolean().optional(),
    vertical: z.boolean().optional(),
    strokeDasharray: z.string().optional(),
    backgroundFill: z.string().optional(),
    fillOpacity: z.number().min(0).max(1).optional(),
});

// UI Settings for different chart types
export const AreaChartUISettings = z.object({
    cartesianGrid: CartesianGridSettings.optional(),
});

export const BarChartUISettings = z.object({
    cartesianGrid: CartesianGridSettings.optional(),
});

export const LineChartUISettings = z.object({
    cartesianGrid: CartesianGridSettings.optional(),
});

export const ScatterChartUISettings = z.object({
    cartesianGrid: CartesianGridSettings.optional(),
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
        displayLegend: z.boolean().optional(),
        displayLabel: z.boolean().optional(),
        displayXAxis: z.boolean().optional(),
        displayYAxis: z.boolean().optional(),
        areaChartStacked: z.boolean().optional(),
        ui: AreaChartUISettings.optional()
    }),
    z.object({
        chartType: z.literal('bar'),
        data: z.array(DataRow),
        displayLegend: z.boolean().optional(),
        displayLabel: z.boolean().optional(),
        displayXAxis: z.boolean().optional(),
        displayYAxis: z.boolean().optional(),
        barChartHorizontal: z.boolean().optional(),
        barChartNegative: z.boolean().optional(),
        ui: BarChartUISettings.optional()
    }),
    z.object({
        chartType: z.literal('line'),
        data: z.array(DataRow),
        displayLegend: z.boolean().optional(),
        displayLabel: z.boolean().optional(),
        displayXAxis: z.boolean().optional(),
        displayYAxis: z.boolean().optional(),
        lineChartDots: z.boolean().optional(),
        ui: LineChartUISettings.optional()
    }),
    z.object({
        chartType: z.literal('scatter'),
        data: z.array(DataRow),
        displayLegend: z.boolean().optional(),
        displayLabel: z.boolean().optional(),
        displayXAxis: z.boolean().optional(),
        displayYAxis: z.boolean().optional(),
        scatterChartThreeDimensions: z.boolean().optional(),
        ui: ScatterChartUISettings.optional()
    }),
    z.object({
        chartType: z.literal('pie'),
        data: z.array(DataRow),
        displayLegend: z.boolean().optional(),
        displayLabel: z.boolean().optional(),
        pieChartDonut: z.boolean().optional(),
        ui: PieChartUISettings.optional()
    }),
    z.object({
        chartType: z.literal('radar'),
        data: z.array(DataRow),
        displayLegend: z.boolean().optional(),
        displayLabel: z.boolean().optional(),
        radarChartDots: z.boolean().optional(),
        ui: RadarChartUISettings.optional()
    }),
    z.object({
        chartType: z.literal('radial'),
        data: z.array(DataRow),
        displayLegend: z.boolean().optional(),
        displayLabel: z.boolean().optional(),
        radialChartText: z.boolean().optional(),
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