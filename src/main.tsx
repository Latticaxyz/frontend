import { PrivyProvider } from "@privy-io/react-auth";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");

if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<PrivyProvider
			appId={import.meta.env.VITE_PRIVY_APP_ID}
			config={{
				appearance: {
					theme: "dark",
				},
				loginMethods: ["email", "google", "twitter"],
			}}
		>
			<RouterProvider router={router} />
		</PrivyProvider>,
	);
}
