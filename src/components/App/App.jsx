import { useEffect, useRef, useState } from 'react'

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import './App.css'
import fetchImages from '../article-api';


function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
   const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef();

  
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
        if (searchQuery=== "") {
      return;
    }
        setIsLoading(true);
        setError(false);
        const data = await fetchImages(searchQuery, page);
         if (data.results.length === 0) {
          throw new Error("Nothing found!");
         }
        if (page > 1) {
           setImages(prevImages => {
          return [...prevImages, ...data];
        }
       
        });
      }
      catch (error) {
      setError(true);
     } finally {
      setIsLoading(false);
     }
    }
    getData();
  }, [searchQuery, page]);

  const handleSearch = async (newQuery) => {
    console.log(newQuery);
    setPage(1);
    setSearchQuery(newQuery);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  
  return (
    <>
      <SearchBar onSearch={handleSearch} />

      {/* {error && <Error />} */}

     {images.length > 0 && <ImageGallery images={images} />}

      {images.length > 0 && !isloading && <LoadMoreBtn onClick={handleLoadMore} />}
      
      {/* {isloading && <Loader />} */}
      
      <ImageModal />
    </>
  )
}

export default App

 