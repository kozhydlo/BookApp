"use client";
import { books } from "@/constants/mockData";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { motion } from 'framer-motion';
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Editor, useDomValue } from "reactjs-editor";
import styles from './book.module.css';

export default function BookPage() {
  const { id } = useParams();
  const router = useRouter();
  const { dom, setDom } = useDomValue();

  const selectedBook = books.find((book) => id === String(book.id));

  const notify = () => toast("Your changes have been saved!");

  // Збереження лише назви та автора
  const handleSave = () => {
    const favoriteBook = {
      title: selectedBook?.title,
      author: selectedBook?.author,
      id: selectedBook?.id,
    };

    localStorage.setItem(`favoriteBook${selectedBook?.id}`, JSON.stringify(favoriteBook));
    notify();
  };

  const handleGoBack = () => {
    router.push("/");
  };

  const handleSearch = () => {
    router.push("/search");
  };

  useEffect(() => {
    const savedDom = localStorage.getItem(`dom${selectedBook?.id}`);
    if (savedDom) {
      setDom(JSON.parse(savedDom));
    }
  }, [selectedBook?.id, setDom]);

  if (!selectedBook) return <p>Book not found</p>;

  return (
    <motion.div
      transition={{ type: 'spring', damping: 40, mass: 0.75 }}
      initial={{ opacity: 0, x: 1000 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <motion.section
        transition={{ type: 'spring', damping: 44, mass: 0.75 }}
        initial={{ opacity: 0, y: -1000 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.appBar}
      >
        <div className={styles.leftIcons}>
          <i style={{ fontSize: '20px', cursor: 'pointer' }} className="fas fa-chevron-left" onClick={handleGoBack}></i>
        </div>
        <div className={styles.title}>
          <h2 className={styles.titleStyles}>{selectedBook?.title}</h2>
        </div>
        <div className={styles.icons}>
          <button className={styles.saveButton} onClick={handleSave}>Save</button>
          <i style={iconStyle} className="fas fa-cog"></i>
          <i style={iconStyle} className="fas fa-share"></i>
          <i style={{ ...iconStyle, cursor: 'pointer' }} className="fas fa-search" onClick={handleSearch}></i>
        </div>
      </motion.section>

      <Editor
        htmlContent={`
        <main className="bookContainer">
          <aside>
            <h1 className="center">${selectedBook?.title}</h1>
            <span className="center small">By ${selectedBook?.author}</span>
            ${selectedBook?.content}
          </aside>
        </main>
        `}
      />
      <ToastContainer />
    </motion.div>
  );
}

const iconStyle = { marginRight: '20px', fontSize: '20px' };
