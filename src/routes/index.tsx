import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<main className="p-8">
			<h1 className="text-4xl font-bold">DataGrid 100k</h1>
			<Button>A</Button>
		</main>
	);
}
