import { Router } from "express";
import { getAllCountries, getAllOrders, getAllOrdersByUserId, getCitiesByState, getStatesByCountry, orderCancel, orderStatus, placeOrder } from "../controllers/OrderController.js";
import { veriFicationUser } from "../controllers/userController.js";


export const OrderRouetr=Router()

OrderRouetr.post("/placeOrder",veriFicationUser,placeOrder)
OrderRouetr.get("/countries",getAllCountries)
OrderRouetr.get("/orders",getAllOrders)
OrderRouetr.get("/orders",getAllOrders)
OrderRouetr.get("/states/:countryCode",getStatesByCountry)
OrderRouetr.get("/cities/:stateCode/:countryCode",getCitiesByState)
OrderRouetr.get("/order/:userId",veriFicationUser,getAllOrdersByUserId)
OrderRouetr.patch("/order/cancel/:userId/:orderId/:orderNumber",veriFicationUser,orderCancel)
OrderRouetr.put("/orderStatus/:orderId",orderStatus)