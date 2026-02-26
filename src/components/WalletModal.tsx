import { usePrivy } from "@privy-io/react-auth";
import { Check, Copy, LogOut, Wallet } from "lucide-react";
import { useState } from "react";
import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export function WalletModal() {
	const { logout, user } = usePrivy();
	const [copied, setCopied] = useState(false);

	const wallet = user?.wallet;

	const email =
		user?.email?.address ??
		user?.google?.email ??
		user?.twitter?.username ??
		null;

	const copyAddress = async () => {
		if (!wallet) return;
		await navigator.clipboard.writeText(wallet.address);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<DialogContent className="sm:max-w-sm overflow-hidden">
			<DialogHeader>
				<DialogTitle className="flex items-center gap-2">
					<Wallet className="size-5" />
					Wallet
				</DialogTitle>
			</DialogHeader>

			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-1.5">
					<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
						Address
					</span>
					<div className="flex items-center justify-between gap-2 rounded-lg bg-secondary border border-white/[0.06] px-3 py-2.5">
						<span className="text-sm font-mono text-foreground break-all">
							{wallet?.address ?? "—"}
						</span>
						<button
							type="button"
							onClick={copyAddress}
							className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
							aria-label="Copy address"
						>
							{copied ? (
								<Check className="size-4 text-positive" />
							) : (
								<Copy className="size-4" />
							)}
						</button>
					</div>
				</div>

				{email && (
					<div className="flex flex-col gap-1.5">
						<span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
							Account
						</span>
						<div className="rounded-lg bg-secondary border border-white/[0.06] px-3 py-2.5">
							<span className="text-sm text-foreground">{email}</span>
						</div>
					</div>
				)}

				<button
					type="button"
					onClick={() => logout()}
					className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.06] px-3 py-2.5 text-sm text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors mt-1"
				>
					<LogOut className="size-4" />
					<span>Disconnect</span>
				</button>
			</div>
		</DialogContent>
	);
}
