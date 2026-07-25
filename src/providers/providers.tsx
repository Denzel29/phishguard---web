'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
				{children}
				<Toaster richColors closeButton position="top-right" />
			</QueryClientProvider>
		// <SessionProvider>
			
		// </SessionProvider>
	);
}
