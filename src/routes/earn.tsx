import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { type Column, DataTable } from "@/components/DataTable";
import { SearchFilter } from "@/components/SearchFilter";
import { StatCard } from "@/components/StatCard";
import { TokenIcon } from "@/components/TokenIcon";
import { VAULTS } from "@/data/placeholder";
import type { Vault } from "@/types";

export const Route = createFileRoute("/earn")({
	component: EarnPage,
});

const columns: Column<Vault>[] = [
	{
		key: "vault",
		header: "Vault",
		render: (row) => (
			<div className="flex items-center gap-3">
				<TokenIcon symbol={row.asset.symbol} color={row.asset.color} />
				<div className="flex flex-col">
					<span className="font-medium">{row.name}</span>
					<span className="text-sm text-muted-foreground">
						{row.asset.symbol}
					</span>
				</div>
			</div>
		),
	},
	{
		key: "curator",
		header: "Curator",
		render: (row) => (
			<span className="text-muted-foreground">{row.curator}</span>
		),
	},
	{
		key: "totalSupply",
		header: "Total Supply",
		align: "right",
		render: (row) => <span className="font-medium">{row.totalSupply}</span>,
	},
	{
		key: "apy",
		header: "APY",
		align: "right",
		render: (row) => (
			<span className="text-positive font-semibold">{row.apy.toFixed(2)}%</span>
		),
	},
	{
		key: "collateral",
		header: "Collateral",
		render: (row) => (
			<div className="flex -space-x-1">
				{row.collateralTokens.map((token) => (
					<TokenIcon
						key={token.symbol}
						symbol={token.symbol}
						color={token.color}
						size="sm"
					/>
				))}
			</div>
		),
	},
];

function EarnPage() {
	const [search, setSearch] = useState("");

	const filteredVaults = useMemo(() => {
		if (!search) return VAULTS;
		const query = search.toLowerCase();
		return VAULTS.filter(
			(vault) =>
				vault.name.toLowerCase().includes(query) ||
				vault.curator.toLowerCase().includes(query),
		);
	}, [search]);

	return (
		<div>
			<h1 className="text-2xl font-semibold mb-2">Earn</h1>
			<p className="text-sm text-muted-foreground mb-8">
				Deposit into vaults to earn yield
			</p>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<StatCard
					label="Total Supply"
					value="$1.24B"
					subValue="Across all vaults"
				/>
				<StatCard
					label="Average APY"
					value="5.82%"
					subValue="Weighted average"
					variant="positive"
				/>
				<StatCard
					label="Active Vaults"
					value="10"
					subValue="Accepting deposits"
				/>
			</div>

			<div className="mb-6">
				<SearchFilter
					placeholder="Search vaults..."
					value={search}
					onChange={setSearch}
				/>
			</div>

			<DataTable
				columns={columns}
				data={filteredVaults}
				keyExtractor={(row) => row.id}
			/>
		</div>
	);
}
