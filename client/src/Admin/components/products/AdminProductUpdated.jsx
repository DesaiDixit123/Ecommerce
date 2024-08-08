/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAddFetchApi } from "../../../redux/admin/AdminThunk";
import { toast } from "react-toastify";
import { categoryByFieldsFetchApi } from "../../../redux/user/UserThunk";

export default function AdminProductUpadted() {
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
  const { categoriesData, categoryFields } = useSelector(
    (state) => state.UserSliceProvider
  );
  useEffect(() => {
    if (formdata.category) {
      dispatch(categoryByFieldsFetchApi(formdata.category));
    }
  }, [formdata.category, dispatch]);

  const formhandeler = async (e) => {
    e.preventDefault();
    console.log(formdata);
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
  const fielSelectHandeler = (e) => {
    setFormdata({ ...formdata, fields: e.target.value });
  };
  return (
    <>
      <div className="bg-Adminnav-400 text-white w-[100%] h-[100vh]  flex justify-center items-center rounded-[10px] p-[30px]">
        <form
          className="bg-gray-500 w-[70%] h-full rounded-[20px] p-[10px]"
          onSubmit={formhandeler}
        >
          <div className="text-center text-[22px] roundedsform">
             Product Updated
          </div>

          <div className="flex justify-center mt-[10px] text-black gap-[35px] px-[20px] pt-[30px]">
            <select
              name="category"
              id="category"
              className="w-[70%] bg-white border-2 border-black p-[5px] rounded-[10px]"
              onChange={selectHandeler}
              value={formdata.category}
            >
              <option value="">Select Category</option>
              {categoriesData &&
                categoriesData.map((category) => (
                  <option key={category._id} value={category.categoryname}>
                    {category.categoryname}
                  </option>
                ))}
            </select>

            <select
              type="text"
              name="fields"
              value={formdata.fields}
              placeholder="fields"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none bg-white"
              onChange={fielSelectHandeler}
            >
              <option value="">Select Field</option>
              {categoryFields &&
                Array.isArray(categoryFields.fields) &&
                categoryFields.fields.map((field, index) => (
                  <option key={index} value={field}>
                    {field}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex justify-center mt-[10px] text-black gap-[35px] px-[20px] pt-[15px]">
            <input
              type="text"
              name="img1"
              value={formdata.img1}
              placeholder="Image 1 URL"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />

            <input
              type="text"
              name="img2"
              value={formdata.img2}
              placeholder="Image 2 URL"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
          </div>

          <div className="flex justify-center mt-[10px] text-black gap-[35px] px-[20px]  pt-[15px]">
            <input
              type="text"
              name="img3"
              value={formdata.img3}
              placeholder="Image 3 URL"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />

            <input
              type="text"
              name="img4"
              value={formdata.img4}
              placeholder="Image 4 URL"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
          </div>
      
          <div>
            <div>
              <div className=" mt-[10px] text-black px-[20px] flex gap-[30px]  pt-[15px]">
                <input
                  type="text"
                  name="img5"
                  value={formdata.img5}
                  placeholder="Image 5 URL"
                  className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
                  onChange={inputHandeler}
                />

                <input
                  type="number"
                  name="price"
                  value={formdata.price}
                  placeholder="Price"
                  className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
                  onChange={inputHandeler}
                />
              </div>
              <div className=" mt-[10px] text-black px-[20px] flex gap-[30px]  pt-[15px]">
                <input
                  type="text"
                  name="title"
                  value={formdata.title}
                  placeholder="Title"
                  className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
                  onChange={inputHandeler}
                />
                <div className="flex gap-[40px] w-[70%]">
                  <input
                    type="number"
                    name="discount"
                    value={formdata.discount}
                    placeholder="Discount"
                    className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
                    onChange={inputHandeler}
                  />

                  <input
                    type="text"
                    name="qnt"
                    value={formdata.qnt}
                    placeholder="Quantity"
                    className="border-2 border-black w-[30%] p-[5px] rounded-[15px] outline-none"
                    onChange={inputHandeler}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-[10px] text-black  pt-[15px]">
            <textarea
              type="text"
              name="discription"
              value={formdata.discription}
              placeholder="Discription"
              className="border-2 border-black w-[80%] h-[100px] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
          </div>
          <div className="flex justify-center mt-[10px] text-black"></div>
          <div className="flex justify-center pt-[15px] ">
            <button className="bg-blue-400 w-[200px]  text-[20px] rounded-[10px] p-[15px] mt-[20px]">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
