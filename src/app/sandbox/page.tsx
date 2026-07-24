// Placeholder for the sandbox experience: mock inbox -> fake browser chrome
// -> fake login page -> reveal. Each step becomes its own component under
// src/components/sandbox/ as it's built.

export default function SandboxPage() {
	return (
		<main className="mx-auto max-w-3xl px-6 py-10">
			<h1 className="text-xl font-semibold">Sandbox</h1>
			<p className="mt-2 text-sm text-gray-500">
				The mock inbox and fake-browser training flow will render here.
			</p>
		</main>
	);
}
