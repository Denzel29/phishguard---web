import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// Static export so this can be hosted on GitHub Pages, which only serves
	// static files (no Node server, no API routes, no getServerSideProps).
	// All real logic lives in the Express API on Heroku; this app just calls it.
	output: 'export',
	images: {
		unoptimized: true
	}
};

export default nextConfig;
