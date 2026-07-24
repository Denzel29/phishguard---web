import { Card } from '@/components/ui';

// Placeholder dashboard. Real version will list campaigns, pull from
// GET /campaigns once that route exists on the backend, and show the
// review queue + reporting views discussed in planning.

export default function DashboardPage() {
	return (
		<main className="mx-auto max-w-3xl px-6 py-12">
			<h1 className="text-2xl font-bold text-ink">Campaigns</h1>
			<p className="mt-2 text-sm text-ink-muted">
				Campaign list, scenario picker, and reporting views go here once the campaign/scenario
				API routes are built.
			</p>

			<Card className="mt-8 p-8 text-center">
				<p className="text-sm text-ink-muted">No campaigns yet.</p>
			</Card>
		</main>
	);
}
