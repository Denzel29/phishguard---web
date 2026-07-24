'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';
import type { LoginResponse } from '@/types/shared';
import { Button, Card, ErrorText, Field, Input } from '@/components/ui';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const data = await apiRequest<LoginResponse>('/auth/login', {
				method: 'POST',
				body: { email, password }
			});
			// TODO: persist token (httpOnly cookie via a backend session route
			// is the safer long-term choice over localStorage)
			console.log('logged in as', data.user.email);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Login failed');
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-sm flex-col justify-center px-6 py-16">
			<Card className="p-8">
				<h1 className="text-xl font-bold text-ink">Log in</h1>
				<p className="mt-1 text-sm text-ink-muted">Welcome back to your dashboard.</p>

				<form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
					<Field label="Email">
						<Input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@company.com"
							required
						/>
					</Field>

					<Field label="Password">
						<Input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							required
						/>
					</Field>

					{error && <ErrorText>{error}</ErrorText>}

					<Button type="submit" disabled={loading} className="mt-2 w-full">
						{loading ? 'Logging in…' : 'Log in'}
					</Button>
				</form>

				<p className="mt-6 text-center text-sm text-ink-muted">
					Don&apos;t have an organization yet?{' '}
					<Link href="/register-organization" className="font-semibold text-brand hover:text-brand-dark">
						Register one
					</Link>
				</p>
			</Card>
		</main>
	);
}
