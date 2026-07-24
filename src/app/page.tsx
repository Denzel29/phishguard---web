import Link from 'next/link';
import { Card } from '@/components/ui';

export default function Home() {
	return (
		<main>
			<section className="bg-gradient-to-b from-brand-light to-surface-muted px-6 py-20">
				<div className="mx-auto grid max-w-5xl items-center gap-14 sm:grid-cols-2">
					<div>
						<span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-light px-3 py-1.5 text-xs font-semibold text-brand-dark">
							Security awareness training
						</span>
						<h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink">
							Learn to spot the <span className="text-brand">hook</span> before anyone clicks it
						</h1>
						<p className="mt-5 max-w-md text-lg text-ink-muted">
							Realistic phishing simulations that run entirely in a sandbox, no real emails ever
							leave this app, whether you&apos;re training a whole org or just yourself.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href="/register-organization"
								className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
							>
								Register your organization
							</Link>
							<Link
								href="/login"
								className="rounded-lg border border-border-subtle bg-surface px-6 py-3 text-sm font-semibold text-ink transition hover:bg-surface-muted"
							>
								Log in
							</Link>
						</div>
					</div>

					<Card className="p-1">
						<div className="flex gap-1.5 rounded-t-2xl bg-surface-muted px-4 py-3">
							<span className="h-2.5 w-2.5 rounded-full bg-danger" />
							<span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
							<span className="h-2.5 w-2.5 rounded-full bg-success" />
						</div>
						<div className="p-5">
							<div className="mb-3 flex justify-between text-xs text-ink-muted">
								<span>IT Support &lt;it-helpdesk@company-secure.com&gt;</span>
								<span>2 min ago</span>
							</div>
							<p className="mb-2 font-bold text-ink">Action required: Password expires today</p>
							<p className="mb-4 text-sm text-ink-muted">
								Your account password will expire in 24 hours. Verify your credentials using the
								link below to avoid losing access.
							</p>
							<div className="mb-4 break-all rounded-md border border-brand-light bg-brand-light px-3 py-2 text-xs text-brand-dark">
								http://company-secure-portal.verify-account.net/reset
							</div>
							<div className="flex gap-2 border-t border-border-subtle pt-4">
								<button className="flex-1 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white">
									🚩 Report phishing
								</button>
								<button className="flex-1 rounded-lg border border-border-subtle px-3 py-2 text-sm font-semibold text-ink">
									This looks safe
								</button>
							</div>
						</div>
					</Card>
				</div>
			</section>

			<section className="px-6 py-20">
				<div className="mx-auto max-w-5xl">
					<div className="mx-auto mb-14 max-w-xl text-center">
						<span className="mb-2 block text-xs font-bold uppercase tracking-wide text-brand">
							How it works
						</span>
						<h2 className="text-3xl font-extrabold tracking-tight text-ink">
							Three steps to sharper instincts
						</h2>
					</div>

					<div className="grid gap-6 sm:grid-cols-3">
						{[
							{
								n: '1',
								title: 'Assign a scenario',
								body: 'Pick a lure and a difficulty tier, then assign it to a campaign.'
							},
							{
								n: '2',
								title: 'Run the sandbox',
								body: 'A simulated inbox and browser render the lure, nothing ever leaves the app.'
							},
							{
								n: '3',
								title: 'Review the lesson',
								body: 'Whoever clicks sees exactly what they missed, right where they missed it.'
							}
						].map((step) => (
							<Card key={step.n} className="p-6">
								<div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white">
									{step.n}
								</div>
								<h3 className="mb-2 font-bold text-ink">{step.title}</h3>
								<p className="text-sm text-ink-muted">{step.body}</p>
							</Card>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
