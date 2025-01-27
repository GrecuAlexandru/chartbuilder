/*
    Chart without default values. It doesn't work otherwise.
    The API doesn't replace values that have `.default()`.
*/

import { z } from "zod";

export const ChartType = z.enum([
    "area",
    "bar",
    "line",
    "pie",
    "radar",
    "radial",
    "scatter",
]);

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
    height: z.number().optional(),
    orientation: z.enum(['top', 'bottom']).optional(),
    type: z.enum(['number', 'category']).optional(),
    allowDecimals: z.boolean().optional(),
    tickCount: z.number().optional(),
    paddingLeft: z.number().optional(),
    paddingRight: z.number().optional(),
    tickSize: z.number().optional(),
    mirror: z.boolean().optional(),
    reversed: z.boolean().optional(),
});

const CartesianGridSettings = z.object({
    enabled: z.boolean(),
    horizontal: z.boolean().optional(),
    vertical: z.boolean().optional(),
    backgroundFill: z.string(),
    fillOpacity: z.number().optional(),
});

const DisplaySettings = z.object({
    displayLegend: z.boolean(),
    displayLabel: z.boolean(),
});

// Main Chart Schema
export const ApiChart = z.discriminatedUnion('chartType', [
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
        uiBarChartLayout: z.enum(['vertical', 'horizontal']).optional(),
        uiBarChartBarCategoryGap: z.number().optional(),
        uiBarChartBarGap: z.number().optional(),
        uiBarChartStackOffset: z.enum(['expand', 'none', 'wiggle', 'silhouette', 'sign']).optional(),
        uiBarChartReverseStackOrder: z.boolean().optional(),

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
export type ApiChart = z.infer<typeof ApiChart>;