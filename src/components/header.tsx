import { Link, linkOptions } from "@tanstack/react-router";

import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = linkOptions([
	{ to: "/", label: "Grid", activeOptions: { exact: true } },
	{ to: "/performance", label: "Performance" },
]);

export function Header() {
	return (
		<header className="flex items-center justify-between gap-4 border-b p-4">
			<nav aria-label="Main" className="flex gap-4 text-sm">
				{navLinks.map(({ label, ...link }) => (
					<Link key={link.to} {...link}>
						{label}
					</Link>
				))}
			</nav>
			<ThemeToggle />
		</header>
	);
}
