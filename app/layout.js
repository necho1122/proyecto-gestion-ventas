import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import { ListaComprasProvider } from '@/context/sellsContext';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata = {
	title: "D'Estilo Plus",
	description: 'Tienda de sublimación, estampado y bordado',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<ListaComprasProvider>
					<NavBar />
					{children}
				</ListaComprasProvider>
			</body>
		</html>
	);
}
