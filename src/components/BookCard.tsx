"use client";
import styles from './BookCard.module.css';

export default function BookCard({ title, description, coverImage, onClick }: any) {
    return (
        <div className={styles.card} onClick={onClick}>
            <img src={coverImage} alt={title} className={styles.image} />
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
}
