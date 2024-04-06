import { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import './App.css'
import fetchImages from '../article-api';


function App() {
  const [images, setImages] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  
  
    const galleryRef = useRef();

  window.onscroll = function scrollSetting() {
    if (window.scrollY > 20) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  useEffect(() => { 
    async function getData(searchQuery, page) {
      try {
        if (searchQuery.length === 0) return;
        setError(null);
        setIsLoading(true);
        const data = await fetchImages(searchQuery, page);
        if (data.results.length === 0) {
          console.log(data.results);
          throw new Error("Nothing found!");
        }
        if (page > 1) {
          setImages(prevImages => [...prevImages, ...data.results]);
        } else {
          setImages(data.results);
        }
        if (data.total / 9 > page) {
          setIsLoadMore(true);
        } else {
          setIsLoadMore(false);
        }
      } catch (error) {
          setError(error);
          setIsLoadMore(false);
          console.log(error);
          toast.error(`Oooops! ${error.message}!`);
        } finally {
          setIsLoading(false);
        }
      }
    getData(searchQuery, page);
  }, [searchQuery, page]);

  //   === Scroll ===
useEffect(() => {
    if (galleryRef.current.children.length > 0 && page > 1) {
      const galleryElementHeight =
        galleryRef.current.lastChild.getBoundingClientRect().height * 3 + 45;

      window.scrollBy({
        top: galleryElementHeight,
        behavior: "smooth",
      });
    }
  }, [images, page]);


  //   === Function update state ===
 function backDropSetting(modalImageObj) {
    setModalImage(modalImageObj);
 }
  
  
  function handleSearch (newQuery) {
    console.log(newQuery);
    setPage(1);
    setSearchQuery(newQuery);
    setImages([]);
    setIsLoadMore(false);
  }

  function handleLoadMore () {
    setPage(page + 1);
  }

   return (
    <>
      <SearchBar onSearch={handleSearch} />

      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #f4ea84",
            padding: "16px",
            color: "#f4ea84",
            backgroundColor: "#df9b1b",
          },
        }}
       />
       
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <ImageGallery 
        ref={galleryRef} 
        images={images} 
        isScroll={isScroll}
             onView={backDropSetting}
           />
      )}
    
      {modalImage && (
        <ImageModal 
           chosenImage={modalImage}
           isOpen={modalImage && true}
           onBackDrop={backDropSetting} />)}

      {isloading && <Loader />}
       
      {isLoadMore && !isloading && <LoadMoreBtn onLoad={handleLoadMore} />}
    </>
  )
}

export default App

 