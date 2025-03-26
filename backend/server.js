import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connect from "./utils/connect.js";
import routes from "./router/index.js";

const app = express();
const port = process.env.PORT || 5011;


app.use(cors());
app.use(express.json());


app.use("/api", routes);

connect();

app.listen(port, () => {
  console.log(`Server working on ${port} port!`);
});

