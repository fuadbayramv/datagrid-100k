import { expect, test } from "@playwright/test";

const html = (page: import("@playwright/test").Page) => page.locator("html");

test("follows the system preference, including live changes", async ({
	page,
}) => {
	await page.emulateMedia({ colorScheme: "dark" });
	await page.goto("/");
	await expect(html(page)).toHaveClass(/dark/);

	await page.emulateMedia({ colorScheme: "light" });
	await expect(html(page)).toHaveClass(/light/);
});

test("toggles by keyboard and keeps the choice after reload", async ({
	page,
}) => {
	await page.emulateMedia({ colorScheme: "light" });
	await page.goto("/");

	await page.getByRole("button", { name: "Toggle theme" }).focus();
	await page.keyboard.press("Enter");
	await expect(html(page)).toHaveClass(/dark/);

	await page.reload();
	await expect(html(page)).toHaveClass(/dark/);
});
