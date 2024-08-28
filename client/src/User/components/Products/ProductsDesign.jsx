
import { useSelector } from "react-redux";
import ProductCard from "./ProductsCard";


export default function ProductsDesign({ limit, currentProducts }) {
  const { allProducts } = useSelector((state) => state.UserSliceProvider);

  // If currentProducts is not passed, calculate it based on limit
  const productsToDisplay = currentProducts || (limit ? allProducts.slice(0, limit) : allProducts);

  return (
    <>
      {productsToDisplay.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}

      {/* Assuming Paginations will be hooked up to the actual pagination logic */}
   
    </>
  );
}


