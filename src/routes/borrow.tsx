import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { type Column, DataTable } from "@/components/DataTable";
import { SearchFilter } from "@/components/SearchFilter";
import { StatCard } from "@/components/StatCard";
import { TokenIcon } from "@/components/TokenIcon";
import { MARKETS } from "@/data/placeholder";
import { cn } from "@/lib/utils";
import type { Market } from "@/types";

export const Route = createFileRoute("/borrow")({
	component: BorrowPage,
});

const columns: Column<Market>[] = [
	{
		key: "market",
		header: "Market",
		render: (row) => (
			<div className="flex items-center gap-3">
				<div className="flex -space-x-2">
					<TokenIcon
						symbol={row.loanAsset.symbol}
						color={row.loanAsset.color}
					/>
					<TokenIcon
						symbol={row.collateralAsset.symbol}
						color={row.collateralAsset.color}
					/>
				</div>
				<span className="font-medium">
					{row.loanAsset.symbol} / {row.collateralAsset.symbol}
				</span>
			</div>
		),
	},
	{
		key: "lltv",
		header: "LLTV",
		align: "right",
		render: (row) => (
			<span className="inline-flex items-center gap-1.5">
				<span
					className={cn(
						"size-1.5 rounded-full",
						row.lltv >= 90
							? "bg-warning"
							: row.lltv >= 80
								? "bg-positive"
								: "bg-muted-foreground",
					)}
				/>
				{row.lltv}%
			</span>
		),
	},
	{
		key: "totalSupply",
		header: "Total Supply",
		align: "right",
		render: (row) => row.totalSupply,
	},
	{
		key: "totalBorrow",
		header: "Total Borrow",
		align: "right",
		render: (row) => row.totalBorrow,
	},
	{
		key: "borrowApy",
		header: "Borrow APY",
		align: "right",
		render: (row) => (
			<span className="text-positive font-semibold">
				{row.borrowApy.toFixed(2)}%
			</span>
		),
	},
	{
		key: "utilization",
		header: "Utilization",
		align: "right",
		render: (row) => {
			const u = row.utilization;
			const color =
				u >= 85
					? "text-warning"
					: u >= 70
						? "text-foreground"
						: "text-positive";
			return <span className={color}>{u.toFixed(1)}%</span>;
		},
	},
];

function BorrowPage() {
	const [search, setSearch] = useState("");

	const filteredMarkets = useMemo(() => {
		if (!search) return MARKETS;
		const query = search.toLowerCase();
		return MARKETS.filter(
			(market) =>
				market.loanAsset.symbol.toLowerCase().includes(query) ||
				market.collateralAsset.symbol.toLowerCase().includes(query),
		);
	}, [search]);

	return (
		<div>
			<h1 className="text-2xl font-semibold mb-2">Borrow</h1>
			<p className="text-sm text-muted-foreground mb-8">
				Supply collateral to borrow assets
			</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<StatCard
					label="Total Borrowed"
					value="$892M"
					subValue="Across all markets"
				/>
				<StatCard
					label="Average Borrow APY"
					value="4.15%"
					subValue="Weighted average"
					variant="warning"
				/>
				<StatCard
					label="Active Markets"
					value="10"
					subValue="Available to borrow"
				/>
			</div>

			<div className="mb-6">
				<SearchFilter
					placeholder="Search markets..."
					value={search}
					onChange={setSearch}
				/>
			</div>

			<DataTable
				columns={columns}
				data={filteredMarkets}
				keyExtractor={(row) => row.id}
			/>
		</div>
	);
}
