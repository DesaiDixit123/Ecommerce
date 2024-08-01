import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCountriesWithPhoneCodes,
  RegisterUser,
} from "../../redux/user/UserThunk";

export default function Register() {
  const [profileImg, setProfileImg] = useState(null);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phonecode: "",
    contactno: "",
  });
  const dispatch = useDispatch();
  const { countrieswithphonecode } = useSelector(
    (state) => state.UserSliceProvider
  );
  console.log("Countries from Redux State:", countrieswithphonecode);

  useEffect(() => {
    dispatch(getAllCountriesWithPhoneCodes()).then((result) => {
      console.log("API Response:", result.payload); // Check the data here
    });
  }, [dispatch]);

  const formHandler = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    if (profileImg) {
      form.append("profileImg", profileImg);
    }

    try {
      dispatch(RegisterUser(form));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="justify-center flex items-center mt-[80px]">
        <div className="bg-registerBg-400 w-[50%] flex p-[30px] rounded-[50px]">
          <form className="pl-[25px] w-[100%]" onSubmit={formHandler}>
            <div className="flex justify-center">
              <img
                src={
                  profileImg
                    ? URL.createObjectURL(profileImg)
                    : "https://via.placeholder.com/150"
                }
                alt=""
                className="rounded-full w-[150px] h-[150px]"
              />
            </div>
            <div className="pt-[15px]">
              <label htmlFor="profileImg" className="text-white">
                Upload Profile Image :
              </label>
              <input
                type="file"
                name="profileImg"
                id="profileImg"
                className="registerInputSet"
                onChange={(e) => setProfileImg(e.target.files[0])}
              />
            </div>
            <div className="w-[100%] flex gap-[50px]">
              <input
                type="text"
                name="fname"
                placeholder="First Name :"
                className="registerInputSet form_color"
                onChange={inputHandler}
              />
              <input
                type="text"
                name="lname"
                placeholder="Last Name :"
                className="registerInputSet form_color"
                onChange={inputHandler}
              />
            </div>

            <div className="pt-[15px]">
              <input
                type="text"
                name="username"
                placeholder="Username :"
                className="registerInputSet form_color"
                onChange={inputHandler}
              />
            </div>

            <div className="pt-[15px]">
              <input
                type="email"
                name="email"
                placeholder="Email :"
                className="registerInputSet form_color"
                onChange={inputHandler}
              />
            </div>
            <div className="pt-[15px] flex gap-[50px]">
              <select
                name="phonecode"
                id="phonecode"
                className="registerInputSet form_color bg-black"
                onChange={inputHandler}
                defaultValue=""
              >
                <option value="">Select Phone Code</option>
                {countrieswithphonecode && countrieswithphonecode.length > 0 ? (
                  countrieswithphonecode.map((country) => (
                    <option key={country.code} value={country.phonecode}>
                      {country.name} {country.phonecode}
                    </option>
                  ))
                ) : (
                  <option value="">No phone codes available</option>
                )}
              </select>

              <input
                type="number"
                name="contactno"
                placeholder="Contact No. :"
                className="registerInputSet form_color"
                onChange={inputHandler}
              />
            </div>
            <div className="pt-[15px]">
              <input
                type="password"
                name="password"
                placeholder="Password :"
                className="registerInputSet form_color"
                onChange={inputHandler}
              />
            </div>
            <div className="pt-[15px]">
              <input
                type="text"
                name="confirmPassword"
                placeholder="Confirm Password :"
                className="registerInputSet form_color"
                onChange={inputHandler}
              />
            </div>

            <div className="pt-[15px] flex justify-center">
              <button className="w-[50%] flex justify-center p-[10px] bg-slate-800 text-[20px] text-white font-bold rounded-[20px] shadow-sm shadow-slate-600">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
