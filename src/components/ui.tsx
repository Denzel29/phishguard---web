import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
	return (
		<div
			className={`rounded-2xl border border-border-subtle bg-surface p-2 shadow-[0_20px_50px_-25px_rgba(47,123,245,0.35)] ${className}`}
		>
			{children}
		</div>
	);
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			{...props}
			className={`w-full rounded-lg border border-border-subtle bg-surface px-3 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand-light ${props.className ?? ''}`}
		/>
	);
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
	return (
		<label className="block text-sm">
			<span className="mb-1.5 block font-medium text-ink">{label}</span>
			{children}
		</label>
	);
}

export function Button({
	variant = 'primary',
	className = '',
	...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }) {
	const base = 'rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50';
	const styles =
		variant === 'primary'
			? 'bg-brand text-white hover:bg-brand-dark'
			: 'border border-border-subtle text-ink hover:bg-surface-muted';

	return <button {...props} className={`${base} ${styles} ${className}`} />;
}

export function ErrorText({ children }: { children: ReactNode }) {
	return (
		<p className="rounded-lg border border-danger-light bg-danger-light px-3 py-2 text-sm text-danger">
			{children}
		</p>
	);
}

export function SuccessText({ children }: { children: ReactNode }) {
	return (
		<p className="rounded-lg border border-success-light bg-success-light px-3 py-2 text-sm text-success">
			{children}
		</p>
	);
}
