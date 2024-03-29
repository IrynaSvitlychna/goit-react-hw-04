

function ImageCard({ data }) {


  return (
    <>
      <div>
        <img src={data.url} alt={data.title} />
      </div>
    </>
  )
}

export default ImageCard