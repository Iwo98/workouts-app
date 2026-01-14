import app from "./app";
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT, () => {
  // oxlint-disable-next-line no-console
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
