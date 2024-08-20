import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryByFieldsFetchApi } from "../../../redux/user/UserThunk";
import { productAddFetchApi } from "../../../redux/admin/AdminThunk";
// import uploadedImg from "../../../assets/uploaded.jpg"

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export default function AdminAddProduct() {
  const dispatch = useDispatch();
  const { categoriesData, categoryFields,allUsers } = useSelector(
    (state) => state.UserSliceProvider
  );
  console.log(categoriesData);
  console.log(categoryFields);


  console.log(allUsers)
  const [formdata, setFormdata] = useState({
    category: "",
    fields: "",
    img1: null,
    img2: null,
    img3: null,
    img4: null,
    img5: null,
    title: "",
    price: "",
    discount: "",
    qnt: "",
    discription: "",
  });

  useEffect(() => {
    if (formdata.category) {
      dispatch(categoryByFieldsFetchApi(formdata.category));
    }
  }, [formdata.category, dispatch]);

  const handleInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const selectHandeler = (e) => {
    setFormdata({ ...formdata, category: e.target.value });
  };
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
        setFormdata((prevState) => ({
            ...prevState,
            [fieldName]: file // Store the actual file object
        }));
    } else {
        console.error("Please upload a valid image file.");
    }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  // Append all form fields to FormData
  Object.keys(formdata).forEach((key) => {
      if (formdata[key] instanceof File) {
          formData.append(key, formdata[key]); // Append file objects
      } else {
          formData.append(key, formdata[key]); // Append other fields
      }
  });

  try {
      const response = await dispatch(productAddFetchApi(formData));
      console.log("Product added successfully:", response);
  } catch (error) {
      console.error("Error adding product:", error);
  }
};

  const fielSelectHandeler = (e) => {
    setFormdata({ ...formdata, fields: e.target.value });
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-between">
          <h5 className="mb-3">Product Add</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/admin"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Products" />
            <StyledBreadcrumb component="a" href="#" label="Product Add" />
          </Breadcrumbs>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-7">
              <div className="card p-4">
                <h5 className="mb-4">Basic Information</h5>

                <div className="form-group">
                  <h6>TITLE</h6>
                  <input
                    type="text"
                    name="title"
                    value={formdata.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <h6>DESCRIPTION</h6>
                  <textarea
                    name="discription"
                    rows={5}
                    cols={10}
                    value={formdata.discription}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>CATEGORY</h6>
                      <select
                        name="category"
                        id="category"
                        className="cursor-pointer"
                        onChange={selectHandeler}
                      >
                        <option value="">Select Category</option>
                        {categoriesData &&
                          categoriesData.map((category) => (
                            <option
                              key={category._id}
                              value={category.categoryname}
                            >
                              {category.categoryname}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>FIELDS</h6>
                      <select
                        type="text"
                        name="fields"
                        value={formdata.fields}
                        placeholder="fields"
                        className="fields_selects cursor-pointer"
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
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>REGULAR PRICE</h6>
                      <input
                        type="text"
                        name="price"
                        value={formdata.price}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>DISCOUNT PRICE</h6>
                      <input
                        type="text"
                        name="discount"
                        value={formdata.discount}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>QUANTITY</h6>
                      <input
                        type="text"
                        name="qnt"
                        value={formdata.qnt}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="card p-4">
                <h1 className="mb-4">Upload Images</h1>

                <div className="flex justify-between">
                  <div>
                    <label>IMAGE 1</label>
                    <div className="file_upload">
                      {!formdata.img1 ? (
                        <input
                          name="img1"
                          type="file"
                          onChange={(e) => handleFileChange(e, "img1")}
                          style={{
                            
                            width: "150px",
                            height: "150px",
                            border: "1px dashed grey",
                            borderRadius: "5px",
                            cursor: "pointer",
                            backgroundImage: formdata.img1 ? `url(${formdata.img1})` : `url(../../../assets/uploaded.jpg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      ) : (
                        <img
                          src={formdata.img1}
                          alt="Uploaded"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "contain",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label>IMAGE 2</label>
                    <div className="file_upload">
                      {!formdata.img2 ? (
                        <input
                          name="img2"
                          type="file"
                          onChange={(e) => handleFileChange(e, "img2")}
                          style={{
                            width: "150px",
                            height: "150px",
                            border: "1px dashed grey",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <img
                          src={formdata.img2}
                          alt="Uploaded"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "contain",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div>
                    <label>IMAGE 3</label>
                    <div className="file_upload">
                      {!formdata.img3 ? (
                        <input
                          name="img3"
                          type="file"
                          onChange={(e) => handleFileChange(e, "img3")}
                          style={{
                            width: "150px",
                            height: "150px",
                            border: "1px dashed grey",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <img
                          src={formdata.img3}
                          alt="Uploaded"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "contain",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label>IMAGE 4</label>
                    <div className="file_upload">
                      {!formdata.img4 ? (
                        <input
                          name="img4"
                          type="file"
                          onChange={(e) => handleFileChange(e, "img4")}
                          style={{
                            width: "150px",
                            height: "150px",
                            border: "1px dashed grey",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <img
                          src={formdata.img4}
                          alt="Uploaded"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "contain",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div>
                    <label>IMAGE 5</label>
                    <div className="file_upload">
                      {!formdata.img5 ? (
                        <input
                          name="img5"
                          type="file"
                          onChange={(e) => handleFileChange(e, "img5")}
                          style={{
                            width: "150px",
                            height: "150px",
                            border: "1px dashed grey",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <img
                          src={formdata.img5}
                          alt="Uploaded"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "contain",
                            borderRadius: "5px",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button type="submit" className="mt-3 btn-blue w-100">
            PRODUCT ADD
          </Button>
        </form>
      </div>
    </>
  );
}

// /* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { productAddFetchApi } from "../../../redux/admin/AdminThunk";
// import { toast } from "react-toastify";
// import { categoryByFieldsFetchApi } from "../../../redux/user/UserThunk";

// export default function AdminAddProduct() {
// const [formdata, setFormdata] = useState({
//   category: "",
//   fields: "",
//   img1: "",
//   img2: "",
//   img3: "",
//   img4: "",
//   img5: "",
//   title: "",
//   price: "",
//   discount: "",
//   qnt: "",
//   discription: "",
// });

// const dispatch = useDispatch();

// useEffect(() => {
//   if (formdata.category) {
//     dispatch(categoryByFieldsFetchApi(formdata.category));
//   }
// }, [formdata.category, dispatch]);

// const formhandeler = async (e) => {
//   e.preventDefault();
//   console.log(formdata);
//   try {
//     dispatch(productAddFetchApi(formdata));
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// const inputHandeler = (e) => {
//   setFormdata({ ...formdata, [e.target.name]: e.target.value });
// };

//   return (
//     <>
//       <div className="bg-Adminnav-400 text-white w-[100%] h-[100vh]  flex justify-center items-center rounded-[10px] p-[30px]">
//         <form
//           className="bg-gray-500 w-[70%] h-full rounded-[20px] p-[10px]"
//           onSubmit={formhandeler}
//         >
//           <div className="text-center text-[22px] roundedsform">
//             Add Product
//           </div>

//           <div className="flex justify-center mt-[10px] text-black gap-[35px] px-[20px] pt-[30px]">

//           </div>

//           <div className="flex justify-center mt-[10px] text-black gap-[35px] px-[20px] pt-[15px]">
//             <input
//               type="text"
//               name="img1"
//               value={formdata.img1}
//               placeholder="Image 1 URL"
//               className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
//               onChange={inputHandeler}
//             />

//             <input
//               type="text"
//               name="img2"
//               value={formdata.img2}
//               placeholder="Image 2 URL"
//               className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
//               onChange={inputHandeler}
//             />
//           </div>

//           <div className="flex justify-center mt-[10px] text-black gap-[35px] px-[20px]  pt-[15px]">
//             <input
//               type="text"
//               name="img3"
//               value={formdata.img3}
//               placeholder="Image 3 URL"
//               className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
//               onChange={inputHandeler}
//             />

//             <input
//               type="text"
//               name="img4"
//               value={formdata.img4}
//               placeholder="Image 4 URL"
//               className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
//               onChange={inputHandeler}
//             />
//           </div>

//           <div>
//             <div>
//               <div className=" mt-[10px] text-black px-[20px] flex gap-[30px]  pt-[15px]">
//                 <input
//                   type="text"
//                   name="img5"
//                   value={formdata.img5}
//                   placeholder="Image 5 URL"
//                   className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
//                   onChange={inputHandeler}
//                 />

//                 <input
//                   type="number"
//                   name="price"
//                   value={formdata.price}
//                   placeholder="Price"
//                   className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
//                   onChange={inputHandeler}
//                 />
//               </div>
//               <div className=" mt-[10px] text-black px-[20px] flex gap-[30px]  pt-[15px]">
//                 <input
//                   type="text"
//                   name="title"
//                   value={formdata.title}
//                   placeholder="Title"
//                   className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
//                   onChange={inputHandeler}
//                 />
//                 <div className="flex gap-[40px] w-[70%]">
//                   <input
//                     type="number"
//                     name="discount"
//                     value={formdata.discount}
//                     placeholder="Discount"
//                     className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
//                     onChange={inputHandeler}
//                   />

//                   <input
//                     type="text"
//                     name="qnt"
//                     value={formdata.qnt}
//                     placeholder="Quantity"
//                     className="border-2 border-black w-[30%] p-[5px] rounded-[15px] outline-none"
//                     onChange={inputHandeler}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-center mt-[10px] text-black  pt-[15px]">
//             <textarea
//               type="text"
//               name="discription"
//               value={formdata.discription}
//               placeholder="Discription"
//               className="border-2 border-black w-[80%] h-[100px] p-[5px] rounded-[15px] outline-none"
//               onChange={inputHandeler}
//             />
//           </div>
//           <div className="flex justify-center mt-[10px] text-black"></div>
//           <div className="flex justify-center pt-[15px] ">
//             <button className="bg-blue-400 w-[200px]  text-[20px] rounded-[10px] p-[15px] mt-[20px]">
//               Add Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }
