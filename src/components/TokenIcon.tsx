import { cn } from "@/lib/utils";

const sizeClasses = {
	sm: "w-6 h-6 text-xs",
	md: "w-8 h-8 text-sm",
} as const;

interface TokenIconProps {
	symbol: string;
	color: string;
	size?: "sm" | "md";
}

export function TokenIcon({ symbol, color, size = "md" }: TokenIconProps) {
	return (
		<div
			className={cn(
				"rounded-full flex items-center justify-center font-medium text-white ring-2 ring-black/20",
				sizeClasses[size],
			)}
			style={{ backgroundColor: color }}
		>
			{symbol.charAt(0)}
		</div>
	);
}
