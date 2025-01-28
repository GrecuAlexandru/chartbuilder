/* Chart with default values */


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
    enabled: z.boolean().default(true),
    height: z.number().optional().default(30),
    orientation: z.enum(['top', 'bottom']).optional().default('bottom'),
    type: z.enum(['number', 'category']).optional(),
    allowDecimals: z.boolean().optional().default(true),
    tickCount: z.number().optional().default(5),
    paddingLeft: z.number().optional().default(0),
    paddingRight: z.number().optional().default(0),
    tickSize: z.number().optional().default(6),
    mirror: z.boolean().optional().default(false),
    reversed: z.boolean().optional().default(false),
});

const CartesianGridSettings = z.object({
    enabled: z.boolean().default(true),
    horizontal: z.boolean().optional().default(true),
    vertical: z.boolean().optional().default(true),
    backgroundFill: z.string().default('#fff'),
    fillOpacity: z.number().optional().default(1),
});

const DisplaySettings = z.object({
    displayLegend: z.boolean().default(true),
    displayLabel: z.boolean().default(true),
});

// Main Chart Schema
export const Chart = z.discriminatedUnion('chartType', [
    z.object({
        chartType: z.literal('area'),
        data: z.array(DataRow),
        areaChartStacked: z.boolean(),
        xAxis: AxisSettings.default({
            type: 'category'
        }),
        yAxis: AxisSettings.default({
            type: 'number'
        }),
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
        uiBarChartLayout: z.enum(['vertical', 'horizontal']).optional().default('horizontal'),
        uiBarChartBarCategoryGap: z.number().optional().default(10),
        uiBarChartBarGap: z.number().optional().default(4),
        uiBarChartStackOffset: z.enum(['expand', 'none', 'wiggle', 'silhouette', 'sign']).optional().default('none'),
        uiBarChartReverseStackOrder: z.boolean().optional().default(false),

        // Bar
        uiBarBackgroundFill: z.string().optional().default('false'),

        xAxis: AxisSettings.default({
            type: 'category'
        }),
        yAxis: AxisSettings.default({
            type: 'number'
        }),
        cartesianGrid: CartesianGridSettings,
    }),
    z.object({
        chartType: z.literal('line'),
        data: z.array(DataRow),
        display: DisplaySettings,
        lineChartDots: z.boolean().default(false),

        // UI Settings

        xAxis: AxisSettings.default({
            type: 'category'
        }),
        yAxis: AxisSettings.default({
            type: 'number'
        }),
        cartesianGrid: CartesianGridSettings,
    }),
    z.object({
        chartType: z.literal('scatter'),
        data: z.array(DataRow),
        display: DisplaySettings,
        scatterChartThreeDimensions: z.boolean().default(false),

        // UI Settings

        xAxis: AxisSettings.default({
            type: 'category'
        }),
        yAxis: AxisSettings.default({
            type: 'number'
        }),
        cartesianGrid: CartesianGridSettings,
    }),
    z.object({
        chartType: z.literal('pie'),
        data: z.array(DataRow),
        display: DisplaySettings,
        pieChartDonut: z.boolean().default(false),
    }),
    z.object({
        chartType: z.literal('radar'),
        data: z.array(DataRow),
        display: DisplaySettings,
        radarChartDots: z.boolean().default(false),
    }),
    z.object({
        chartType: z.literal('radial'),
        data: z.array(DataRow),
        display: DisplaySettings,
        radialChartText: z.boolean().default(false),
    }),
]);

export type ChartType = z.infer<typeof ChartType>;
export type DataSeries = z.infer<typeof DataSeries>;
export type DataRow = z.infer<typeof DataRow>;
export type Chart = z.infer<typeof Chart>;