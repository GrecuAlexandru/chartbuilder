"use client"
// filepath: /c:/Users/grecozo/Desktop/chartbuilder/components/ui/DynamicTable/PageTableExample.tsx

import { createColumns } from "@/components/ui/ChartBuilder/ChartData/columns"
import { DataTable } from "@/components/ui/ChartBuilder/ChartData/data-table"
import type { Chart } from "@/types/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { Column, Row } from "@tanstack/react-table"

interface ChartDataProps {
    chart?: Chart
    chartData: any[]
    chartConfig: ChartConfig
    setChart: (chart: Chart) => void
    setChartData: (data: any[]) => void
    setChartConfig: (config: ChartConfig) => void
}

export function ChartData({
    chart,
    chartData,
    chartConfig,
    setChart,
    setChartData,
    setChartConfig,
}: ChartDataProps) {
    const handleCellEdit = (row: Row<any>, columnId: string, value: any) => {
        const newData = [...chartData];
        newData[row.index][columnId] = isNaN(value) ? value : Number(value);
        setChartData(newData);
    }

    const handleDeleteRow = (row: Row<any>) => {
        const newData = chartData.filter((_, index) => index !== row.index)
        setChartData(newData)
    }

    const handleDeleteSelected = (selectedRows: Record<string, boolean>) => {
        const newData = chartData.filter((_, index) => !selectedRows[index])
        setChartData(newData)
    }

    // Generate columns dynamically based on data
    const columns = createColumns(chartData, handleDeleteRow, handleCellEdit)

    return (
        <div className="container mx-auto py-10">
            <DataTable
                columns={columns}
                data={chartData}
                onDeleteSelected={handleDeleteSelected}
            />
        </div>
    )
}