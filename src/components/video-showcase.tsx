'use client';

import { useState } from 'react';

interface VideoShowcaseProps {
	title: string;
	description: string;
	// Swap in a real file once one exists, e.g. "/demo.mp4". Until then this
	// renders a styled placeholder instead of a broken <video> element.
	videoSrc?: string;
	posterAlt?: string;
}

export function VideoShowcase({ title, description, videoSrc }: VideoShowcaseProps) {
	const [playing, setPlaying] = useState(false);

	return (
		<section className="px-2 py-5">
			<div className="mx-auto max-w-4xl">
				<div className="mx-auto mb-10 max-w-xl text-center">
					<span className="mb-2 block text-xs font-bold uppercase tracking-wide text-brand">
						See it in action
					</span>
					<h2 className="text-3xl font-extrabold tracking-tight text-ink">{title}</h2>
					<p className="mt-3 text-ink-muted">{description}</p>
				</div>

				<div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-[0_25px_60px_-30px_rgba(67,97,238,0.4)]">
					<div className="relative aspect-video w-full bg-ink">
						{videoSrc ? (
							<video
								src={videoSrc}
								controls
								playsInline
								className="h-full w-full object-cover"
							/>
						) : playing ? (
							<div className="flex h-full items-center justify-center text-sm text-white/70">
								No video source set yet — pass a <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5">videoSrc</code> prop once one exists.
							</div>
						) : (
							<button
								type="button"
								onClick={() => setPlaying(true)}
								className="brand-gradient group flex h-full w-full items-center justify-center"
								aria-label="Play demo video"
							>
								<span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition group-hover:scale-105">
									<svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-brand">
										<path d="M8 5v14l11-7z" />
									</svg>
								</span>
							</button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
