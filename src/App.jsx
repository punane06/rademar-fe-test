import { useState, useEffect } from "react";
import "./App.css";

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
    fetch(`https://dummyjson.com/carts/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: [
          {
            id: productId,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
    console.log("Add to cart", productId);
    // Add to cart request: https://dummyjson.com/docs/carts#update
  };

  return (
    <div>
      <div className="product__container">
        {products.map((product) => (
          <div className="card " key={product.id}>
            <div className="card__image">
              {product.discountPercentage && (
                <div className="card__discountPercentage">
                  -{product.discountPercentage.toFixed()}%
                </div>
              )}
              <img
                className="card__image--picture"
                src={product.thumbnail}
                alt="product image"
              >
                {products.thumbnail}
              </img>
            </div>
            <div className="card__content">
              <div className="card___content--left">
                <h5 className="card__brand">{product.brand}</h5>
                <h5 className="card__title">{product.title}</h5>
                {product.status === 404 && <div>HELLO</div>}
                <button
                  // <CardBody className={`${!isUnlocked && 'blur-2px'}`}>

                  className={`card__button card__button`}
                  onClick={() => addToCart(product.id)}
                >
                  Lisa ostukorvi
                </button>
                {/* <div className="font-bold">Toode lisatud ostukorvi</div> */}
              </div>
              <div className="card__content--right">
                {product.discountPercentage ? (
                  <div className="card__price__container">
                    <p className="card__price">
                      {(
                        product.price -
                        product.price * (product.discountPercentage / 100)
                      ).toFixed(2)}{" "}
                      €
                      <br />
                      <span className="card__price--hint">*soodushind</span>
                    </p>
                    <p className="card__price card__price--discount">
                      {product.price} €
                    </p>
                  </div>
                ) : (
                  <p className="card__price">{product.price} €</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
