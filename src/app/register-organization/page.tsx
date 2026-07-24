'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api';
import type { Organization } from '@/types/shared';

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

	if (success) {
		return (
			<main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
				<p>Organization registered. You can now log in.</p>
			</main>
		);
	}

	return (
		<main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6">
			<h1 className="text-xl font-semibold">Register your organization</h1>

			<form onSubmit={handleSubmit} className="flex flex-col gap-3">
				<input
					placeholder="Organization name"
					value={form.orgName}
					onChange={update('orgName')}
					className="rounded border px-3 py-2"
					required
				/>
				<input
					placeholder="Your name"
					value={form.ownerName}
					onChange={update('ownerName')}
					className="rounded border px-3 py-2"
					required
				/>
				<input
					type="email"
					placeholder="Your email"
					value={form.ownerEmail}
					onChange={update('ownerEmail')}
					className="rounded border px-3 py-2"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={form.password}
					onChange={update('password')}
					className="rounded border px-3 py-2"
					required
				/>

				{error && <p className="text-sm text-red-600">{error}</p>}

				<button
					type="submit"
					disabled={loading}
					className="rounded bg-black px-3 py-2 text-white disabled:opacity-50"
				>
					{loading ? 'Registering…' : 'Register organization'}
				</button>
			</form>
		</main>
	);
}
