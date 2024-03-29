const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

//CONNECT TO DATABASE
async function dbConnect() {
  await mongoose.connect(DB);
  console.log("DB connection successful!");
}

dbConnect().catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});

// console.log(app.get('env'));
// console.log(process.env);
