import { useState } from "react";
import { useDispatch } from "react-redux";
import { categoryFetchApi } from "../../../redux/admin/AdminThunk";
import { toast } from "react-toastify";
export default function AdminAddCategory() {
  const [formdata, setFormdata] = useState({
    categoryname: "",
    fields: [""],
  });
  const dispatch = useDispatch();

  const formhandeler = async (e) => {
    e.preventDefault();

    try {
      dispatch(categoryFetchApi({ formdata, toast, setFormdata }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const inputHandeler = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };



  const addFields = () => {
    setFormdata((prev) => ({
      ...prev,
      fields: [...prev.fields, ""]
    }));
  };


  const handeleFieldChange = (index, value) => {
    const newFields = [...formdata.fields];
    newFields[index] = value;
    setFormdata({ ...formdata, fields: newFields });
  };

 
  return (
    <>
      <div className="bg-Adminnav-400 text-white w-[100%] h-[100vh] flex justify-center items-center rounded-[10px]">
        <form
          className="bg-gray-500 w-[50%] h-[100vh] rounded-[20px] "
          onSubmit={formhandeler}
        >
          <div className="text-center text-[22px] bg-blue-400 roundedsform">
            Add category
          </div>

          <div className="flex justify-center mt-[60px] text-black">
            <input
              type="text"
              name="categoryname"
              value={formdata.categoryname}
              placeholder="Category Name"
              className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
              onChange={inputHandeler}
            />
          </div>
          <div className="mt-[20px]">
            {formdata.fields.map((field, index) => (
              <div key={index} className="flex justify-center mt-[10px]">
                <input
                  type="text"
                  value={field}
                  placeholder={`Field ${index + 1}`}
                  className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none text-black"
                  onChange={(e) => handeleFieldChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addFields}
            className="bg-green-400 mt-[20px] w-[200px] h-[40px] font-bold text-black rounded-[10px] ml-[90px]"
          >
            Add Another Fields
          </button>

          <div className="flex justify-center ">
            <button className="bg-blue-400 w-[200px]  text-[20px] rounded-[10px] p-[15px] mt-[20px]">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { categoryFetchApi } from "../../../redux/admin/AdminThunk";
// import { toast } from "react-toastify";

// export default function AdminAddCategory() {
//   const [formdata, setFormdata] = useState({
//     categoryname: "",
//     fields: [""]
//   });
//   const dispatch = useDispatch();

//   const formhandeler = async (e) => {
//     e.preventDefault();

//     try {
//       dispatch(categoryFetchApi({ formdata, setFormdata, toast }));
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const inputHandeler = (e) => {
//     setFormdata({ ...formdata, [e.target.name]: e.target.value });
//   };

//   const addField = () => {
//     setFormdata((prev) => ({
//       ...prev,
//       fields: [...prev.fields, ""]
//     }));
//   };

//   const handleFieldChange = (index, value) => {
//     const newFields = [...formdata.fields];
//     newFields[index] = value;
//     setFormdata({ ...formdata, fields: newFields });
//   };

//   return (
//     <div className="bg-Adminnav-400 text-white w-[100%] h-[100vh] flex justify-center items-center rounded-[10px]">
//       <form className="bg-gray-500 w-[50%] h-[50vh] rounded-[20px] " onSubmit={formhandeler}>
//         <div className="text-center text-[22px] bg-blue-400 roundedsform">
//           Add category
//         </div>

//         <div className="flex justify-center mt-[20px] text-black">
//           <input
//             type="text"
//             name="categoryname"
//             value={formdata.categoryname}
//             placeholder="Category Name"
//             className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
//             onChange={inputHandeler}
//           />
//         </div>

//         <div className="mt-[20px]">
//           {formdata.fields.map((field, index) => (
//             <div key={index} className="flex justify-center mt-[10px]">
//               <input
//                 type="text"
//                 value={field}
//                 placeholder={`Field ${index + 1}`}
//                 className="border-2 border-black w-[70%] p-[5px] rounded-[15px] outline-none"
//                 onChange={(e) => handleFieldChange(index, e.target.value)}
//               />
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addField}
//             className="bg-green-400 w-[200px] text-[20px] rounded-[10px] p-[10px] mt-[10px]"
//           >
//             Add Another Field
//           </button>
//         </div>

//         <div className="flex justify-center ">
//           <button
//             type="submit"
//             className="bg-blue-400 w-[200px] text-[20px] rounded-[10px] p-[15px] mt-[20px]"
//           >
//             Add Category
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
