import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Navbar } from "@/components/Navbar";

import "../styles.css";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<main className="mx-auto max-w-[1400px] px-4 py-8 md:px-6 lg:px-8">
				<Outlet />
			</main>
			<TanStackDevtools
				config={{ position: "bottom-right" }}
				plugins={[
					{
						name: "TanStack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</div>
	);
}
