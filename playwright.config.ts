import { defineConfig, devices } from "@playwright/test";

const port = 4173;

export default defineConfig({
	testDir: "./e2e",
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 1 : 0,
	use: { baseURL: `http://localhost:${port}` },
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
	webServer: {
		command: `bun run build && bun run preview --port ${port}`,
		port,
		reuseExistingServer: !process.env.CI,
	},
});
