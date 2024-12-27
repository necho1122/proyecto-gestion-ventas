import styles from './page.module.css';
import NavBar from '@/components/NavBar';
import UserPanel from '@/components/UserPanel';

export default function Home() {
	return (
		<div className={styles.page}>
			<NavBar />
			<div className={styles.contentMain}>
				<UserPanel />
			</div>
			<main className={styles.main}></main>
			<footer className={styles.footer}></footer>
		</div>
	);
}
