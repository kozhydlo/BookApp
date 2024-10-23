// SideBar.tsx
"use client";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './SideBar.module.css';

export default function SideBar() {
    const MenuList = [
        { title: "Home", icon: <i className={`fa fa-home ${styles.icon}`}></i>, link: "/" },
        { title: "AboutUs", icon: <i className={`fa fa-info-circle ${styles.icon}`}></i>, link: "/about" },
        { title: "Settings", icon: <i className={`fa fa-cog ${styles.icon}`}></i>, link: "/settings" },
    ];

    return (
        <>
            {MenuList.map((list, i) => (
                <motion.div
                    key={i}
                    transition={{ type: 'spring', damping: 22, mass: 0.99 }}
                    initial={{ opacity: 0, x: -2000 * (i + 1) }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <ul className={styles.list}>
                        <Link href={list.link} style={{ textDecoration: 'none' }}>
                            <motion.li className={styles.listItem} whileHover={{ scale: 1.1 }}>
                                <motion.span
                                    transition={{ type: 'spring', damping: 30, mass: 0.99 }}
                                    initial={{ opacity: 0, x: -10000 * (i + 1) }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={styles.menuItem}
                                >
                                    {list.icon} {list.title}
                                </motion.span>
                            </motion.li>
                        </Link>
                    </ul>
                </motion.div>
            ))}
        </>
    );
}
