import { Button } from "@/components/ui/button";

export function WalletButton() {
	return (
		<Button
			size="sm"
			className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
		>
			Connect Wallet
		</Button>
	);
}
