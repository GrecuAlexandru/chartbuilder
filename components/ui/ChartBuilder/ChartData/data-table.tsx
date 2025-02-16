"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnFiltersState,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "./pagination"
import { DataTableViewOptions } from "./view-options"
import { Button } from "@/components/ui/button"

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[]
    data: TData[]
    onDeleteSelected?: (selectedRows: Record<string, boolean>) => void
}

export function DataTable<TData>({
    columns,
    data,
    onDeleteSelected
}: DataTableProps<TData>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    })

    // Get the first filterable column
    const firstColumn = table.getAllColumns().find((column) =>
        typeof column.accessorFn !== "undefined" && column.id !== "select"
    );

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <div className="flex gap-2">
                    {firstColumn && (
                        <Input
                            placeholder={`Filter ${firstColumn.id}...`}
                            value={(firstColumn.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                firstColumn.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                    )}
                    {Object.keys(rowSelection).length > 0 && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                onDeleteSelected?.(rowSelection)
                                setRowSelection({})
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Selected
                        </Button>
                    )}
                </div>
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    )
}