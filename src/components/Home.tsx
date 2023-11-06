import { useState, useEffect, ChangeEvent } from "react";
import "./Home.css";
import logo from "../assets/Logo.png";
import about from "../assets/Banner.jpg";
import ofice from "../assets/Offer.png";
import { Link } from "react-router-dom";

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

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(6);

  useEffect(() => {
    setLoading(true);

    fetch("https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <header className="header">
        <div className="hedDivs1">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="hedDivs">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Page</li>
            <li>Shop</li>
            <li>Projects</li>
            <li>News</li>
          </ul>
        </div>
        <div className="hedDivs3">
          <input
            className="hedDivs3"
            placeholder="Search..."
            type="text"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </header>
      <nav>
        <img className="imgoffer1" src={about} alt="logo" />
      </nav>
      <div className="mainDiv">
        <img className="imgoffer" src={ofice} alt="ofice" />
      </div>
      <div className="productContainer">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div className="productCard" key={product.id}>
              <Link to={`/details/${product.id}`}>
                <img className="card-img" src={product.image} alt={product.name} />
              </Link>
              <div className="card-body">
                <h3 className="cardname">{product.name}</h3>
                <p className="cardbrand">{product.brand}</p>
                <p className="cardprice">Price: {product.price}</p>
                <p className="cardpriceSale">Sale Price: {product.priceSale}</p>
                <p className="carddescription">{product.description}</p>
                <p className="cardCode">Code: {product.code}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="noProducts">No products found.</p>
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={`pageButton mx-auto btn ${
                pageNumber === currentPage ? "btn-primary active" : "btn-secondary"
              }`}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
