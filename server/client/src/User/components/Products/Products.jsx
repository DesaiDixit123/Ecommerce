/* eslint-disable react/prop-types */



import ProductsDesign from "./ProductsDesign";


export default function Products({ limit }) {
  return (
    <>
      
    
      <div className="px-[20px] py-[90px] box_parentCard gap-3">
   
        <ProductsDesign limit={limit} />
      </div>

    </>
  );
}
