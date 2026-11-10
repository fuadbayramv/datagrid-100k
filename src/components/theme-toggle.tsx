import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const { setTheme } = useTheme();

	return (
		<Button
			variant="outline"
			size="icon"
			aria-label="Toggle theme"
			onClick={() =>
				setTheme(
					document.documentElement.classList.contains("dark")
						? "light"
						: "dark",
				)
			}
		>
			<SunIcon className="dark:hidden" />
			<MoonIcon className="hidden dark:block" />
		</Button>
	);
}
