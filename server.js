import env from "dotenv";
env.config();

import app from "./middleware/app.js";

app.listen(process.env.PORT, () => {
  console.log("Server is runnig on", process.env.PORT);
});
