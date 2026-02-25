export interface Token {
	symbol: string;
	name: string;
	color: string;
}

export interface Vault {
	id: string;
	name: string;
	curator: string;
	asset: Token;
	totalSupply: string;
	apy: number;
	collateralTokens: Token[];
}

export interface Market {
	id: string;
	loanAsset: Token;
	collateralAsset: Token;
	lltv: number;
	totalSupply: string;
	totalBorrow: string;
	borrowApy: number;
	supplyApy: number;
	utilization: number;
}
