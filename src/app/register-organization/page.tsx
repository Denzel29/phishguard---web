'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';
import type { Organization } from '@/types/shared';
import { Button, Card, ErrorText, Field, Input, SuccessText } from '@/components/ui';

export default function RegisterOrganizationPage() {
	const [form, setForm] = useState({ orgName: '', ownerName: '', ownerEmail: '', password: '' });
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	function update(field: keyof typeof form) {
		return (e: React.ChangeEvent<HTMLInputElement>) =>
			setForm((prev) => ({ ...prev, [field]: e.target.value }));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			await apiRequest<{ organization: Organization }>('/organizations', {
				method: 'POST',
				body: form
			});
			setSuccess(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Registration failed');
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-sm flex-col justify-center px-6 py-16">
			<Card className="p-8">
				{success ? (
					<>
						<h1 className="text-xl font-bold text-ink">You&apos;re all set</h1>
						<div className="mt-4">
							<SuccessText>Organization registered. You can now log in.</SuccessText>
						</div>
						<Link
							href="/login"
							className="mt-6 block rounded-lg bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-dark"
						>
							Go to login
						</Link>
					</>
				) : (
					<>
						<h1 className="text-xl font-bold text-ink">Register your organization</h1>
						<p className="mt-1 text-sm text-ink-muted">
							Sets up your org and seeds an owner account with full access.
						</p>

						<form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
							<Field label="Organization name">
								<Input
									value={form.orgName}
									onChange={update('orgName')}
									placeholder="Acme Inc."
									required
								/>
							</Field>
							<Field label="Your name">
								<Input value={form.ownerName} onChange={update('ownerName')} placeholder="Jane Doe" required />
							</Field>
							<Field label="Your email">
								<Input
									type="email"
									value={form.ownerEmail}
									onChange={update('ownerEmail')}
									placeholder="you@company.com"
									required
								/>
							</Field>
							<Field label="Password">
								<Input
									type="password"
									value={form.password}
									onChange={update('password')}
									placeholder="At least 8 characters"
									required
								/>
							</Field>

							{error && <ErrorText>{error}</ErrorText>}

							<Button type="submit" disabled={loading} className="mt-2 w-full">
								{loading ? 'Registering…' : 'Register organization'}
							</Button>
						</form>

						<p className="mt-6 text-center text-sm text-ink-muted">
							Already registered?{' '}
							<Link href="/login" className="font-semibold text-brand hover:text-brand-dark">
								Log in
							</Link>
						</p>
					</>
				)}
			</Card>
		</main>
	);
}
