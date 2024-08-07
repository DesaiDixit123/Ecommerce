

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAddFetchApi } from "../../../redux/admin/AdminThunk";
import { toast } from "react-toastify";

export default function AdminAddProduct() {
  const [formdata, setFormdata] = useState({
    category: "",
    fields: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
    title: "",
    price: "",
    discount: "",
    qnt: "",
    discription: "",
  });

  const dispatch = useDispatch();
  const { categoriesData } = useSelector((state) => state.UserSliceProvider);
  
  useEffect(() => {
    console.log("categoriesData:", categoriesData);
  }, [categoriesData]);

  const formhandeler = async (e) => {
    e.preventDefault();

    try {
      dispatch(productAddFetchApi(formdata));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const inputHandeler = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const selectHandeler = (e) => {
    setFormdata({ ...formdata, category: e.target.value });
  };

  return (
    <>
      <div className="bg-Adminnav-400 text-white w-[100%] h-[100vh] flex justify-center items-center rounded-[10px]">
        <form
          className="bg-gray-500 w-[50%] h-full rounded-[20px] "
          onSubmit={formhandeler}
        >
          <div className="text-center text-[22px] bg-blue-400 roundedsform">
            Add Product
          </div>

          <div className="flex justify-center mt-[10px] text-black">
            <select
              name="category"
              id="category"
              className="w-[70%] bg-white p-[5px] rounded-[10px]"
              onChange={selectHandeler}
              value={formdata.category}
            >
              <option value="">Select Category</option>
              {categoriesData && categoriesData.map((category) => (
                <option key={category._id} value={category.categoryname}>
                  {category.categoryname}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center mt-[10px] text-black">
            <input
              type="text"
              name="fields"
              value={formdata.fields}
              placeholder="fields"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
          </div>
          <div className="flex justify-center mt-[10px] text-black">
            <input
              type="text"
              name="img1"
              value={formdata.img1}
              placeholder="Image 1 URL"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
          </div>
          <div className="flex justify-center mt-[10px] text-black">
            <input
              type="text"
              name="img2"
              value={formdata.img2}
              placeholder="Image 2 URL"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
          </div>
          <div className="flex justify-center mt-[10px] text-black">
            <input
              type="text"
              name="img3"
              value={formdata.img3}
              placeholder="Image 3 URL"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
          </div>
          <div className="flex justify-center mt-[10px] text-black">
            <input
              type="text"
              name="img4"
              value={formdata.img4}
              placeholder="Image 4 URL"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
          </div>
          <div className="flex justify-center mt-[10px] text-black">
            <input
              type="text"
              name="img5"
              value={formdata.img5}
              placeholder="Image 5 URL"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
          </div>
          <div className="flex justify-center mt-[10px] text-black">
            <input
              type="text"
              name="title"
              value={formdata.title}
              placeholder="Title"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
          </div>
          <div className="flex justify-center mt-[10px] text-black px-[85px] gap-[30px]">
            <input
              type="number"
              name="price"
              value={formdata.price}
              placeholder="Price"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
            <input
              type="number"
              name="discount"
              value={formdata.discount}
              placeholder="Discount"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
          </div>
          <div className="flex justify-center mt-[10px] text-black">
            <input
              type="text"
              name="qnt"
              value={formdata.qnt}
              placeholder="Quantity"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
          </div>
          <div className="flex justify-center mt-[10px] text-black">
            <input
              type="text"
              name="discription"
              value={formdata.discription}
              placeholder="Discription"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
          </div>
          <div className="flex justify-center ">
            <button className="bg-blue-400 w-[200px]  text-[20px] rounded-[10px] p-[15px] mt-[20px]">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
