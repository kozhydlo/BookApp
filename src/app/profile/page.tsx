"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";
import styles from './profile.module.css';

export default function ProfilePage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [favoriteBooks, setFavoriteBooks] = useState<any[]>([]);
  const [booksRead, setBooksRead] = useState<number | undefined>(undefined);
  const [bookPassion, setBookPassion] = useState<number>(50); 
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (!storedName) {
      setUserName(null);
    } else {
      setUserName(storedName);
    }

    const storedBooks = [];
    for (let key in localStorage) {
      if (key.startsWith('favoriteBook')) {
        storedBooks.push(JSON.parse(localStorage.getItem(key)!));
      }
    }
    setFavoriteBooks(storedBooks);

    const storedBooksRead = localStorage.getItem('booksRead');
    const storedBookPassion = localStorage.getItem('bookPassion');
    const storedGenres = localStorage.getItem('favoriteGenres');

    if (storedBooksRead) setBooksRead(Number(storedBooksRead));
    if (storedBookPassion) setBookPassion(Number(storedBookPassion));
    if (storedGenres) setFavoriteGenres(JSON.parse(storedGenres));
  }, []);

  const handleBookClick = (bookId: number) => {
    router.push(`/book/${bookId}`);
  };

  const handleNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    if (name) {
      localStorage.setItem('userName', name);
      setUserName(name);
    }
  };

  const handleEditSubmit = () => {
    localStorage.setItem('booksRead', booksRead?.toString() || '0');
    localStorage.setItem('bookPassion', bookPassion.toString());
    localStorage.setItem('favoriteGenres', JSON.stringify(favoriteGenres));
    setIsEditing(false);
  };

  const handleGenreChange = (genre: string) => {
    setFavoriteGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  return (
    <div className={styles.profileContainer}>
      <section className={styles.sidebar}>
        <SideBar />
      </section>

      <div className={styles.content}>
        {!userName ? (
          <form className={styles.nameForm} onSubmit={handleNameSubmit}>
            <label htmlFor="name">Enter your name:</label>
            <input type="text" id="name" name="name" placeholder="Your name" required />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <>
            <h1 className={styles.profileHeader}>Hello, {userName}</h1>

            <div className={styles.profileDetails}>
              {isEditing ? (
                <div className={styles.editSection}>
                  <label>
                    Books Read: 
                    <input
                      type="number"
                      value={booksRead}
                      onChange={(e) => setBooksRead(Number(e.target.value))}
                    />
                  </label>

                  <label>
                    Book Passion:
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={bookPassion}
                      onChange={(e) => setBookPassion(Number(e.target.value))}
                    />
                    <span>{bookPassion}%</span>
                  </label>

                  <label>Favorite Genres:</label>
                  <div className={styles.genreCheckboxes}>
                    {["Fantasy", "Detective", "Romance", "Adventure", "Modern", "Comedy", "Poetry", "Documentary", "Drama"].map((genre) => (
                      <label key={genre}>
                        <input
                          type="checkbox"
                          checked={favoriteGenres.includes(genre)}
                          onChange={() => handleGenreChange(genre)}
                        />
                        {genre}
                      </label>
                    ))}
                  </div>

                  <button onClick={handleEditSubmit} className={styles.saveButton}>Save</button>
                </div>
              ) : (
                <div className={styles.infoSection}>
                  <p>Books Read: {booksRead || "undefined"}</p>
                  <p>Book Passion: {bookPassion}%</p>
                  <p>Favorite Genres: {favoriteGenres.join(", ") || "Not yet selected"}</p>

                  <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                    ✏️
                  </button>
                </div>
              )}
            </div>

            <div className={styles.favoriteBooks}>
              <h2>Favorite Books:</h2>
              {favoriteBooks.length === 0 ? (
                <p>No favorite books saved yet.</p>
              ) : (
                <div className={styles.booksGrid}>
                  {favoriteBooks.map((book, index) => (
                    <div key={index} className={styles.bookItem} onClick={() => handleBookClick(book.id)}>
                      <h3>{book.title}</h3>
                      <p>Author: {book.author}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
