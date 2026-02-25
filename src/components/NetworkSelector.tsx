import { ChevronDown } from "lucide-react";

export function NetworkSelector() {
	return (
		<button
			type="button"
			className="hidden md:flex items-center gap-2 rounded-xl bg-secondary border border-white/[0.06] text-secondary-foreground px-3 py-1.5 text-sm hover:bg-accent transition-colors cursor-pointer"
		>
			<div className="w-4 h-4 rounded-full bg-[#627EEA]" />
			<span>Ethereum</span>
			<ChevronDown className="size-4" />
		</button>
	);
}
