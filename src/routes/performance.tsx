import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/performance")({
	component: Performance,
});

function Performance() {
	return (
		<main className="p-8">
			<h1 className="text-4xl font-bold">Performance</h1>
		</main>
	);
}
