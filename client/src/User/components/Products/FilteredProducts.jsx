// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { filterProductsByCategory } from "../../../redux/user/UserThunk";
// import ProductCard from "./ProductsCard";
// import ProductFilter from "./ProductFilter";
// import Paginations from "./Pagination";
// // import ProductCard from "./ProductsCard";

// export default function FilteredProducts() {
//   const dispatch = useDispatch();
//   const { category } = useParams();
//   const { filteredProducts } = useSelector((state) => state.UserSliceProvider);

//   useEffect(() => {
//     if (category) {
//       dispatch(filterProductsByCategory(category));
//     }
//   }, [category, dispatch]);
//   return (
//     <>
//       <div className="productsPage px-[20px] w-[100%]">
//         <div className="   px-[20px] py-[90px] box_parentCard gap-3">
//           {filteredProducts && filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))
//           ) : (
//             <p>No products found in this category.</p>
//           )}
//         </div>

//         <div className="pt-[90px] absolute right-9 ">
//           <ProductFilter />
//         </div>
//       </div>

//       <Paginations
//           count={Math.ceil(allProducts.length / productsPerPage)}
//           currentPage={currentPage}
//           handleChangePage={handleChangePage}
//         />
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { filterProductsByCategory } from "../../../redux/user/UserThunk";
import ProductCard from "./ProductsCard";
import ProductFilter from "./ProductFilter";
import Paginations from "./Pagination";

export default function FilteredProducts() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { filteredProducts } = useSelector((state) => state.UserSliceProvider);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // Number of products per page

  // Calculate the indices for slicing the filteredProducts array
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Fetch filtered products whenever the category changes
  useEffect(() => {
    if (category) {
      dispatch(filterProductsByCategory(category));
      setCurrentPage(1); // Reset to the first page when category changes
    }
  }, [category, dispatch]);

  // Handle page change
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <h2 className="text-[24px] font-bold text-center pt-[30px]">
        Products found in this category {category}
      </h2>
      <div className="productsPage px-[20px] w-[100%]">
        <div className="px-[20px] py-[90px] box_parentCard gap-3">
          {currentProducts && currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>

        <div className="pt-[90px] absolute right-9">
          <ProductFilter />
        </div>
      </div>

      {/* Pagination Component */}
      <Paginations
        count={Math.ceil(filteredProducts.length / productsPerPage)}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
