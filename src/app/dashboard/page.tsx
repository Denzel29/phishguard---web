// Placeholder dashboard. Real version will list campaigns, pull from
// GET /campaigns once that route exists on the backend, and show the
// review queue + reporting views discussed in planning.

export default function DashboardPage() {
	return (
		<main className="mx-auto max-w-3xl px-6 py-10">
			<h1 className="text-xl font-semibold">Campaigns</h1>
			<p className="mt-2 text-sm text-gray-500">
				Campaign list, scenario picker, and reporting views go here once the
				campaign/scenario API routes are built.
			</p>
		</main>
	);
}
