import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './NavBar.module.css';

function NavBar() {
	return (
		<div className={styles.navbar}>
			<nav>
				<Image
					src='/logo.png'
					alt='logo'
					width={100}
					height={50}
				/>
				<Link href='/user'>User</Link>
			</nav>
		</div>
	);
}

export default NavBar;
