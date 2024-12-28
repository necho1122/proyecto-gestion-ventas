import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './NavBar.module.css';

function NavBar() {
	return (
		<div className={styles.navbar}>
			<div className={styles.navContainer}>
				<nav>
					<Link href='/'>
						<Image
							src='/logo.png'
							alt='logo'
							width={100}
							height={40}
						/>
					</Link>
					<Link href='/user'>
						<Image
							src='https://cdn-icons-png.flaticon.com/512/456/456212.png'
							alt='user'
							width={30}
							height={30}
						/>
					</Link>
				</nav>
			</div>
		</div>
	);
}

export default NavBar;
