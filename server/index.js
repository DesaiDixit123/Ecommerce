import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import { db_con } from "./configs/db_con.js";
import { userRouter } from "./routers/userRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { productRouter } from "./routers/products.Router.js";
import { adminRouter } from "./routers/AdminRouter/adminRouter.js";
import { CategoryRouter } from "./routers/CategoryRouter.js";
import bodyParser from "body-parser";
import { OrderRouetr } from "./routers/orderRouter.js";
import { userProductsRouter } from "./routers/usersProductsRouter.js";
import { usersCategoryRouter } from "./routers/usersCategoryRouter.js";
import { pendingProductRouter } from "./routers/pendingProductRouter.js";
import { notificationRouter } from "./routers/notificationRouter.js";
import { pendingCategoryRouter } from "./routers/pendingCategoryRouter.js";
import { ContactRouter } from "./routers/contactRouter.js";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);

// console.log("dirname:",__dirname)
dotenv.config();
const app = express();

db_con(process.env.dbURL);
const local_client_app = process.env.LOCAL_CLIENT_APP;
const remote_client_app = process.env.REMOTE_CLIENT_APP;
const allowdDomains =
  process.env.NODE_ENV === "production"
    ? [process.env.REMOTE_CLIENT_APP, process.env.REMOTE_SERVER_API] // Corrected here
    : [process.env.LOCAL_CLIENT_APP, process.env.LOCAL_SERVER_API];

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.REMOTE_CLIENT_APP
        : process.env.LOCAL_CLIENT_APP,
    credentials: true, // Optional: If you want to include cookies in requests
  })
);

console.log(allowdDomains);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", OrderRouetr);
app.use("/api", adminRouter);
app.use("/api", CategoryRouter);
app.use("/api", userProductsRouter);
app.use("/api", usersCategoryRouter);
app.use("/api", pendingProductRouter);
app.use("/api", notificationRouter);
app.use("/api", pendingCategoryRouter);
app.use("/api", ContactRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => 
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);
// Correct PORT usage
const PORT = process.env.port || 3000; // Fallback to 3000 locally

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
