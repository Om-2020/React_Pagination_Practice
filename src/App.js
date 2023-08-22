import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";


function App() {

  const [productdata,setproductdata] = useState([]);
  const [page,setpage] = useState(1);

  const fetchproducts = async()=>{

    const {data} = await axios.get("https://dummyjson.com/products?limit=100");
  
   //console.log(data);
  
    setproductdata(data.products);
    //console.log(productdata);
  }

  useEffect(()=>{
      fetchproducts();
  },[page])


  const selectPageHandler = (selectedpage)=>{

    if(selectedpage>=1 && selectedpage<=productdata.length/10
      && selectedpage !==page )
    setpage(selectedpage);  

  }
  return (
    <div>
      <h1>Pagination</h1>
      <div className="Products">
        {productdata.slice(page * 10 - 10, page * 10).map((prod) => {
          return (
            <div key={prod.id} className="single__product">
              <img src={prod.thumbnail} alt={prod.title} className="img" />
              <span>{prod.title}</span>
            </div>
          );
        })}

        {
          <div className="pagination">
            <span 
            className={page>1?"":"pagination_disable"}
            onClick={() => selectPageHandler(page - 1)}>◀</span>
            {[...Array(productdata.length / 10)].map((_, i) => {
              return (
                <span
                  key={i}
                  onClick={() => selectPageHandler(i + 1)}
                  className={page === i + 1 ? "pagination_selected" : ""}
                >
                  {i + 1}
                </span>
              );
            })}
            <span onClick={() => selectPageHandler(page + 1)}
            className={page < productdata.length/10 ? "":"pagination_disable"}
            >
              
              ▶</span>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
