import ProductFilter from "./ProductFilter";
import Products from "./Products";

export default function Productspage() {
  return (
    <>
      <div className="productsPage px-[20px]">
        <div>
          <Products />
        </div>

        <div className="pt-[90px]">
          <ProductFilter />
        </div>
      </div>
    </>
  );
}
