// Header.tsx
"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <motion.div
                className={styles.leftContainer}
                transition={{ type: 'spring', damping: 18, mass: 0.75 }}
                initial={{ opacity: 0, x: -1000 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <h1 className={styles.bookTitle}>Book App</h1>
            </motion.div>

            <motion.div
                className={styles.rightContainer}
                transition={{ type: 'spring', damping: 18, mass: 0.75 }}
                initial={{ opacity: 0, x: 1000 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <Link href="/profile" className={styles.avatarLink}>
                    <motion.img
                        src="https://imageio.forbes.com/specials-images/imageserve/6244c655b6ecfb569a31a3ba/John-Cena-performing-his-famous--You-Can-t-See-Me--taunt-/0x0.jpg?format=jpg&crop=1200,675,x0,y0,safe&width=960"
                        alt="avatar"
                        className={styles.avatar}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                    />
                </Link>
            </motion.div>
        </header>
    );
}
