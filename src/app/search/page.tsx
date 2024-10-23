"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";
import styles from "./search.module.css";
import { books } from "@/constants/mockData"; 

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookClick = (id) => {
    router.push(`/book/${id}`); 
  };

  return (
    <div className={styles.container}>
      <section className={styles.sidebar}>
        <SideBar />
      </section>

      <div className={styles.content}>
        <div className={styles.searchWrapper}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search for books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.bookGrid}>
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className={styles.bookCard}
              onClick={() => handleBookClick(book.id)}
            >
              <img src={book.image} alt={book.title} className={styles.bookImage} />
              <div className={styles.bookInfo}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
