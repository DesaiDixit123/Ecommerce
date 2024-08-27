// import { useEffect, useState } from "react";
// import {
//   filterProductsByCategory,
//   getAllCategories2,
// } from "../../redux/user/UserThunk";
// import { useDispatch, useSelector } from "react-redux";

// export default function ProductFilter() {
//   const dispatch = useDispatch();
//   const { categoriesData ,filteredProducts} = useSelector((state) => state.UserSliceProvider);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   useEffect(() => {
//     dispatch(getAllCategories2());
//   }, [dispatch]);

//   const handleCategoryChange = (event) => {
//     const category = event.target.value;
//     setSelectedCategory(category);
//     dispatch(filterProductsByCategory(category));
//     };
    

//     console.log(filteredProducts)

//   return (
//     <div className="w-[250px] p-[20px] border-2 border-gray-200 rounded-[10px] ">
//       <h3 className="text-[20px] font-bold mb-[10px]">Filter by Category</h3>
//       <select
//         className="w-full p-[10px] border-2 border-gray-300 rounded-[5px]"
//         value={selectedCategory}
//         onChange={handleCategoryChange}
//       >
//         <option value="">All Categories</option>
//         {categoriesData &&
//           categoriesData.map((category) => (
//             <option key={category._id} value={category.categoryname}>
//               {category.categoryname}
//             </option>
//           ))}
//       </select>
//     </div>
//   );
// }



    
import { useEffect, useState } from "react";
import {
  filterProductsByCategory,
  filterProductsByRange,
  getAllCategories2,

} from "../../redux/user/UserThunk";
import { useDispatch, useSelector } from "react-redux";

export default function ProductFilter() {
  const dispatch = useDispatch();
  const { categoriesData, filteredProducts } = useSelector((state) => state.UserSliceProvider);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRange, setSelectedRange] = useState({ min: 0, max: 0 });

  useEffect(() => {
    dispatch(getAllCategories2());
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    dispatch(filterProductsByCategory(category));
  };

  const handleRangeChange = (min, max) => {
    setSelectedRange({ min, max });
    dispatch(filterProductsByRange({ min, max }));
  };

  console.log(filteredProducts);

  return (
    <div className="w-[250px] p-[20px] border-2 border-gray-200 rounded-[10px] ">
      <h3 className="text-[20px] font-bold mb-[10px]">Filter by Category</h3>
      <select
        className="w-full p-[10px] border-2 border-gray-300 rounded-[5px]"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        {categoriesData &&
          categoriesData.map((category) => (
            <option key={category._id} value={category.categoryname}>
              {category.categoryname}
            </option>
          ))}
      </select>

      <h3 className="text-[20px] font-bold mt-[20px] mb-[10px]">Filter by Range</h3>
      <div className="range-filter">
        <button
          onClick={() => handleRangeChange(0, 500)}
          className={`w-full p-[10px] border-2 border-gray-300 rounded-[5px] ${
            selectedRange.min === 0 && selectedRange.max === 500 ? "bg-blue-200" : ""
          }`}
        >
          ₹0 - ₹500
        </button>
        <button
          onClick={() => handleRangeChange(500, 1000)}
          className={`w-full p-[10px] border-2 border-gray-300 rounded-[5px] mt-[10px] ${
            selectedRange.min === 500 && selectedRange.max === 1000 ? "bg-blue-200" : ""
          }`}
        >
          ₹500 - ₹1000
        </button>
        <button
          onClick={() => handleRangeChange(1000, 5000)}
          className={`w-full p-[10px] border-2 border-gray-300 rounded-[5px] mt-[10px] ${
            selectedRange.min === 1000 && selectedRange.max === 5000 ? "bg-blue-200" : ""
          }`}
        >
          ₹1000 - ₹5000
        </button>
        <button
          onClick={() => handleRangeChange(5000, 10000)}
          className={`w-full p-[10px] border-2 border-gray-300 rounded-[5px] mt-[10px] ${
            selectedRange.min === 5000 && selectedRange.max === 10000 ? "bg-blue-200" : ""
          }`}
        >
          ₹5000 - ₹10000
        </button>
      </div>
    </div>
  );
}
