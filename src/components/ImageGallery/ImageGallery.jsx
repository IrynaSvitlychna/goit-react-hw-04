import ImageCard from "../ImageCard/ImageCard"

function ImageGallery({ images }) {

  return (
    <>
       {<ul className={css.container}>
            {images.map((image) => (
	/* Набір елементів списку із зображеннями */

		 <li className="" key="image.id">
                  <ImageCard data={image} /> 
           </li>

            ))} 
        </ul> 
      }
    </>
  )
}

export default ImageGallery
