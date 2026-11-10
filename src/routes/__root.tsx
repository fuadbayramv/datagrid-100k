import { createRootRoute, Outlet } from "@tanstack/react-router";

import "@/styles.css";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

export const Route = createRootRoute({
	component: RootLayout,
});

function RootLayout() {
	return (
		<ThemeProvider storageKey="vite-ui-theme">
			<Header />
			<Outlet />
		</ThemeProvider>
	);
}
