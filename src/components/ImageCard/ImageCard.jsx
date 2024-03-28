

function ImageCard({ data }) {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
  <img src={data.url} alt={data.title} />
</div>
       
    </>
  )
}

export default ImageCard