// import { useState } from "react";
// import Paginations from "./Pagination";
// import ProductFilter from "./ProductFilter";
// import Products from "./Products";
// import { useSelector } from "react-redux";

// export default function Productspage(currentProducts) {


//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 9; // Number of products per page
//   const { allProducts } = useSelector((state) => state.UserSliceProvider);

//   // Calculate the indices for slicing the filteredProducts array
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//    const currentProducts = limit
//   ? allProducts.slice(0, limit).slice(indexOfFirstProduct, indexOfLastProduct)
//   : allProducts.slice(indexOfFirstProduct, indexOfLastProduct);


//   const handleChangePage = (event, value) => {
//     setCurrentPage(value);
//   };
//   return (
//     <>
//       <div className="productsPage px-[20px]">
//         <div>
//           <Products />
//         </div>

//         <div className="pt-[90px]  absolute right-9">
//           <ProductFilter />
//         </div>
//       </div>



//       <Paginations
//         count={Math.ceil(allProducts.length / productsPerPage)}
//         currentPage={currentPage}
//         handleChangePage={handleChangePage}
//       />
//     </>
//   );
// }




import { useState } from "react";
import { useSelector } from "react-redux";
import Paginations from "./Pagination";
import ProductFilter from "./ProductFilter";
import Products from "./Products";

export default function Productspage({ limit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Number of products per page
  const { allProducts } = useSelector((state) => state.UserSliceProvider);

  // Calculate the indices for slicing the allProducts array
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Determine the current products to display based on the limit and pagination
  const currentProducts = limit
    ? allProducts.slice(0, limit).slice(indexOfFirstProduct, indexOfLastProduct)
    : allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="productsPage px-[20px]">
        <div>
          <Products products={currentProducts} />
        </div>

        <div className="pt-[90px] absolute right-9">
          <ProductFilter />
        </div>
      </div>

      <Paginations
        count={Math.ceil(allProducts.length / productsPerPage)}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
