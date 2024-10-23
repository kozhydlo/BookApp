"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar"; // Sidebar component
import styles from './profile.module.css'; // CSS для сторінки профілю

export default function ProfilePage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [favoriteBooks, setFavoriteBooks] = useState<any[]>([]);
  const [booksRead, setBooksRead] = useState<number | undefined>(undefined);
  const [bookPassion, setBookPassion] = useState<number>(50); // Default passion
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

    // Завантаження збережених даних
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
    // Збереження даних в localStorage
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
            <label htmlFor="name">Введіть ваше ім'я:</label>
            <input type="text" id="name" name="name" placeholder="Ваше ім'я" required />
            <button type="submit">Підтвердити</button>
          </form>
        ) : (
          <>
            <h1 className={styles.profileHeader}>Привіт, {userName}</h1>

            <div className={styles.profileDetails}>
              {isEditing ? (
                <div className={styles.editSection}>
                  <label>
                    Прочитав: 
                    <input
                      type="number"
                      value={booksRead}
                      onChange={(e) => setBooksRead(Number(e.target.value))}
                    />
                  </label>

                  <label>
                    Пристрасть до книжок:
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={bookPassion}
                      onChange={(e) => setBookPassion(Number(e.target.value))}
                    />
                    <span>{bookPassion}%</span>
                  </label>

                  <label>Улюблені жанри:</label>
                  <div className={styles.genreCheckboxes}>
                    {["Фантастика", "Детектив", "Роман", "Пригоди", "Сучасні", "Комедія", "Поезія", "Документальні", "Драма"].map((genre) => (
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

                  <button onClick={handleEditSubmit} className={styles.saveButton}>Зберегти</button>
                </div>
                
              ) : (
                
                <div className={styles.infoSection}>
                  <p>Прочитав: {booksRead || "undefined"}</p>
                  <p>Пристрасть до книжок: {bookPassion}%</p>
                  <p>Улюблені жанри: {favoriteGenres.join(", ") || "Ще не вибрано"}</p>

                  <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                    ✏️
                  </button>
                </div>
              )}
            </div>

            <div className={styles.favoriteBooks}>
              <h2>Улюблені книги:</h2>
              {favoriteBooks.length === 0 ? (
                <p>Ще не збережено улюблених книг.</p>
              ) : (
                <div className={styles.booksGrid}>
                  {favoriteBooks.map((book, index) => (
                    <div key={index} className={styles.bookItem} onClick={() => handleBookClick(book.id)}>
                      <h3>{book.title}</h3>
                      <p>Автор: {book.author}</p>
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
