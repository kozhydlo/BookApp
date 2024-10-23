"use client";
import SideBar from "@/components/SideBar";
import styles from "./about.module.css";

export default function AboutSite() {
    return (
        <div className={styles.container}>
            <section className={styles.sidebar}>
                <SideBar />
            </section>

            <div className={styles.content}>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>About Book App</h2>
                    <p className={styles.description}>
                        Welcome to the Book App! This platform allows you to explore a wide variety of books, read reviews, and discover new literary works. Whether you're looking for fiction, non-fiction, or self-help, we have something for every reader.
                    </p>
                    <p className={styles.description}>
                        Our goal is to create an engaging community of book lovers, where you can easily find and rate books, share your opinions, and stay updated with the latest releases.
                    </p>
                    <p className={styles.description}>
                        On the sidebar, you can navigate through different sections like "All Books", "Contact", "About Us", "Rate Us", and "Settings". Discover your next favorite read today!
                    </p>
                </div>
            </div>
        </div>
    );
}
