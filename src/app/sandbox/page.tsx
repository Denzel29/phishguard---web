import { Card } from '@/components/ui';

// Placeholder for the sandbox experience: mock inbox -> fake browser chrome
// -> fake login page -> reveal. Each step becomes its own component under
// src/components/sandbox/ as it's built.

export default function SandboxPage() {
	return (
		<main className="mx-auto max-w-3xl px-6 py-12">
			<h1 className="text-2xl font-bold text-ink">Sandbox</h1>
			<p className="mt-2 text-sm text-ink-muted">
				The mock inbox and fake-browser training flow will render here.
			</p>

			<Card className="mt-8 p-8 text-center">
				<p className="text-sm text-ink-muted">No active session.</p>
			</Card>
		</main>
	);
}
