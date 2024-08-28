import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductsCard";
import { useLocation } from "react-router-dom";
import { filterProductsByRange } from "../../../redux/user/UserThunk";
import { useEffect, useState } from "react";
import ProductFilter from "./ProductFilter";
import Paginations from "./Pagination";
// import ProductCard from "./ProductCard";

export default function FilteredProductsPage() {
  const { filteredProducts1 } = useSelector((state) => state.UserSliceProvider);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Number of products per page

  // Calculate the indices for slicing the filteredProducts array
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts1.slice(indexOfFirstProduct, indexOfLastProduct);
  const dispatch = useDispatch();

  console.log(filteredProducts1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const min = searchParams.get("min");
  const max = searchParams.get("max");

  useEffect(() => {
    if (min && max) {
      dispatch(filterProductsByRange({ min, max }));
    }
  }, [dispatch, min, max]);


  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <div className="productsPage px-[20px]">
        <div className="p-4">
          <h2 className="text-[24px] font-bold mb-4 text-center">
            Products in the range ₹{min} - ₹{max}
          </h2>
          <div className="px-[20px] py-[90px] box_parentCard gap-3">
            {currentProducts && currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
                
                
              <p className="">No products found in this range.</p>
            )}
          </div>
        </div>
        <div className="pt-[170px]  absolute right-9">
          <ProductFilter />
        </div>
      </div>


      <Paginations
        count={Math.ceil(filteredProducts1.length / productsPerPage)}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
