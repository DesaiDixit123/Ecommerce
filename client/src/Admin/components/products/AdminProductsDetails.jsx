// import { emphasize, styled } from "@mui/material/styles";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Chip from "@mui/material/Chip";
// import HomeIcon from "@mui/icons-material/Home";
// // import React from "react";
// import Slider from "react-slick";
// import {
//   MdBrandingWatermark,
//   MdDiscount,
//   MdProductionQuantityLimits,
//   MdPublishedWithChanges,
// } from "react-icons/md";
// import { BiSolidCategoryAlt } from "react-icons/bi";
// import { IoMdPricetags } from "react-icons/io";
// import { GiVibratingShield } from "react-icons/gi";
// import AdminAvtarImg from "../AdminAvatarImg";
// import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
// import { FaReply } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// const StyledBreadcrumb = styled(Chip)(({ theme }) => {
//   const backgroundColor =
//     theme.palette.mode === "light"
//       ? theme.palette.grey[100]
//       : theme.palette.grey[800];
//   return {
//     backgroundColor,
//     height: theme.spacing(3),
//     color: theme.palette.text.primary,
//     fontWeight: theme.typography.fontWeightRegular,
//     "&:hover, &:focus": {
//       backgroundColor: emphasize(backgroundColor, 0.06),
//     },
//     "&:active": {
//       boxShadow: theme.shadows[1],
//       backgroundColor: emphasize(backgroundColor, 0.12),
//     },
//   };
// });

// export default function AdminProductsDetails() {
//   const [mainImage, setMainImage] = useState(
//     "https://m.media-amazon.com/images/I/612JvadSUzL._SY741_.jpg"
//   );

//   const [product,setProduct]=useState(null)
//   const { id } = useParams()
//   const { allProducts } = useSelector((state) => state.UserSliceProvider);
//   console.log(allProducts);
//   const productsSliderOptions = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//   };

//   const productsSliderSmlOptions = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     arrows: false,
//   };

//   const handleThumbnailClick = (imgSrc) => {
//     setMainImage(imgSrc);
//   };



//   useEffect(() => {
//     const foundProduct=allProducts.find((product)=>product._id===id)
//     setProduct(foundProduct)

//     if (foundProduct) {
//       setMainImage(foundProduct.img)
//     }
      

//   },[id,allProducts])
//   return (
//     <>
//       <div className="right-content w-100">
//         <div className="card shadow border-0 w-100 flex-row p-4 justify-between">
//           <h5 className="mb-3">Product View</h5>
//           <Breadcrumbs aria-label="breadcrumb">
//             <StyledBreadcrumb
//               component="a"
//               href="/admin"
//               label="Dashboard"
//               icon={<HomeIcon fontSize="small" />}
//             />
//             <StyledBreadcrumb component="a" href="#" label="Products" />
//             <StyledBreadcrumb component="a" href="#" label="Product View" />
//           </Breadcrumbs>
//         </div>

//         <div className="card productDetailsSection">
//           <div className="row">
//             <div className="col-md-5">
//               <div className="sliderWrapper pt-3 pb-3 pl-4 pr-4">
//                 <h6 className="mb-4 text-[20px]">Product Gallery</h6>
//                 <Slider {...productsSliderOptions} className="sliderBig mb-3">
//                   <div className="item">
//                     <img src={product.img1} alt="Main Product" className="w-100" />
//                   </div>
//                 </Slider>
//                 <Slider {...productsSliderSmlOptions} className="sliderSmall">
//                   <div className="item">
//                     <img
//                       src={product.img1}
//                       alt=""
//                       className="w-100"
//                       onClick={() =>
//                         handleThumbnailClick(
//                           "https://m.media-amazon.com/images/I/71qqYQE3TcL._SY741_.jpg"
//                         )
//                       }
//                     />
//                   </div>
//                   <div className="item">
//                     <img
//                       src={product.img2}
//                       alt=""
//                       className="w-100"
//                       onClick={() =>
//                         handleThumbnailClick(
//                           "https://m.media-amazon.com/images/I/61XQFuWW+YL._SY741_.jpg"
//                         )
//                       }
//                     />
//                   </div>
//                   <div className="item">
//                     <img
//                       src={product.img3}
//                       alt=""
//                       className="w-100"
//                       onClick={() =>
//                         handleThumbnailClick(
//                           "https://m.media-amazon.com/images/I/617zEr3SDlL._SY741_.jpg"
//                         )
//                       }
//                     />
//                   </div>
//                   <div className="item">
//                     <img
//                       src={product.img4}
//                       alt=""
//                       className="w-100"
//                       onClick={() =>
//                         handleThumbnailClick(
//                           "https://m.media-amazon.com/images/I/619PaRQW5FL._SY741_.jpg"
//                         )
//                       }
//                     />
//                   </div>
//                   <div className="item">
//                     <img
//                       src={product.img5}
//                       alt=""
//                       className="w-100"
//                       onClick={() =>
//                         handleThumbnailClick(
//                           "https://m.media-amazon.com/images/I/61tg05FtuoL._SY741_.jpg"
//                         )
//                       }
//                     />
//                   </div>
//                 </Slider>
//               </div>
//             </div>
            
//             <div className="col-md-7 ">
//               <div className="pt-3 pb-3 pl-4 pr-4">
//                 <h5 className="mb-4 text-[20px]">Product Details</h5>

//                 <h4 className="text-[19px]">
//                   Women Floral Print Anarkali Kurta With Pant and Dupatta
//                 </h4>

//                 <div className="productInfo mt-3">
//                   <div className="row">
//                     <div className="col-sm-3 d-flex align-items-center">
//                       <span className="icon">
//                         <BiSolidCategoryAlt />
//                       </span>
//                       <span className="name">Category</span>
//                     </div>
//                     <div className="col-sm-9">
//                       : <span>{ product.category}</span>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-sm-3 d-flex align-items-center">
//                       <span className="icon">
//                         <MdBrandingWatermark />
//                       </span>
//                       <span className="name">Field</span>
//                     </div>
//                     <div className="col-sm-9">
//                       : <span> {product.fields} </span>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-sm-3 d-flex align-items-center">
//                       <span className="icon">
//                         <IoMdPricetags />
//                       </span>
//                       <span className="name">Price</span>
//                     </div>
//                     <div className="col-sm-9">
//                       : <span> {product.price} </span>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-sm-3 d-flex align-items-center">
//                       <span className="icon">
//                         <MdDiscount />
//                       </span>
//                       <span className="name">Discount</span>
//                     </div>
//                     <div className="col-sm-9">
//                       : <span> {product.discount} </span>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-sm-3 d-flex align-items-center">
//                       <span className="icon">
//                         <MdProductionQuantityLimits />
//                       </span>
//                       <span className="name">Quantity</span>
//                     </div>
//                     <div className="col-sm-9">
//                       : <span> {product.qnt} </span>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-sm-3 d-flex align-items-center">
//                       <span className="icon">
//                         <GiVibratingShield />
//                       </span>
//                       <span className="name">Ratings</span>
//                     </div>
//                     <div className="col-sm-9">
//                       : <span> {product.ratings} </span>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-sm-3 d-flex align-items-center">
//                       <span className="icon">
//                         <MdPublishedWithChanges />
//                       </span>
//                       <span className="name">Published</span>
//                     </div>
//                     <div className="col-sm-9">
//                       : <span>22-08-2024</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="p-4">
//             <h4 className="mt-4 mb-3 text-[22px]">Product Description</h4>
//             <p>
//            {product.discription}
//             </p>

//             <br />

//             <h4 className="mt-4 mb-4">Ratings Analytics</h4>

//             <div className="ratingSection">
//               <div className="ratingrow d-flex align-items-center">
//                 <span className="coll1">5 Star</span>
//                 <span className="coll2">
//                   <div className="progress">
//                     <div
//                       className="progress-bar"
//                       style={{ width: "70%" }}
//                     ></div>
//                   </div>
//                 </span>
//                 <span className="coll3">(22)</span>
//               </div>
//               <div className="ratingrow d-flex align-items-center">
//                 <span className="coll1">4 Star</span>
//                 <span className="coll2">
//                   <div className="progress">
//                     <div
//                       className="progress-bar"
//                       style={{ width: "50%" }}
//                     ></div>
//                   </div>
//                 </span>
//                 <span className="coll3">(22)</span>
//               </div>
//               <div className="ratingrow d-flex align-items-center">
//                 <span className="coll1">3 Star</span>
//                 <span className="coll2">
//                   <div className="progress">
//                     <div
//                       className="progress-bar"
//                       style={{ width: "50%" }}
//                     ></div>
//                   </div>
//                 </span>
//                 <span className="coll3">(22)</span>
//               </div>
//               <div className="ratingrow d-flex align-items-center">
//                 <span className="coll1">2 Star</span>
//                 <span className="coll2">
//                   <div className="progress">
//                     <div
//                       className="progress-bar"
//                       style={{ width: "20%" }}
//                     ></div>
//                   </div>
//                 </span>
//                 <span className="coll3">(22)</span>
//               </div>
//               <div className="ratingrow d-flex align-items-center">
//                 <span className="coll1">1 Star</span>
//                 <span className="coll2">
//                   <div className="progress">
//                     <div
//                       className="progress-bar"
//                       style={{ width: "50%" }}
//                     ></div>
//                   </div>
//                 </span>
//                 <span className="coll3">(22)</span>
//               </div>
//             </div>

//             <br />

//             <h4 className="mt-4 mb-4">Customer_Reviews</h4>

//             <div className="reviewSection">
//               <div className="reviewRow">
//                 <div className="row">
//                   <div className="col-sm-7 d-flex">
//                     <div className="d-flex flex-column">
//                       <div className="adminInfo d-flex align-items-center mb-3">
//                         <AdminAvtarImg lg={true} />
//                         <div className="info pl-3 pt-1">
//                           <h5>Dixit Desai</h5>
//                           <span>25 Minutes Ago!</span>
//                         </div>
//                       </div>
//                       <Rating
//                         name="read-only"
//                         value={4.5}
//                         readOnly
//                         precision={0.5}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-5 d-flex align-items-center">
//                     <div className="ml-auto text-[22px]">
//                       <Button className="btn-blue btn-lg ml-auto w-[120px] font-bold ">
//                         {" "}
//                         <FaReply /> &nbsp; Reply
//                       </Button>
//                     </div>
//                   </div>
//                   <p className="mt-3">
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Omnis quo nostrum dolore fugiat ducimus labore debitis unde
//                     autem recusandae? Eius harum tempora quis minima, adipisci
//                     natus quod magni omnis quas.
//                   </p>
//                 </div>
//               </div>

//               <div className="reviewRow reply">
//                 <div className="row">
//                   <div className="col-sm-7 d-flex">
//                     <div className="d-flex flex-column">
//                       <div className="adminInfo d-flex align-items-center mb-3">
//                         <AdminAvtarImg lg={true} />
//                         <div className="info pl-3 pt-1">
//                           <h5>Dixit Desai</h5>
//                           <span>25 Minutes Ago!</span>
//                         </div>
//                       </div>
//                       <Rating
//                         name="read-only"
//                         value={4.5}
//                         readOnly
//                         precision={0.5}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-5 d-flex align-items-center">
//                     <div className="ml-auto text-[22px]">
//                       <Button className="btn-blue btn-lg ml-auto w-[120px] font-bold ">
//                         {" "}
//                         <FaReply /> &nbsp; Reply
//                       </Button>
//                     </div>
//                   </div>
//                   <p className="mt-3">
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Omnis quo nostrum dolore fugiat ducimus labore debitis unde
//                     autem recusandae? Eius harum tempora quis minima, adipisci
//                     natus quod magni omnis quas.
//                   </p>
//                 </div>
//               </div>
//               <div className="reviewRow reply">
//                 <div className="row">
//                   <div className="col-sm-7 d-flex">
//                     <div className="d-flex flex-column">
//                       <div className="adminInfo d-flex align-items-center mb-3">
//                         <AdminAvtarImg lg={true} />
//                         <div className="info pl-3 pt-1">
//                           <h5>Dixit Desai</h5>
//                           <span>25 Minutes Ago!</span>
//                         </div>
//                       </div>
//                       <Rating
//                         name="read-only"
//                         value={4.5}
//                         readOnly
//                         precision={0.5}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-5 d-flex align-items-center">
//                     <div className="ml-auto text-[22px]">
//                       <Button className="btn-blue btn-lg ml-auto w-[120px] font-bold ">
//                         {" "}
//                         <FaReply /> &nbsp; Reply
//                       </Button>
//                     </div>
//                   </div>
//                   <p className="mt-3">
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Omnis quo nostrum dolore fugiat ducimus labore debitis unde
//                     autem recusandae? Eius harum tempora quis minima, adipisci
//                     natus quod magni omnis quas.
//                   </p>
//                 </div>
//               </div>

//               <div className="reviewRow">
//                 <div className="row">
//                   <div className="col-sm-7 d-flex">
//                     <div className="d-flex flex-column">
//                       <div className="adminInfo d-flex align-items-center mb-3">
//                         <AdminAvtarImg lg={true} />
//                         <div className="info pl-3 pt-1">
//                           <h5>Dixit Desai</h5>
//                           <span>25 Minutes Ago!</span>
//                         </div>
//                       </div>
//                       <Rating
//                         name="read-only"
//                         value={4.5}
//                         readOnly
//                         precision={0.5}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-5 d-flex align-items-center">
//                     <div className="ml-auto text-[22px]">
//                       <Button className="btn-blue btn-lg ml-auto w-[120px] font-bold ">
//                         {" "}
//                         <FaReply /> &nbsp; Reply
//                       </Button>
//                     </div>
//                   </div>
//                   <p className="mt-3">
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Omnis quo nostrum dolore fugiat ducimus labore debitis unde
//                     autem recusandae? Eius harum tempora quis minima, adipisci
//                     natus quod magni omnis quas.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <br />

//             <h4 className="mt-4 mb-4">Review Reply Form</h4>

//             <form className="reviewFrom">
//               <textarea
//                 name=""
//                 id=""
//                 placeholder="Write Here"
//                 className="mb-4"
//               ></textarea>

//               <Button className="btn-blue btn-big btn-lg w-100 mt-4">
//                 Drop Your Replies
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }




import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Slider from "react-slick";
import {
  MdBrandingWatermark,
  MdDiscount,
  MdProductionQuantityLimits,
  MdPublishedWithChanges,
} from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoMdPricetags } from "react-icons/io";
import { GiVibratingShield } from "react-icons/gi";
import AdminAvtarImg from "../AdminAvatarImg";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { FaReply } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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

export default function AdminProductsDetails() {
  const [mainImage, setMainImage] = useState(
    "https://m.media-amazon.com/images/I/612JvadSUzL._SY741_.jpg"
  );

  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { allProducts } = useSelector((state) => state.UserSliceProvider);
console.log(id)
  const productsSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const productsSliderSmlOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleThumbnailClick = (imgSrc) => {
    setMainImage(imgSrc);
  };

  useEffect(() => {
    if (allProducts.length > 0) {
      const foundProduct = allProducts.find((product) => product._id === id);
      setProduct(foundProduct);


      console.log(foundProduct)
  
      if (foundProduct) {
        setMainImage(foundProduct.img1);
      }
    }
  }, [id, allProducts]);
  

  if (!product) {
    return <div className="pt-[500px]">Loading...</div>; // Optionally, display a loading state or message
  }

  return (  
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 justify-between">
          <h5 className="mb-3">Product View</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="/admin"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Products" />
            <StyledBreadcrumb component="a" href="#" label="Product View" />
          </Breadcrumbs>
        </div>

        <div className="card productDetailsSection">
          <div className="row">
            <div className="col-md-6">
              <div className="sliderWrapper pt-3 pb-3 pl-4 pr-4">
                <h6 className="mb-4 text-[20px]">Product Gallery</h6>
                <Slider {...productsSliderOptions} className="sliderBig mb-3">
                  <div className="item">
                    <img src={mainImage} alt="Main Product" className="w-100" />
                  </div>
                </Slider>
                <Slider {...productsSliderSmlOptions} className="sliderSmall">
                  {[product.img1, product.img2, product.img3, product.img4, product.img5].map((imgSrc, index) => (
                    <div className="item" key={index}>
                      <img
                        src={imgSrc}
                        alt={`Thumbnail ${index}`}
                        className="mainImg"
                        onClick={() => handleThumbnailClick(imgSrc)}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            <div className="col-md-6">
              <div className="pt-3 pb-3 pl-2 pr-4">
                <h5 className="mb-4 text-[20px]">Product Details</h5>

                <h4 className="text-[19px]">
                  {product.name}
                </h4>

                <div className="productInfo mt-3">
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <BiSolidCategoryAlt />
                      </span>
                      <span className="name">Category</span>
                    </div>
                    <div className="col-sm-9">
                      : <span>{product.category}</span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <MdBrandingWatermark />
                      </span>
                      <span className="name">Field</span>
                    </div>
                    <div className="col-sm-9">
                      : <span>{product.fields}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <IoMdPricetags />
                      </span>
                      <span className="name">Price</span>
                    </div>
                    <div className="col-sm-9">
                      : <span>{product.price}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <MdDiscount />
                      </span>
                      <span className="name">Discount</span>
                    </div>
                    <div className="col-sm-9">
                      : <span>{product.discount}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <MdProductionQuantityLimits />
                      </span>
                      <span className="name">Quantity</span>
                    </div>
                    <div className="col-sm-9">
                      : <span>{product.qnt}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <GiVibratingShield />
                      </span>
                      <span className="name">Ratings</span>
                    </div>
                    <div className="col-sm-9">
                      : <span>{product.ratings}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 d-flex align-items-center">
                      <span className="icon">
                        <MdPublishedWithChanges />
                      </span>
                      <span className="name">Published</span>
                    </div>
                    <div className="col-sm-9">
                      : <span>{new Date(product.publishedDate).toLocaleString() || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h4 className="mt-4 mb-3 text-[22px]">Product Description</h4>
            <p>
              {product.description}
            </p>

            <br />

            <h4 className="mt-4 mb-4">Ratings Analytics</h4>

            <div className="ratingSection">
              {["5 Star", "4 Star", "3 Star", "2 Star", "1 Star"].map((star, index) => (
                <div className="ratingrow d-flex align-items-center" key={index}>
                  <span className="coll1">{star}</span>
                  <span className="coll2">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{ width: `${(index + 1) * 20}%` }}
                      ></div>
                    </div>
                  </span>
                  <span className="coll3">(22)</span>
                </div>
              ))}
            </div>

            <br />

            <h4 className="mt-4 mb-4">Customer Reviews</h4>

            <div className="reviewSection">
              {["Dixit Desai", "Dixit Desai", "Dixit Desai"].map((reviewer, index) => (
                <div className="reviewcard d-flex align-items-center mb-3" key={index}>
                  <AdminAvtarImg />
                  <div className="reviewtext ms-2">
                    <h6 className="mb-1">{reviewer}</h6>
                    <Rating name="read-only" value={index + 1} readOnly />
                    <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula magna libero, sed elementum lorem malesuada vitae.</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="contained"
              startIcon={<FaReply />}
              onClick={() => window.history.back()}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
