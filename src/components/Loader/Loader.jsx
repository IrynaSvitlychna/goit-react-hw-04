import { Grid } from "react-loader-spinner";

function Loader() {
  
  return (
    <Grid
      visible={true}
      height="40"
      width="40"
      color="#df9b1b"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{
        display: "block",
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
      }}
    />
  );
}

export default Loader