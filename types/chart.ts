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

const AxisSettings = z.object({
    enabled: z.boolean(),
    height: z.number(),
    orientation: z.enum(['top', 'bottom']),
    type: z.enum(['number', 'category']),
    allowDecimals: z.boolean(),
    tickCount: z.number(),
    paddingLeft: z.number(),
    paddingRight: z.number(),
    tickSize: z.number(),
    mirror: z.boolean(),
    reversed: z.boolean(),
});

const CartesianGridSettings = z.object({
    enabled: z.boolean(),
    horizontal: z.boolean(),
    vertical: z.boolean(),
    backgroundFill: z.string(),
    fillOpacity: z.number(),
});

const DisplaySettings = z.object({
    displayLegend: z.boolean(),
    displayLabel: z.boolean(),
});

// Main Chart Schema
export const Chart = z.discriminatedUnion('chartType', [
    z.object({
        chartType: z.literal('area'),
        data: z.array(DataRow),
        areaChartStacked: z.boolean(),
        xAxis: AxisSettings,
        yAxis: AxisSettings,
        cartesianGrid: CartesianGridSettings,
        display: DisplaySettings,
    }),
    z.object({
        chartType: z.literal('bar'),
        data: z.array(DataRow),
        display: DisplaySettings,
        barChartHorizontal: z.boolean(),
        barChartNegative: z.boolean().optional(),

        // UI Settings

        // Bar Chart
        uiBarChartLayout: z.enum(['vertical', 'horizontal']),
        uiBarChartBarCategoryGap: z.number(),
        uiBarChartBarGap: z.number(),
        uiBarChartBarSize: z.number(),
        uiBarChartStackOffset: z.enum(['expand', 'none', 'wiggle', 'silhouette', 'sign']),
        uiBarChartReverseStackOrder: z.boolean(),

        xAxis: AxisSettings,
        yAxis: AxisSettings,
        cartesianGrid: CartesianGridSettings,
    }),
    z.object({
        chartType: z.literal('line'),
        data: z.array(DataRow),
        display: DisplaySettings,
        lineChartDots: z.boolean(),

        // UI Settings

        xAxis: AxisSettings,
        yAxis: AxisSettings,
        cartesianGrid: CartesianGridSettings,
    }),
    z.object({
        chartType: z.literal('scatter'),
        data: z.array(DataRow),
        display: DisplaySettings,
        scatterChartThreeDimensions: z.boolean(),

        // UI Settings

        xAxis: AxisSettings,
        yAxis: AxisSettings,
        cartesianGrid: CartesianGridSettings,
    }),
    z.object({
        chartType: z.literal('pie'),
        data: z.array(DataRow),
        display: DisplaySettings,
        pieChartDonut: z.boolean(),
    }),
    z.object({
        chartType: z.literal('radar'),
        data: z.array(DataRow),
        display: DisplaySettings,
        radarChartDots: z.boolean(),
    }),
    z.object({
        chartType: z.literal('radial'),
        data: z.array(DataRow),
        display: DisplaySettings,
        radialChartText: z.boolean(),
    }),
]);


export type ChartType = z.infer<typeof ChartType>;
export type DataSeries = z.infer<typeof DataSeries>;
export type DataRow = z.infer<typeof DataRow>;
export type Chart = z.infer<typeof Chart>;