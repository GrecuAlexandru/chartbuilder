"use client"

import { Table } from "@tanstack/react-table"
import { Settings2, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>
}

export function DataTableViewOptions<TData>({
    table,
}: DataTableViewOptionsProps<TData>) {
    return (
        <div className="flex space-x-2">
            <Button
                variant="outline"
                size="sm"
                className="ml-auto h-8 lg:flex"
                onClick={() => table.toggleAllRowsSelected()}
            >
                <CheckSquare className="mr-2 h-4 w-4" />
                {table.getIsAllRowsSelected() ? "Deselect All" : "Select All"}
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto hidden h-8 lg:flex"
                    >
                        <Settings2 className="mr-2 h-4 w-4" />
                        View
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[150px]">
                    <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {table
                        .getAllColumns()
                        .filter(
                            (column) =>
                                typeof column.accessorFn !== "undefined" && column.getCanHide()
                        )
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
