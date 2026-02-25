import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NetworkSelector } from "@/components/NetworkSelector";
import { WalletButton } from "@/components/WalletButton";

const NAV_LINKS = [
	{ to: "/earn", label: "Earn" },
	{ to: "/borrow", label: "Borrow" },
] as const;

const NAV_LINK_CLASSES =
	"px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";

function NavLink({ to, label }: { to: string; label: string }) {
	return (
		<Link
			to={to}
			className={NAV_LINK_CLASSES}
			activeProps={{ className: "text-primary bg-primary/10" }}
		>
			{label}
		</Link>
	);
}

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 h-16 border-b border-border bg-card/95 backdrop-blur-md">
			<nav className="flex h-full items-center justify-between px-6 md:px-8">
				<div className="flex items-center gap-6">
					<Link to="/earn" className="text-xl font-semibold tracking-tight">
						Lattica
					</Link>

					<div className="hidden md:block h-5 w-px bg-white/[0.08]" />
					<div className="hidden md:flex items-center gap-1">
						{NAV_LINKS.map((link) => (
							<NavLink key={link.to} to={link.to} label={link.label} />
						))}
					</div>
				</div>

				<div className="flex items-center gap-3">
					<NetworkSelector />
					<WalletButton />

					<button
						type="button"
						className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
						onClick={() => setMobileMenuOpen((prev) => !prev)}
						aria-label="Toggle menu"
					>
						{mobileMenuOpen ? (
							<X className="size-5" />
						) : (
							<Menu className="size-5" />
						)}
					</button>
				</div>
			</nav>

			{mobileMenuOpen && (
				<div className="md:hidden border-b border-border bg-background/95 backdrop-blur-sm px-4 py-3 flex flex-col gap-1">
					{NAV_LINKS.map((link) => (
						<NavLink key={link.to} to={link.to} label={link.label} />
					))}
				</div>
			)}
		</header>
	);
}
