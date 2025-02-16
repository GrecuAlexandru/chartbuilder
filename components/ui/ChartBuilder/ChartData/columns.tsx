"use client"

import * as React from "react"
import type { ColumnDef, Row, Column } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/ChartBuilder/ChartData/column-header"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"

export function createColumns<T extends object>(
    data: T[],
    onDelete?: (row: Row<T>) => void,
    onEdit?: (row: Row<T>, columnId: string, value: any) => void
): ColumnDef<T>[] {
    if (!data || !data.length) return []

    const firstRow = data[0]
    const keys = Object.keys(firstRow)

    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
        },
        ...keys.map((key) => ({
            accessorKey: key,
            header: ({ column }: { column: Column<T> }) => (
                <DataTableColumnHeader column={column} title={key.charAt(0).toUpperCase() + key.slice(1)} />
            ),
            cell: ({ row, getValue, column }: { row: Row<T>; getValue: () => any; column: Column<T> }) => {
                const value = getValue()
                const [localValue, setLocalValue] = React.useState(value)

                React.useEffect(() => {
                    setLocalValue(value)
                }, [value])

                const handleChange = () => {
                    if (localValue !== value) {
                        onEdit?.(row, key, localValue)
                    }
                }

                return (
                    <Input
                        type="text"
                        value={localValue as string}
                        onChange={(e) => setLocalValue(e.target.value)}
                        onBlur={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.currentTarget.blur()
                                handleChange()
                            }
                        }}
                        className="h-8"
                    />
                )
            },
        })),
        {
            id: "actions",
            cell: ({ row }) => (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => onDelete?.(row)} className="h-8 w-8 p-0">
                                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                <span className="sr-only">Delete row</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete row</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ),
        },
    ]
}

