import type React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface Column<T> {
	key: string;
	header: string;
	render: (row: T) => React.ReactNode;
	align?: "left" | "right";
}

interface DataTableProps<T> {
	columns: Column<T>[];
	data: T[];
	keyExtractor: (row: T) => string;
	onRowClick?: (row: T) => void;
}

export function DataTable<T>({
	columns,
	data,
	keyExtractor,
	onRowClick,
}: DataTableProps<T>) {
	return (
		<Table>
			<TableHeader>
				<TableRow className="hover:bg-transparent">
					{columns.map((column) => (
						<TableHead
							key={column.key}
							className={cn(column.align === "right" && "text-right")}
						>
							{column.header}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((row) => (
					<TableRow
						key={keyExtractor(row)}
						className={cn("cursor-pointer", onRowClick && "hover:bg-accent/50")}
						onClick={onRowClick ? () => onRowClick(row) : undefined}
					>
						{columns.map((column) => (
							<TableCell
								key={column.key}
								className={cn(column.align === "right" && "text-right")}
							>
								{column.render(row)}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
