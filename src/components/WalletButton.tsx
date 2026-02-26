import { usePrivy } from "@privy-io/react-auth";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { WalletModal } from "@/components/WalletModal";

function truncateAddress(address: string): string {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletButton() {
	const { user } = usePrivy();

	const wallet = user?.wallet;
	const displayAddress = wallet ? truncateAddress(wallet.address) : "No wallet";

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button
					type="button"
					className="flex items-center gap-2.5 rounded-xl bg-secondary border border-white/[0.06] px-3 py-1.5 hover:bg-accent transition-colors cursor-pointer"
				>
					<div className="size-2 rounded-full bg-positive" />
					<span className="text-sm font-mono text-secondary-foreground">
						{displayAddress}
					</span>
				</button>
			</DialogTrigger>
			<WalletModal />
		</Dialog>
	);
}
