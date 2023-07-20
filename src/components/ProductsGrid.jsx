import React, { useState, useEffect } from 'react';
import Product from './Product';

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://sipshop.herokuapp.com/products-list/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(15);

  // get current products
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const setPage = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  return (
    <div className="w-full  flex flex-col">
        <div className='w-[80%] container max-w-6xl mx-auto p-2 flex justify-between'>
          <span className='font-bold text-2xl my-auto'>Best sellers</span>
          <a className='text-red-500 text-xl my-auto'href="#">View more</a>
        </div>

      <div className="flex w-full h-[75%]">
        <Product
          products={currentProducts}
          product_name={currentProducts.product_name}
          price={currentProducts.price}
          alcohol_content={currentProducts.alcohol_content}
          image={currentProducts.image}
        />
      </div>
    </div>
  );
};

export default ProductsGrid;