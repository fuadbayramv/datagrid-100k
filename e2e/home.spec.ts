import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home page loads without accessibility violations", async ({ page }) => {
	await page.goto("/");
	await expect(
		page.getByRole("heading", { name: "DataGrid 100k" }),
	).toBeVisible();

	const results = await new AxeBuilder({ page }).analyze();
	expect(results.violations).toEqual([]);
});
