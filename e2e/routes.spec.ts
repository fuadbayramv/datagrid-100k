import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const colorScheme of ["light", "dark"] as const) {
	test(`performance route has no accessibility violations in ${colorScheme}`, async ({
		page,
	}) => {
		await page.emulateMedia({ colorScheme });
		await page.goto("/");
		await page.getByRole("link", { name: "Performance" }).click();
		await expect(
			page.getByRole("heading", { name: "Performance" }),
		).toBeVisible();

		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations).toEqual([]);
	});
}
