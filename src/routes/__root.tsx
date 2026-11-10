import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

import "@/styles.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createRootRoute({
	component: RootLayout,
});

function RootLayout() {
	return (
		<ThemeProvider storageKey="vite-ui-theme">
			<header className="flex items-center justify-between gap-4 border-b p-4">
				<nav aria-label="Main" className="flex gap-4 text-sm">
					<Link to="/" activeOptions={{ exact: true }}>
						Grid
					</Link>
					<Link to="/performance">Performance</Link>
				</nav>
				<ThemeToggle />
			</header>
			<Outlet />
		</ThemeProvider>
	);
}
