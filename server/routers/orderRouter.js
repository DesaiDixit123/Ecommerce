import { Router } from "express";
import { getAllCountries, getCitiesByState, getStatesByCountry, placeOrder } from "../controllers/OrderController.js";
// import { placeOrder } from "../controllers/OrderController copy.js";
// import { getStatesByCountry } from "../controllers/OrderController copy.js";
// import { placeOrder } from "../controllers/OrderController.js";

export const OrderRouetr=Router()

OrderRouetr.post("/placeOrder",placeOrder)
OrderRouetr.get("/countries",getAllCountries)
OrderRouetr.get("/states/:countryCode",getStatesByCountry)
OrderRouetr.get("/cities/:stateCode/:countryCode",getCitiesByState)