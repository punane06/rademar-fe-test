import { useState, useEffect } from "react";

const API_URL = "https://dummyjson.com/";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  const addToCart = (productId) => {
    console.log("Add to cart", productId);
    // Add to cart request: https://dummyjson.com/docs/carts#update
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          {product.title}{" "}
          <button className="font-bold" onClick={() => addToCart(product.id)}>
            Lisa ostukorvi
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
