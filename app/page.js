import styles from './page.module.css';
import NavBar from '@/components/NavBar';
import UserPanel from '@/components/UserPanel';
import RevenueDashboard from '@/components/RevenueDashboard';
import SellsAndStock from '@/components/sellsAndStock';

export default function Home() {
	return (
		<div className={styles.page}>
			<NavBar />
			<div className={styles.contentMain}>
				<UserPanel />
				<div className={styles.initialContent}>
					<RevenueDashboard />
					<SellsAndStock />
				</div>
			</div>
			<main className={styles.main}></main>
			<footer className={styles.footer}></footer>
		</div>
	);
}
