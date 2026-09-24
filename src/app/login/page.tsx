'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
	const router = useRouter();

	useEffect(() => {
		// All login and registration is now handled on the main landing page
		router.replace('/');
	}, [router]);

	return null;
}
