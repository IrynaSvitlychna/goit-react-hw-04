import { useEffect, useState } from 'react'
import axios from 'axios';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import './App.css'

function App() {
  const [images, setImages] = useState(0);
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (topic) => {
    try {
	  setImages([]);
	  setError(false);
      setLoading(true);
      const data = await fetchArticlesWithTopic(topic);
      setImages(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   async function getArticle() {
  //     const response = await axios.get(
  //      " https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY"
  //     );
      //  https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
      
  //   }
  //   getArticle();
  // }, []);
  
  return (
    <>
      <SearchBar onSearch={setImages} />

      {/* {loading && <Loader />} */}

      {/* {error && <Error />} */}

     {images.length > 0 && <ImageGallery images={images} />}

      <LoadMoreBtn />

      <ImageModal />
    </>
  )
}

export default App
