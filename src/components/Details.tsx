import { useParams } from "react-router-dom";
import "./Home.css";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  priceSale: number;
  description: string;
  code: string;
  image: string;
}

const Details = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!product) {
    return <div className="loader">Product not found.</div>;
  }

  return (
    <div>
      <h1>Product {product.id}</h1>
      <div className="productCard" key={product.id}>
        <a href={`/details/${product.id}`}>
          <img className="card-img" src={product.image} alt={product.name} />
        </a>
        <div className="card-body">
          <h3 className="cardname">{product.name}</h3>
          <p className="cardbrand">{product.brand}</p>
          <p className="cardprice">Price: {product.price}</p>
          <p className="cardpriceSale">Sale Price: {product.priceSale}</p>
          <p className="carddescription">{product.description}</p>
          <p className="cardCode">Code: {product.code}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
