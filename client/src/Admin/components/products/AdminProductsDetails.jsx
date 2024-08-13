import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
// import React from "react";
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
import { useState } from "react";

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
            <div className="col-md-5">
              <div className="sliderWrapper pt-3 pb-3 pl-4 pr-4">
                <h6 className="mb-4 text-[20px]">Product Gallery</h6>
                <Slider {...productsSliderOptions} className="sliderBig mb-3">
                  <div className="item">
                    <img src={mainImage} alt="Main Product" className="w-100" />
                  </div>
                </Slider>
                <Slider {...productsSliderSmlOptions} className="sliderSmall">
                  <div className="item">
                    <img
                      src="https://m.media-amazon.com/images/I/71qqYQE3TcL._SY741_.jpg"
                      alt=""
                      className="w-100"
                      onClick={() =>
                        handleThumbnailClick(
                          "https://m.media-amazon.com/images/I/71qqYQE3TcL._SY741_.jpg"
                        )
                      }
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://m.media-amazon.com/images/I/61XQFuWW+YL._SY741_.jpg"
                      alt=""
                      className="w-100"
                      onClick={() =>
                        handleThumbnailClick(
                          "https://m.media-amazon.com/images/I/61XQFuWW+YL._SY741_.jpg"
                        )
                      }
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://m.media-amazon.com/images/I/617zEr3SDlL._SY741_.jpg"
                      alt=""
                      className="w-100"
                      onClick={() =>
                        handleThumbnailClick(
                          "https://m.media-amazon.com/images/I/617zEr3SDlL._SY741_.jpg"
                        )
                      }
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://m.media-amazon.com/images/I/619PaRQW5FL._SY741_.jpg"
                      alt=""
                      className="w-100"
                      onClick={() =>
                        handleThumbnailClick(
                          "https://m.media-amazon.com/images/I/619PaRQW5FL._SY741_.jpg"
                        )
                      }
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://m.media-amazon.com/images/I/61tg05FtuoL._SY741_.jpg"
                      alt=""
                      className="w-100"
                      onClick={() =>
                        handleThumbnailClick(
                          "https://m.media-amazon.com/images/I/61tg05FtuoL._SY741_.jpg"
                        )
                      }
                    />
                  </div>
                </Slider>
              </div>
            </div>
            
            <div className="col-md-7 ">
              <div className="pt-3 pb-3 pl-4 pr-4">
                <h5 className="mb-4 text-[20px]">Product Details</h5>

                <h4 className="text-[19px]">
                  Women Floral Print Anarkali Kurta With Pant and Dupatta
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
                      : <span>Man's</span>
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
                      : <span>Clothes</span>
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
                      : <span>₹ 1399</span>
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
                      : <span>₹ 299</span>
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
                      : <span>28</span>
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
                      : <span>4.1</span>
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
                      : <span>22-08-2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h4 className="mt-4 mb-3 text-[22px]">Product Description</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              reprehenderit repellendus expedita esse cupiditate quos doloremque
              rerum, corrupti ab illum est nihil, voluptate ex dignissimos! Sit
              voluptatem delectus nam, molestiae, repellendus ab sint quo
              aliquam debitis amet natus doloremque laudantium? Repudiandae,
              consequuntur, officiis quidem quo deleniti, autem non laudantium
              sequi error molestiae ducimus accusamus facere velit consectetur
              vero dolore natus nihil temporibus aspernatur quia consequatur?
              Consequuntur voluptate deserunt repellat tenetur debitis molestiae
              doloribus dicta. In rem illum dolorem atque ratione voluptates
              asperiores maxime doloremque laudantium magni neque ad quae quos
              quidem, quaerat rerum ducimus blanditiis reiciendis
            </p>

            <br />

            <h4 className="mt-4 mb-4">Ratings Analytics</h4>

            <div className="ratingSection">
              <div className="ratingrow d-flex align-items-center">
                <span className="coll1">5 Star</span>
                <span className="coll2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </span>
                <span className="coll3">(22)</span>
              </div>
              <div className="ratingrow d-flex align-items-center">
                <span className="coll1">4 Star</span>
                <span className="coll2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </span>
                <span className="coll3">(22)</span>
              </div>
              <div className="ratingrow d-flex align-items-center">
                <span className="coll1">3 Star</span>
                <span className="coll2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </span>
                <span className="coll3">(22)</span>
              </div>
              <div className="ratingrow d-flex align-items-center">
                <span className="coll1">2 Star</span>
                <span className="coll2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "20%" }}
                    ></div>
                  </div>
                </span>
                <span className="coll3">(22)</span>
              </div>
              <div className="ratingrow d-flex align-items-center">
                <span className="coll1">1 Star</span>
                <span className="coll2">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </span>
                <span className="coll3">(22)</span>
              </div>
            </div>

            <br />

            <h4 className="mt-4 mb-4">Customer_Reviews</h4>

            <div className="reviewSection">
              <div className="reviewRow">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="adminInfo d-flex align-items-center mb-3">
                        <AdminAvtarImg lg={true} />
                        <div className="info pl-3 pt-1">
                          <h5>Dixit Desai</h5>
                          <span>25 Minutes Ago!</span>
                        </div>
                      </div>
                      <Rating
                        name="read-only"
                        value={4.5}
                        readOnly
                        precision={0.5}
                      />
                    </div>
                  </div>
                  <div className="col-md-5 d-flex align-items-center">
                    <div className="ml-auto text-[22px]">
                      <Button className="btn-blue btn-lg ml-auto w-[120px] font-bold ">
                        {" "}
                        <FaReply /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis quo nostrum dolore fugiat ducimus labore debitis unde
                    autem recusandae? Eius harum tempora quis minima, adipisci
                    natus quod magni omnis quas.
                  </p>
                </div>
              </div>

              <div className="reviewRow reply">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="adminInfo d-flex align-items-center mb-3">
                        <AdminAvtarImg lg={true} />
                        <div className="info pl-3 pt-1">
                          <h5>Dixit Desai</h5>
                          <span>25 Minutes Ago!</span>
                        </div>
                      </div>
                      <Rating
                        name="read-only"
                        value={4.5}
                        readOnly
                        precision={0.5}
                      />
                    </div>
                  </div>
                  <div className="col-md-5 d-flex align-items-center">
                    <div className="ml-auto text-[22px]">
                      <Button className="btn-blue btn-lg ml-auto w-[120px] font-bold ">
                        {" "}
                        <FaReply /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis quo nostrum dolore fugiat ducimus labore debitis unde
                    autem recusandae? Eius harum tempora quis minima, adipisci
                    natus quod magni omnis quas.
                  </p>
                </div>
              </div>
              <div className="reviewRow reply">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="adminInfo d-flex align-items-center mb-3">
                        <AdminAvtarImg lg={true} />
                        <div className="info pl-3 pt-1">
                          <h5>Dixit Desai</h5>
                          <span>25 Minutes Ago!</span>
                        </div>
                      </div>
                      <Rating
                        name="read-only"
                        value={4.5}
                        readOnly
                        precision={0.5}
                      />
                    </div>
                  </div>
                  <div className="col-md-5 d-flex align-items-center">
                    <div className="ml-auto text-[22px]">
                      <Button className="btn-blue btn-lg ml-auto w-[120px] font-bold ">
                        {" "}
                        <FaReply /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis quo nostrum dolore fugiat ducimus labore debitis unde
                    autem recusandae? Eius harum tempora quis minima, adipisci
                    natus quod magni omnis quas.
                  </p>
                </div>
              </div>

              <div className="reviewRow">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="adminInfo d-flex align-items-center mb-3">
                        <AdminAvtarImg lg={true} />
                        <div className="info pl-3 pt-1">
                          <h5>Dixit Desai</h5>
                          <span>25 Minutes Ago!</span>
                        </div>
                      </div>
                      <Rating
                        name="read-only"
                        value={4.5}
                        readOnly
                        precision={0.5}
                      />
                    </div>
                  </div>
                  <div className="col-md-5 d-flex align-items-center">
                    <div className="ml-auto text-[22px]">
                      <Button className="btn-blue btn-lg ml-auto w-[120px] font-bold ">
                        {" "}
                        <FaReply /> &nbsp; Reply
                      </Button>
                    </div>
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis quo nostrum dolore fugiat ducimus labore debitis unde
                    autem recusandae? Eius harum tempora quis minima, adipisci
                    natus quod magni omnis quas.
                  </p>
                </div>
              </div>
            </div>

            <br />

            <h4 className="mt-4 mb-4">Review Reply Form</h4>

            <form className="reviewFrom">
              <textarea
                name=""
                id=""
                placeholder="Write Here"
                className="mb-4"
              ></textarea>

              <Button className="btn-blue btn-big btn-lg w-100 mt-4">
                Drop Your Replies
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
