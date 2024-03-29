import { useEffect, useState } from 'react'

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
   const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => { 
    if (searchQuery=== "") {
      return;
    }

    async function getData() {
      try { 
        setIsLoading(true);
        setError(false);
        const data = await fetchArticles(searchQuery, page);
        setImages(prevImages => {
          return [...prevImages, ...data];
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

 