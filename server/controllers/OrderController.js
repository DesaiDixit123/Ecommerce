import { City, Country, State } from "country-state-city";
import isEmail from "validator/lib/isEmail.js";
import { Order } from "../models/OrderModel.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const getAllCountries = async (req, res) => {
  try {
    const country = Country.getAllCountries();

    res.status(200).send({
      process: true,
      message: "Country retrieved successfully.",
      data: country,
    });
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

export const getStatesByCountry = (req, res) => {
  try {
    const { countryCode } = req.params;
    const states = State.getStatesOfCountry(countryCode);

    res.status(200).send({
      process: true,
      message: `States of ${countryCode} retrieved successfully.`,
      data: states,
    });
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

export const getCitiesByState = (req, res) => {
  try {
    const { countryCode, stateCode } = req.params;

    const cities = City.getCitiesOfState(countryCode, stateCode);

    res.status(200).send({
      process: true,
      message: `Cities of ${stateCode} , ${countryCode} retrieved successfully.`,
      data: cities,
    });
  } catch (error) {
    res.status(201).send({
      process: false,
      message: error.message,
    });
  }
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Password,
  },
});

const sendOrderConfirmationEmail = async (userEmail, order) => {
  try {
    const mailOptions = {
      from: process.env.Email_User,
      to: userEmail,
      subject: "Order Confirmation",
      text: ` Dear ${order.shippingAddress.fname} ${
        order.shippingAddress.lname
      } 
      
      Thank you for your order!

      Order ID : ${order.orderNumber}
      Order Items : ${order.orderItems
        .map((item) => `${item.title} x ${item.quantity}`)
        .join(", ")}
      Shipping Address : ${order.shippingAddress.addressLine1},${
        order.shippingAddress.city
      },${order.shippingAddress.state},${order.shippingAddress.city},${
        order.shippingAddress.country
      },${order.shippingAddress.zipCode}
      
        Payment Method : ${order.paymentMethod}
        Total Price : ${order.totalPrice}

         We will notify you once your order is shipped.

         Best Regards,
         Ecommerce
      
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending email : ", error);
  }
};

const generateRandomId = () => {
  return crypto.randomBytes(12).toString("hex");
};
const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};
export const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentResult = {},
      orderNumber
    } = req.body;

    if (!orderItems || orderItems.length === 0)
      throw new Error("No order items provided.");

    const email = isEmail(shippingAddress.email);
    if (!email) throw new Error("Invalid email format.");

    if (!shippingAddress || !shippingAddress.mobileNo)
      throw new Error("Mobile number is requried in shipping address.");

    if (!/^\d{10}$/.test(shippingAddress.mobileNo))
      throw new Error("Invalid mobile number. It should be 10 digit.");

    if (!/^\d{6}$/.test(shippingAddress.zipCode))
      throw new Error("Invalid zipcode. It should be 6 digit.");

    const country = Country.getCountryByCode(shippingAddress.country);

    if (!country) throw new Error("Invalid country selected.");

    const state = State.getStateByCodeAndCountry(
      shippingAddress.state,
      shippingAddress.country
    );

    if (!state) throw new Error("Invalid state slected.");
    const cities = City.getCitiesOfState(
      shippingAddress.country,
      shippingAddress.state
    );

    const city = cities.find((c) => c.name === shippingAddress.city);

    if (!city) throw new Error("Invalid city selected.");

  

    if (typeof shippingPrice !== "number" || shippingPrice < 0)
      throw new Error(
        "Invalid shipping price. It should be a non-negative number."
      );


    let isPaid = false;
    let paidAt = null;

    if (paymentMethod === "CreditCard/DebitCard") {
      if (!paymentResult || paymentResult.status !== "success") {
        throw new Error("Payment failled or not completed.");
      }
      isPaid = true;
      paidAt = new Date(paymentResult.update_time);
    } else if (paymentMethod === "COD") {
      paymentResult.status = "Pending";
      paymentResult.id = generateRandomId();
      paymentResult.update_time = paidAt;
      paymentResult.email_address = shippingAddress.email;
    }


    const OrderNumber=generateOrderNumber()
    const order = new Order({
      userId,
      orderItems,
      shippingAddress: {
        ...shippingAddress,
        country: country.name,
        state: state.name,
        city: city.name,
      },
      paymentMethod,
      orderNumber:OrderNumber,
      paymentResult,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      paidAt,
      isDelivered: false,
    });

    const createOrder = await order.save();

    await sendOrderConfirmationEmail(shippingAddress.email, createOrder);

    console.log("Send maill success.");
    res.status(200).send({
      process: true,
      message: "Order placed successfully.",
      data: {
        _id: createOrder._id,
        createOrder,
      },
    });
  } catch (error) {
    res.status(400).send({
      process: false,
      message: error.message,
    });
  }
};
