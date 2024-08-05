import { useSelector } from "react-redux";

export default function Home() {
 const {userData}=useSelector((state)=>state.UserSliceProvider)

 console.log(userData)
  return (
    <>
   
 
    </>
  );
}

